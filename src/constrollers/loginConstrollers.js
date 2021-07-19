const User = require('../constrollers/models/userSchema')
const { mongooseToObject } = require('../until/mongoose')

class loginConstrollers {
    show_login(req, res, next) {
        res.render("login")
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
