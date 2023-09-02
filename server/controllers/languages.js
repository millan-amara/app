const User = require('../models/user');
const Language = require('../models/language')


module.exports.updateLanguage = async (req, res) => {
    const id = '64e282dac40765349448141a';
    const { question, optionOne, optionTwo, optionThree, optionFour } = req.body;

    const foundLanguage = await Language.findById(id)
    const questionList = foundLanguage.questions;

    questionList.push({
        question,
        optionOne,
        optionTwo,
        optionThree,
        optionFour
    })

    const language = await Language.findByIdAndUpdate(id, {
        questions: questionList,
    })

    await language.save();
    console.log(language);
}

// module.exports.updateUser = async (req, res) => {
//     const id = req.user._id;
//     const user = await User.findByIdAndUpdate(id, req.body);
//     await user.save();
//     res.json(user);
// }

// module.exports.updateNativeLanguage = async (req, res) => {
//     const id = req.user._id;
//     const { native } = req.body;
    
//     const foundUser = await User.findById(id);
//     const nativeList = foundUser.native;
//     if(!nativeList.includes(native)){
//         nativeList.push(native)
//     } else {
//         console.log('language already exists')
//     }

//     const user = await User.findByIdAndUpdate(id, {
//         native: nativeList,
//     })

//     console.log(nativeList)
//     await user.save();
//     res.json(user)
// }

// module.exports.updateSpokenLanguage = async (req, res) => {
//     const id = req.user._id;
//     const { spoken } = req.body;
    
//     const foundUser = await User.findById(id);
//     const spokenList = foundUser.spoken;
//     if(!spokenList.includes(spoken)){
//         spokenList.push(spoken)
//     } else {
//         console.log('language already exists')
//     }

//     const user = await User.findByIdAndUpdate(id, {
//         spoken: spokenList,
//     })
    

//     console.log(spokenList)
//     await user.save();
//     res.json(user)
// }

// module.exports.updateTranslationLanguage = async (req, res) => {
//     const id = req.user._id;
//     const { from, to } = req.body;
    
//     const foundUser = await User.findById(id);
//     const translationList = foundUser.translation;
//     translationList.push({
//         from: from,
//         to: to
//     })

//     const user = await User.findByIdAndUpdate(id, {
//         translation: translationList,
//     })
    

//     console.log(translationList)
//     await user.save();
//     res.json(user)
// }

// module.exports.deleteSpokenLanguage = async (req, res) => {
//     const id = req.user._id;
//     const { item } = req.body;
    
//     const foundUser = await User.findById(id);
//     const spokenList = foundUser.spoken;

//     const removeIndex = spokenList.indexOf(item)
//     spokenList.splice(removeIndex, 1);

//     const user = await User.findByIdAndUpdate(id, {
//         spoken: spokenList,
//     })
    
//     await user.save();
//     res.json(user)
// }

// module.exports.updatePaypal = async (req, res) => {
//     const id = req.user._id;

//     const user = await User.findByIdAndUpdate(id, {
//         paypal: req.body,
//     })
    
//     console.log(user);
//     await user.save();
//     res.json(user);
// }

// module.exports.updateBank = async (req, res) => {
//     const id = req.user._id;    

//     const user = await User.findByIdAndUpdate(id, {
//         bank: req.body,
//     })
    
//     console.log(user)
//     await user.save();
//     res.json(user)
// }