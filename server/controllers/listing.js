const Listing = require('../models/Listing');

function create(req, res) {
    console.log(req.session);
    console.log(req.body);
    if (req.session.user) {
        let payload = {...req.body};
        payload.user = req.session.user._id;
        console.log(payload);
        Listing.create(payload).then(result => {
            res.send(result);
        }).catch(err => {
            if (err) throw err;
        })
    } else {
        res.send('no user logged in');
    }
}

function getAll(req, res) {
    console.log('hit getAll function');
    Listing.find().populate('user').then(result => {
        console.log(result, "getAll result")
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
            console.log(result, "update one");
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
    deleteOne
}

