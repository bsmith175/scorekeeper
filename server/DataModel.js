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
    leagueUserId: {
        type: Sequelize.INTEGER,
    },
    leagueId: Sequelize.INTEGER,
    date: {
        type: Sequelize.STRING,
        unique: true,
    }, 
    value: Sequelize.STRING,
    // either 'points or 'time'
    scoreType: Sequelize.STRING,

});


const LeagueUser = database.define('leagueUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

});

LeagueUser.hasMany(Score, {onDelete: 'CASCADE'});
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
    // either 'points' or 'time'
    scoreType: Sequelize.STRING,
    //if true, highest score wins
    scoreDirectionUp: Sequelize.BOOLEAN,

});

League.hasMany(LeagueUser, {onDelete: 'CASCADE'});
LeagueUser.belongsTo(League);

exports.League = League;
exports.LeagueUser = LeagueUser;
exports.Score = Score;
exports.User = User;
exports.database = database;

