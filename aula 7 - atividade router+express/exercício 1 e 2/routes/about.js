var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('About page');
});

module.exports = router;