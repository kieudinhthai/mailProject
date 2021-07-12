const Mail = require('../constrollers/models/mailSchema')
const User = require('../constrollers/models/userSchema')
const { multipleMongooseToObject } = require('../until/mongoose')

class Constrollers {
  index(req, res, next) {
    Promise.all([Mail.find({}), User.findOne({})])

      .then(([mail, user]) =>
        res.render('index.ejs',
          {
            mails: multipleMongooseToObject(mail)
            , users: multipleMongooseToObject(user)
          })
      )
      .catch(next)
  }

  output(req,res,next){
    let count = 1
    var formData = {
      from:"",
      to:req.body.email,
      title:req.body.title,
      content:req.body.content,
      seen:false,
      type:'sent'
    }
    var mail = new Mail(formData)
    mail.save()
        .then(res.redirect('back'))
        .catch(next)
  }

  // show_sent(req, res, next){
  //   Promise.all([Mail.find({}), User.find({})])

  //   .then(([mail, user]) =>
  //     res.render('index.ejs',
  //       {
  //         mails: multipleMongooseToObject(mail)
  //         , users: multipleMongooseToObject(user)
  //       })
  //   )
  //   .catch(next)
  // }
}

module.exports = new Constrollers()

