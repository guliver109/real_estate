const   router = require('express').Router(),
        multiparty = require('connect-multiparty')(),
        { create, getAll, updateOne, deleteOne, getImage} = require('../controllers/listing');    

router.post('/', multiparty, create);
router.get('/', getAll);
router.put('/', updateOne);
router.post('/:_id', deleteOne);
router.get('/image/:_id', getImage);

module.exports = router;