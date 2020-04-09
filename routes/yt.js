var express = require('express');
var router = express.Router();
var path = require('path');


/* GET users listing. */
router.use(express.static(path.join(__dirname, 'public')));

router.get('/:id', function(req, res, next) {
  res.render('youtube');
});

module.exports = router;
