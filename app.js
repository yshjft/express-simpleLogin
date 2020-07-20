const express=require('express');
const morgan=require('morgan');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const path=require('path');
const flash=require('connect-flash');
const passport=require('passport');// +추가
require('dotenv').config();

const pageRouter=require('./routes/page');
const authRouter=require('./routes/auth');

const {sequelize}=require('./models');// +추가
const passportConfig=require('./passport');// +추가, require('./passport/index.js')

const app=express();
sequelize.sync(); //+추가
passportConfig(passport);//+추가

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8035);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.SECRET_CODE));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.SECRET_CODE,
  cookie:{
    httpOnly : true,
    secure: false,    
  }
}));
app.use(flash());
app.use(passport.initialize()); //+추가, req객체에 passport 설정을 심는다
app.use(passport.session()); //+추가, req.session객체에 passport 정보를 저장한다, 무조건 express-session 미들웨어보다 뒤에


app.use('/', pageRouter);
app.use('/auth', authRouter);

app.use((req,res, next)=>{
  const err=new Error('Not Found');
  err.status=404;
  next(err);
});

app.use((err, req, res, next)=>{
  res.locals.message=err.message;
  res.locals.error=req.app.get('env') === 'development' ? err :{};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기 중');
});