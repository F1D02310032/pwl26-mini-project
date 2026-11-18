const express = require('express');
const controller = require('../controllers/movieController');
const { validateMovie } = require('../validators/movieValidator');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateMovie, controller.create);
router.put('/:id', validateMovie, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
