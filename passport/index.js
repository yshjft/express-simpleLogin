const local=require('./localStrategy');
const {User}=require('../models');

module.exports=(passport)=>{
  passport.serializeUser((user, done)=>{
    done(null, user.id); //req.session 객체에 어떤 데이터를 저장할지 결정
  });

  passport.deserializeUser((id, done)=>{ //매 요청시 실행
    User.findOne({where : {id}})
      .then(user => done(null, user))//조회한 정보 req.user에 저장
      .catch(err=>done(err));
  });

  local(passport);
}