const Mail = require('../constrollers/models/mailSchema')
const User = require('../constrollers/models/userSchema')
const { multipleMongooseToObject } = require('../until/mongoose')
const { mongooseToObject } = require('../until/mongoose')

class Constrollers {
  // [GET] /
  index(req, res, next) {
    Promise.all([Mail.find({to:req.session.userName}), User.findOne({_id:req.session.userId})])
    .then(function([mail, user]){
      if (req.session.userId) {
        res.render('index.ejs',
        {
          mails: multipleMongooseToObject(mail)
         , users: mongooseToObject(user)
         
        })
      }
      res.redirect('/login')
      })
    .catch(next);
  }

// [POST] / or /sent
  output(req,res,next){
    let count = 1
    var formData = {
      from:req.session.userName,
      to:req.body.email,
      title:req.body.title,
      content:req.body.content,
      seen:false,
    }
    var mail = new Mail(formData)
    mail.save()
        .then(res.redirect('back'))
        .catch(next)
  }
//[GET] /sent
  show_sent(req, res, next) {
    Promise.all([Mail.find({from:req.session.userName}), User.findOne({_id:req.session.userId})])
    .then(function([mail, user]){
      if (req.session.userId) {
        res.render('index.ejs',
        {
          mails: multipleMongooseToObject(mail)
         , users: mongooseToObject(user)
         
        })
      }
      res.redirect('/login')
      })
    .catch(next);
  }

// [GET] /slug
  show_404(req,res,next){
    res.render('404')
  }

// [GET] /logout
  logout(req, res, next) {
    console.log("logout")
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            
            if (err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });

    }
};
}



module.exports = new Constrollers()

