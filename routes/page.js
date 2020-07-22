const express=require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router=express.Router();

router.get('/', isNotLoggedIn, (req, res)=>{
  res.render('index', 
    {
      title : 'simple_login',
      user:req.user,
      loginError:req.flash('loginError'),
    });
});

router.get('/join', isNotLoggedIn, (req,res)=>{
  res.render('join',
    {
      title : 'join',
      user:req.user,
      joinError : req.flash('joinError'),
    });
});

router.get('/after-login', isLoggedIn, (req, res)=>{
  res.render('afterLogin', 
    {
      title : 'after-login',
      user:req.user,
    }
  );
});

module.exports=router;