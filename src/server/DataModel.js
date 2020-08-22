const Sequelize = require('sequelize');

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
  });

const User = database.define(('user'), {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    } ,
    lastName: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Score = database.define('score', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: Sequelize.DATE,
    value: Sequelize.STRING,

});


const LeagueUser = database.define('leagueUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

});

LeagueUser.hasMany(Score);
Score.belongsTo(LeagueUser);

User.hasMany(LeagueUser);
LeagueUser.belongsTo(User);


const League = database.define('league', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    } ,
    scoreType: Sequelize.STRING,

    scoreDirectionUp: Sequelize.BOOLEAN,

});

League.hasMany(LeagueUser);
LeagueUser.belongsTo(League);

exports.League = League;
exports.LeagueUser = LeagueUser;
exports.Score = Score;
exports.User = User;
exports.database = database;

