const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcryptjs');

const {User} = require('../models');

module.exports=(passport)=>{
  passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
  }, async(email, password, done)=>{
    try{
      const exUser=await User.findOne({where : {email}});
      if(exUser){
        const result=await bcrypt.compare(password, exUser.password);
        if(result){
          done(null, exUser); //로그인 성공
        }else{
          done(null, false, {message : '비밀번호가 일치하지 않습니다.'}); //로그인 실패
        }
      }else{
        done(null, false, {message : '가입되지 않은 회원입니다.'}); //로그인 실패
      }
    }catch(error){
      console.error(error);
      done(error);//서버 에러
    }
  }));
};