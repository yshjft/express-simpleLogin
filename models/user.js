module.exports=(sequelize, DataTypes) =>{
  return sequelize.define('user', {
    email :{
      type: DataTypes.STRING(20),
      allowNull : false,
      unique : true,
    },
    nick :{
      type:DataTypes.STRING(15),
      allowNull:false, //NOT NULL 속성
    },
    password:{
      type: DataTypes.STRING(100),
      allowNull : false,
    }
  },{
    timestamps : true, //createdAt, updatedAt 컬럼 추가
    paranoid : true,
  });
};