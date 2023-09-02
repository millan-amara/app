const express = require('express');
const router = express.Router();
const languages = require('../controllers/languages');
const { isLoggedIn } = require('../middleware');


router.put('/', isLoggedIn, languages.updateLanguage);


// router.get('/logged-in', users.loggedIn);

// router.get('/logout', isLoggedIn, users.logout);

// router.put('/users/:id/nativelanguages', isLoggedIn, users.updateNativeLanguage);
// router.put('/users/:id/spokenlanguages', isLoggedIn, users.updateSpokenLanguage);
// router.put('/users/:id/translationlanguages', isLoggedIn, users.updateTranslationLanguage);
// router.put('/users/:id/deletespokenlanguages', isLoggedIn, users.deleteSpokenLanguage);

// router.post('/users/:id/update-paypal', isLoggedIn, users.updatePaypal);
// router.post('/users/:id/update-bank', isLoggedIn, users.updateBank);

// // Verifications
// router.post('/users/:id/create-id', isLoggedIn, users.createIdentity);



// router.put('/users/:id', isLoggedIn, users.updateUser);


module.exports = router;