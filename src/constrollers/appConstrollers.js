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
         , user: mongooseToObject(user)
         
        })
      }
      res.redirect('/logout')
      })
    .catch(next);
  }

// [POST] / or /sent
  output(req,res,next){
    var formData = {
      from:req.body.from,
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
         , user: mongooseToObject(user)
         
        })
      }
      res.redirect('/logout')
      })
    .catch(next);
  }
// [GET] /detail
  show_detail(req,res,next){
   Promise.all([Mail.findOne({_id:req.params.id}),User.findOne({_id:req.session.userId})])
  .then(function ([mail,user]){
      if(req.session.userId){
        res.render('mail_detail',{
          mail:mongooseToObject(mail),
          user:mongooseToObject(user)
        })
      }
     
  })
  .catch(next)
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

