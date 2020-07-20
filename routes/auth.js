const express=require('express');
const passport=require('passport');
const bcrypt=require('bcryptjs');
const {isLoggedIn, isNotLoggedIn}=require('./middlewares');
const {User}=require('../models');

const router=express.Router();

router.post('/join', async(req, res, next)=>{
  const {email, nick, password}=req.body;
  try{
    const exUser=await User.findOne({where: {email}});
    if(exUser){
      req.flash('joinError', '이미 가입된 이메일입니다.'); //flash 사용, 메시지 등록
      return res.redirect('/join');
    }
    const hash=await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');

  }catch(error){
    console.error(error);
    return next(errpr);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next)=>{
  passport.authenticate('local', (authError, user, info)=>{ // passport.authenticate 미들웨어가 로콜 로그인 전략 수행
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    return req.login(user, (loginError)=>{ //passport는 req객체에 login과 logout 메서드를 추가합니다.
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/after-login');
    }); //req.login은 passport.serializeUser를 호출, req.login에 제공하는 user객체가 serializeUser로 넘어가게 된다.
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res)=>{
  
  req.logout();//req.user객체 제거
  req.session.destroy();
  res.redirect('/');
});

module.exports=router;