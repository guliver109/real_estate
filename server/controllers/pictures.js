// const   Pictures = require('../models/Pictures'),
//         mongoose = require('mongoose'),
//         Gridfs = require('gridfs-stream'),
//         fs = require('fs');
        
// function createPicture(req, res) {
//   console.log(req.files, 'from createPicture conntrollers');
//     let db = mongoose.connection.db,
//         mongoDriver = mongoose.mongo,
//         gfs = new Gridfs(db, mongoDriver),
//         writestream = gfs.createWriteStream({
//             filename: req.files.image.name,
//             mode: 'w',
//             content_type: req.files.image.mimetype,
//             metadata: req.body
//         })
//         console.log(req.files, '?????????????????????')
//         console.log(req.files.images, '{?????????????????????')
//         console.log(req.files.images.name, '{{{{?????????????????????')

//     fs.createReadStream(req.files.image.path).pipe(writestream);
//     writestream.on('close', function(file) {
//         console.log(file, '*******************')
//         Pictures.findById(req.parms.id, function(err, picture) {
//             picture.file = file._id;
//             picture.save(function(err, updatePicture) {
//                 return res.json(200, updatePicture)
//             });
//         });
//     });
// }

// module.exports = {
//     createPicture,
// }