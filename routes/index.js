var express = require('express');
const { request } = require('../app');
var router = express.Router();

const Art = require('../models/art');
const multer = require('multer');


//define storage for the images
const Storage = multer.diskStorage({

  //destination for files
  destination: function(request, file, callback){
    callback(null, './public/images');
  },


  //add back the extension
  filename:function(req, file, callback){
    console.log(req.body.title)
    callback(null,file.originalname);
  }
});

//upload parameters for multer
const upload = multer({
  storage:Storage,
  limits:{
    fieldSize:1024*1024*3,
  },
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;

router.get('/home', function(req, res, next){
  res.render('home');
});



router.get('/admin_upload', function(req, res, next){
  res.render('admin_upload');
});

router.get('/footer', function(req, res, next){
  res.render('footer');
});

router.post('/upload',upload.single('image'), async function(req, res, next) {
  
  await Art.insertMany([{ 
    categories: req.body.categories,
    image: req.file.filename,
    title: req.body.title, 
    price: req.body.price, 
    description: req.body.description }]);
  res.redirect('/admin_art');
});

router.get('/admin_art', async function(req, res, next){
  const arts = await Art.find();
  res.render('admin_art', {myarts : arts});
});


router.get('/fanarts', async function(req, res, next){
  const arts = await Art.find({categories: 'Fanarts'});
  res.render('fanarts', {categories : arts});
});

router.get('/dogs', async function(req, res, next){
  const arts = await Art.find({categories: 'Dogs'});
  res.render('dogs', {categories : arts});
});

router.get('/TVshows', async function(req, res, next){
  const arts = await Art.find({categories: 'TV Shows'});
  res.render('TVshows', {categories : arts});
});

router.get('/describe/:id', async function(req, res, next){
  const describe = await Art.findOne({_id: req.params.id});
  res.render('description', {describe: describe});
});

router.get('/fanart_admin', async function(req, res, next){
  const arts = await Art.find({categories: 'Fanarts'});
  res.render('fanart_admin', {categories : arts});
});

router.get('/dogs_admin', async function(req, res, next){
  const arts = await Art.find({categories: 'Dogs'});
  res.render('dogs_admin', {categories : arts});
});

router.get('/TVshows_admin', async function(req, res, next){
  const arts = await Art.find({categories: 'TV Shows'});
  res.render('TVshows_admin', {categories : arts});
});

router.get('/describe_admin/:id', async function(req, res, next){
  const describe = await Art.findOne({_id: req.params.id});
  res.render('description_admin', {describe: describe});
});