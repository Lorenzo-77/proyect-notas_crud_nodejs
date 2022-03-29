const usersCtrl = {};

const passport = require('passport');
 
const User = require('../models/User');

usersCtrl.renderSignUpFrom = (req, res)=>{
    res.render('users/signup');
}

usersCtrl.signup = async (req,res)=>{
    const errors = [];
    const {name, email, password, confirm_password}= req.body;
   
   if(password != confirm_password){
       errors.push({text: 'Contraseña no coinciden.'});
   }
   if(password.length < 4){
       errors.push({text: 'La Contraseña debe llevar mas de 4 caracteres.'});
   }
   if(errors.length > 0){
       res.render('users/signup', {
           errors,
           name,
           email
       });
   }else{
       const emailUser = await User.findOne({email: email});
       if(emailUser){
           req.flash('error_msg', 'El email ya esta en uso.');
           res.render('users/signup');
       } else{
           const newUser = new User({name, email, password});
           newUser.password = await newUser.encryptPassword(password);// sifra contraseña
           await newUser.save();
           req.flash('success_msg', 'Estas Registrado');
           
           res.redirect('/users/signin');
       }
   }

}

usersCtrl.renderSigninFrom = (req, res)=>{
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/useres/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logout = (req,res)=>{
    req.logout();
    req.flash('success_msg', 'Sesion cerrada');
    res.redirect('/useres/signin');
}


module.exports = usersCtrl;