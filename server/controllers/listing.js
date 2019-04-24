const   Listing = require('../models/Listing'),
        mongoose = require('mongoose'),
        Gridfs = require('gridfs-stream'),
        fs = require('fs');
        
var {log} = console;

function create(req, res) {
    log(req.files, "file from create lising")

    if (req.session.user) {
        let payload = {...req.body};
        payload.user = req.session.user._id;
        Listing.create(payload).then(listing => {
            // let db = mongoose.connection.db,
            //     mongoDriver = mongoose.mongo,
            //     gfs = new Gridfs(db, mongoDriver);
                req.files.forEach(file => {
                    // let writestream = gfs.createWriteStream({
                    //     filename: file.fieldName,
                    //     mode: 'w',
                    //     content_type: file.mimetype,
                    //     metadata: req.body
                    // });
                    // fs.createReadStream(file.path).pipe(writestream);
                    listing.pictures.push(file.path);
                    // writestream.on('close', function(body) {
                    //     // yay
                    // })
                })
            listing.save();
            res.send(listing);
        }).catch(err => {
            if (err) throw err;
        })
    } else {
        res.send('no user logged in');
    }
}

function getAllImages(/*{params: {_id}}*/req, res){
    Pictures.find().populate('listing').then(result => {
        console.log(result)
        let images = result.map(pictures => {
            pictures = pictures.toObject();
            let copy = {...pictures}
            let listPictures = pictures.listing.listingName; /*not good*/
            delete copy.listPictures;
            copy.listPictures = listPictures;
            return copy;
        })
        res.send(images)
    }).catch(err => {
        if (err) throw err
    })
    // log(_id);
    // let db = mongoose.connection.db;
    // let mongoDriver = mongoose.mongo;
    // let gfs = new Gridfs(db, mongoDriver);
    // let readstream = gfs.createReadStream({_id});
    // readstream.pipe(res);
    
}

function getAll(req, res) {
    // log('hit getAll function');
    Listing.find().populate('user').then(result => {
        // log(result, "getAll result")
        let listings = result.map(listing => {
            listing = listing.toObject();
            let copy = {...listing}
            let user = listing.user.userName;
            delete copy.user;
            copy.user = user;
            return copy;
        })
        res.send(listings);
    }).catch(err => {
        if (err) throw err;
    });

}

function updateOne(req, res) {
    Listing.findByIdAndUpdate(
        req.body.id,
        { $set: req.body.updatedFields },
        { new: true }).then(result => {
            // log(result, "update one");
        }).catch((err, doc) => {
            res.send({error: err, affected: doc });
        })
}

function deleteOne({params: {_id}}, res) {
    Listing.findOneAndRemove({_id}).then(result => {
        Listing.find().then(result => {
            res.send(result); 
        })
    }).catch((err, doc) => {
        res.send({ error: err, affected: doc })
    })
}

module.exports = {
    create,
    getAll,
    updateOne,
    getAllImages,
    deleteOne
}

