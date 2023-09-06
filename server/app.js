if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');
const mongoSanitize = require('express-mongo-sanitize');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

const userRoutes = require('./routes/users');
const languageRoutes = require('./routes/languages');

const dbUrl = process.env.DB_URL || 'mongodb+srv://Levis:Forever%40%4024Forever@clusterflipping.ptkmg.mongodb.net/connect?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});

const app = express();

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    })
  }

app.use(express.urlencoded({extended: true, limit: '25mb'}));
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(express.json({ limit: '25mb'}));

const secret = process.env.SECRET || '85AGTHRHGYSH';
const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store,
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 *24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/language', languageRoutes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', function (req, res) {
        res.sendFile((__dirname, "client", "build", "index.html"),
            function(err) {
                if (err) {
                    res.status(500).send(err);
                }
            }
        );
    });
}


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong';
    res.status(statusCode).json({ err });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Backend running on ${port}`);
});