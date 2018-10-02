const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/street_art_db', {
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  email: Sequelize.TEXT,
  username: {
    type: Sequelize.TEXT,
    unique: true
  }, 
  passwordDigest: Sequelize.TEXT,
  userScore: Sequelize.INTEGER,
  icon: Sequelize.TEXT,
  art_id: Sequelize.INTEGER
});

const Art = sequelize.define('art', {
  neighborhood: Sequelize.TEXT,
  location: Sequelize.TEXT,
  date: Sequelize.DATEONLY,
  description: Sequelize.TEXT,
  imageUrl: Sequelize.TEXT,
  user_id: Sequelize.INTEGER
});

User.hasMany(Art, { onDelete: 'cascade' });
Art.belongsTo(User);

module.exports = {
  User:User,
  Art:Art,
  sequelize: sequelize
};
