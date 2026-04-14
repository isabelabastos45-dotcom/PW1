var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/signup');
});

router.get('/:userid', (req, res) => {
  const userid = req.params.userid;
  res.send(`Bem-vindo à página, usuário ${userid}`);
});

module.exports = router;