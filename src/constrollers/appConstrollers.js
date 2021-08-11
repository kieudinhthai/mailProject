
//const upload = require('../until/multer')
const Mail = require('../constrollers/models/mailSchema')
const User = require('../constrollers/models/userSchema')
const { multipleMongooseToObject } = require('../until/mongoose')
const { mongooseToObject } = require('../until/mongoose')


class Constrollers {
  // [GET] /
  index(req, res, next) {
    Promise.all([Mail.find({ to: req.session.userName }), User.findOne({ _id: req.session.userId })])
      .then(function ([mail, user]) {
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

  // [GET] /search?q=query
  // search(req, res, next) {
  //   Promise.all([Mail.find({from:req.session.userName}), User.find({_id:req.session.userId})])
  //   .then(function([mail, user]){
  //     if (req.session.userId) {
  //       res.render('index.ejs',
  //       {
  //          mails: multipleMongooseToObject(mail)
  //        , user: mongooseToObject(user)

  //       })
  //     }
  //     res.redirect('/logout')
  //     })
  //   .catch(next);
  // }

  // [POST] / or /sent
  output(req, res, next) {
    var formData = {
      from: req.body.from,
      to: req.body.email,
      title: req.body.title,
      content: req.body.content,
      seen: false,
    }
    var mail = new Mail(formData)
    mail.save()
      .then(res.redirect('back'))
      .catch(next)
  }
  //[GET] /sent
  show_sent(req, res, next) {
    Promise.all([Mail.find({ from: req.session.userName }), User.findOne({ _id: req.session.userId })])
      .then(function ([mail, user]) {
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



  // [GET] [PUT] /detail/:id
  show_detail(req, res, next) {
    Promise.all([Mail.findOne({ _id: req.params.id }), User.findOne({ _id: req.session.userId }), Mail.updateOne({ _id: req.params.id }, { seen: "true" })])
      .then(function ([mail, user]) {
        if (req.session.userId) {
          res.render('mail_detail', {
            mail: mongooseToObject(mail),
            user: mongooseToObject(user)
          })
        }
        res.redirect('/logout')
      })
      .catch(next)
  }

  // [GET] /account-detail/:id
  show_account(req, res, next) {
    User.findOne({ _id: req.session.userId })
      .then(function (user) {
        if (req.session.userId) {
          res.render('account_detail', {
            user: mongooseToObject(user)
          })
        }
        res.redirect('/logout')
      })
      .catch(next)
  }
  //[PUT] /account-detail/:id
  update_account(req, res, next) {
    var data={}
    if (req.body.newPhone) {
      data.phone_number= req.body.newPhone 
    }

    if (!req.file) {
      data.image= "unnamed.jpg" 
    }
    else {
      data.image= req.file.filename 
    }

    if (req.body.newPass) {
      data.password= req.body.newPass 
    }
    console.log(data);
    User.updateOne({ _id: req.params.id }, data)
      .then(res.redirect('back'))
      .catch(next)

  }


  //[DELETE] /delete/:id
  delete(req, res, next) {
    Mail.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back')
        .catch(next)
      )
  }

  //[POST] /action
  action(req,res,next){
    switch (req.body.action) {
      case 'delete':
        Mail.deleteMany({_id:{$in: req.body.ids}})
        .then(() => res.redirect('back'))
        .catch(next)
        break;

        case "seen":
        Mail.updateMany({_id:{$in: req.body.ids}},{ seen: true})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    
  }

  // [GET] /slug
  show_404(req, res, next) {
    if (req.session.userId) {
      res.render('404')
    }
    res.redirect('/logout')
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

