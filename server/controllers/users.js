const User = require('../models/user');


module.exports.register = async (req, res) => {
    try {
        const {email, sName, password} = req.body;
        const user = new User({
            email: email,
            sName: sName,
        });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.json(registeredUser)
        })
        console.log(registeredUser)
    } catch(e) {
        console.log(e)
    }
}

module.exports.loggedIn = async (req, res) => {
    const user = req.user;
    
    res.json(user)
}

module.exports.logout = async (req, res) => {
    req.logout((err) => {
        if(err) { return next(err)}
    });
}

module.exports.updateUser = async (req, res) => {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, req.body);
    await user.save();
    res.json(user);
}

module.exports.updateNativeLanguage = async (req, res) => {
    const id = req.user._id;
    const { native } = req.body;
    
    const foundUser = await User.findById(id);
    const nativeList = foundUser.native;
    if(!nativeList.includes(native)){
        nativeList.push(native)
    } else {
        console.log('language already exists')
    }

    const user = await User.findByIdAndUpdate(id, {
        native: nativeList,
    })

    console.log(nativeList)
    await user.save();
    res.json(user)
}

module.exports.updateSpokenLanguage = async (req, res) => {
    const id = req.user._id;
    const { spoken } = req.body;
    
    const foundUser = await User.findById(id);
    const spokenList = foundUser.spoken;
    if(!spokenList.includes(spoken)){
        spokenList.push(spoken)
    } else {
        console.log('language already exists')
    }

    const user = await User.findByIdAndUpdate(id, {
        spoken: spokenList,
    })
    

    console.log(spokenList)
    await user.save();
    res.json(user)
}

module.exports.updateTranslationLanguage = async (req, res) => {
    const id = req.user._id;
    const { from, to } = req.body;
    
    const foundUser = await User.findById(id);
    const translationList = foundUser.translation;
    translationList.push({
        from: from,
        to: to
    })

    const user = await User.findByIdAndUpdate(id, {
        translation: translationList,
    })
    

    console.log(translationList)
    await user.save();
    res.json(user)
}

module.exports.deleteSpokenLanguage = async (req, res) => {
    const id = req.user._id;
    const { item } = req.body;
    
    const foundUser = await User.findById(id);
    const spokenList = foundUser.spoken;

    const removeIndex = spokenList.indexOf(item)
    spokenList.splice(removeIndex, 1);

    const user = await User.findByIdAndUpdate(id, {
        spoken: spokenList,
    })
    
    await user.save();
    res.json(user)
}

module.exports.updatePaypal = async (req, res) => {
    const id = req.user._id;

    const user = await User.findByIdAndUpdate(id, {
        paypal: req.body,
    })
    
    console.log(user);
    await user.save();
    res.json(user);
}

module.exports.updateBank = async (req, res) => {
    const id = req.user._id;    

    const user = await User.findByIdAndUpdate(id, {
        bank: req.body,
    })
    
    console.log(user)
    await user.save();
    res.json(user)
}