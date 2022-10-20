var express = require('express');
var router = express.Router();

const Art = require('../models/art');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;

router.get('/home', function(req, res, next){
  res.render('home');
});

router.get('/fanarts', function(req, res, next){
  res.render('fanarts');
});

router.get('/admin_upload', function(req, res, next){
  res.render('admin_upload');
});

router.get('/footer', function(req, res, next){
  res.render('footer');
});

router.post('/upload', async function(req, res, next) {
  const art=new Art(req.body)
  console.log(art)
  await Art.insertMany([{categories: req.body.categories, title: req.body.title, price: req.body.price, description: req.body.description }])
  res.redirect('/');
});
