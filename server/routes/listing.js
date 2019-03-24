const   router = require('express').Router(),
        { create, getAll, updateOne, deleteOne } = require('../controllers/listing');    

router.post('/', create);
router.get('/', getAll);
router.put('/', updateOne);
router.post('/:_id', deleteOne);

module.exports = router;