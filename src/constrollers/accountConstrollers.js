const User = require('./models/userSchema')
const { mongooseToObject } = require('../until/mongoose')
class loginConstrollers {
    show_login(req, res, next) {
        res.render("login")
    }
    show_register(req, res, next) {
        res.render("register",{mess:"hello my friend"})
    }
   
    // sign_in(req,res,next){
    //     var new_account={
    //         email:req.body.email,
    //         password:req.body.password,
    //         phone_number:req.body.phone_number
    //     }
    //     let account = new User(new_account)
    //     account.save()
    //            .then(res.redirect('back'))
    //            .catch(next)
    // }
 //[POST] /sign-in
    sign_in(req,res,next){
        User.findOne({email:req.body.email})
        .then(function(email){
            if(!mongooseToObject(email)){
                var new_account={
                    email:req.body.email,
                    password:req.body.password,
                    phone_number:req.body.phone_number
                }
                let account = new User(new_account)
                  account.save()
                         .then(res.render('register',{mess:"success"}))
                         .catch(next)
            }
            res.render("register",{mess:"this email is exist"})
        })
        .catch(next)
    }

    login(req, res, next) {
        User
        .findOne({ email: req.body.mail }, function (err, data) {
            if (data) {
                if (data.password == req.body.password) {
                        console.log("Done Login");
                        //create session userId
                        console.log(data);
                        req.session.userId = data._id;
                        req.session.userName = data.email
                        console.log(data.email);
                        console.log(req.session.userId);
                        console.log(req.session.userName);
                        
                        res.redirect('/');
                } else {
                        res.redirect('/login');
                }
             } else {
                    res.redirect('/login');
            }

        })
        .catch()
    };
}


module.exports = new loginConstrollers()
