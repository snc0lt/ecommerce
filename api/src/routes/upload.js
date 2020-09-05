const server = require('express').Router()
const multer = require('multer')
var upload = multer({dest:'../../public/images'})





server.post('/', upload.array('images',4), (req, res) => {
    const names = req.files.map((img) => img.filename)

    res.send(JSON.stringify(names))
    //console.log(req.files);
    //res.json({msg:'ok'});
})


module.exports = server;

