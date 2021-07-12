const User = require('../constrollers/models/userSchema')
const { mongooseToObject } = require('../until/mongoose')

class loginConstrollers {
    show_login(req, res, next) {
        res.render("login")
    }
    login(req, res, next) {
        User
        .findOne({ mail: req.body.mail }, function (err, data) {
            if (data) {
                if (data.password == md5(req.body.password)) {
                        console.log("Done Login");
                        req.session.userId = data._id;
                        console.log(req.session.userId);
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
