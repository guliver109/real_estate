const   Listing = require('../models/Listing'),
        mongoose = require('mongoose'),
        Gridfs = require('gridfs-stream'),
        fs = require('fs');
        
var {log} = console;

function create(req, res) {
    log(req.session, "session from create listing");
    log(req.body, "body create listing");
    log(req.files, "file from create lising")

    if (req.session.user) {
        let payload = {...req.body};
        payload.user = req.session.user._id;
        log(payload);
        Listing.create(payload).then(listing => {
             log(listing, "from listing create")
            let db = mongoose.connection.db,
                mongoDriver = mongoose.mongo,
                gfs = new Gridfs(db, mongoDriver),
                writestream = gfs.createWriteStream({
                filename: req.files['image-file'].name,
                mode: 'w',
                content_type: req.files['image-file'].mimetype,
                metadata: req.body
            });
            // log(writestream, "+++++++++++++++++++++++++++++++++++++")
            // log(req.body, 'PPppppppppppppppppppppppppppppppppp')
            // // log(req.body,image, '(PPppppppppppppppppppppppppppppppppp)')
            // log(req.body.image.path, "//////////////////////////")
            console.log('req.files LLLLLLLLLLLLLLL',req.files)
            fs.createReadStream(req.files['image-file'].path).pipe(writestream);
            listing.pictures.push(req.files['image-file'].path);
            console.log('LISTING', listing);
            listing.save();
            writestream.on('close', function(body) {
                log(body, "-----------------------------------------");
            })
            res.send(listing);
        }).catch(err => {
            if (err) throw err;
        })
    } else {
        res.send('no user logged in');
    }
}

function getImage({params: {_id}}, res){
    log(_id);
    let db = mongoose.connection.db;
    let mongoDriver = mongoose.mongo;
    let gfs = new Gridfs(db, mongoDriver);
    let readstream = gfs.createReadStream({_id});
    readstream.pipe(res);
}

function getAll(req, res) {
    log('hit getAll function');
    Listing.find().populate('user').then(result => {
        log(result, "getAll result")
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
            log(result, "update one");
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
    getImage,
    deleteOne
}

