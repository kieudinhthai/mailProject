const express = require('express')
const router = express.Router()
const appConstrollers = require('../constrollers/appConstrollers')
const loginConstrollers = require('../constrollers/loginConstrollers')
router.get('/login',loginConstrollers.show_login)
router.post('/login',loginConstrollers.login)

router.get('/',appConstrollers.index)
router.get('/logout',appConstrollers.logout)
router.get('/sent',appConstrollers.show_sent)
router.post(['/','/sent'],appConstrollers.output)
router.get('/detail/:id',appConstrollers.show_detail)
router.get('/:slug',appConstrollers.show_404)
module.exports = router