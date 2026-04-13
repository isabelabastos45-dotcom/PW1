var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('Página: /signup');
});

module.exports = router;