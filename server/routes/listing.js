const   router = require('express').Router(),
        multiparty = require('connect-multiparty')(),
        { create, getAll, updateOne, deleteOne } = require('../controllers/listing');    

router.post('/', multiparty, create);
router.get('/', getAll);
router.put('/', updateOne);
router.post('/:_id', deleteOne);

module.exports = router;