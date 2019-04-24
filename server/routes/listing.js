const   router = require('express').Router(),
        // multiparty = require('connect-multiparty')(),
        multer = require('multer'),
        upload = multer({ dest: '/' }),
        { create, getAll, updateOne, deleteOne, getAllImages} = require('../controllers/listing');    

router.post('/', upload.array('image-file', 12), create);
router.get('/', getAll);
router.put('/', updateOne);
router.post('/:_id', deleteOne);
router.get('/image/:_id', getAllImages);

module.exports = router;