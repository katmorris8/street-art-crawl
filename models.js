const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'street_art_db',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  userName:{
    type:Sequelize.TEXT,
    unique:true
  }, 
  password: Sequelize.TEXT,
  userScore: Sequelize.INTEGER,
  icon:Sequelize.TEXT,
  art_id:Sequelize.INTEGER
});

const Art = sequelize.define('art', {
  name: Sequelize.TEXT,
  location: Sequelize.TEXT,
  date: Sequelize.DATEONLY,
  description:Sequelize.TEXT,
  user_id:Sequelize.INTEGER
});

Art.hasMany(User);
User.belongsTo(Art);

module.exports = {
  User:User,
  Art:Art,
  sequelize: sequelize
};
