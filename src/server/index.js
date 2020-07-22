require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const OktaJwtVerifier = require('@okta/jwt-verifier');


const app = express();
app.use(cors());
app.use(bodyParser.json());


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

    user: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },

    score: {
        type: Sequelize.INTEGER,
        references: {
            model: Score,
            key: 'id',
        }
    }

});

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

    LeagueUsers: {
        type: Sequelize.INTEGER,
        references: {
            model: LeagueUser,
            key: 'id'
        }
    }

});

epilogue.initialize({ app, sequelize: database });

epilogue.resource({
    model: League,
    endpoints: ['/leagues', '/leagues/:id'],
  });



const port = process.env.SERVER_PORT || 3001;

database.sync({alter: true}).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});