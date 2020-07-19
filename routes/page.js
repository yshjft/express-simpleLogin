const express=require('express');

const router=express.Router();

router.get('/', (req, res)=>{
  res.render('index', {title : 'simple_login'});
});

router.get('/signin',(req,res)=>{
  res.render('signin', {title : 'sign_in'})
});

router.get('/after-login', (req, res)=>{
  res.render('afterLogin', 
    {
      title : 'after-login',
      nick : null,
    }
  );
});



module.exports=router;