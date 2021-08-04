var multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: './src/public/image',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


 module.exports= upload = multer({
     storage: storage
})









