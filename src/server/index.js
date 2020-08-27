require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const {database, League, User, LeagueUser, Score } = require('./DataModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/leagues', async function (req, res) {
    const allLeagues = await League.findAll({include: {all: true, nested: true}});
    res.send(JSON.stringify(allLeagues));
 })

 app.get('/leagues/:id', async function (req, res) {
     const { id: leagueId } = req.params;
    const retLeague = (await League.findAll({
        where: {
            id: leagueId,
        },
        include: {
            all: true,
            nested: true,
        }
    }))[0];

    res.send(JSON.stringify(retLeague));
 })

 app.post('/leagues', async function (req, res) {
    const newLeague = await League.create(req.body);
    res.send(JSON.stringify(newLeague));
 })

 app.post('/leagueUser', async function (req, res) {
     const {firstName, lastName, email, leagueId} = req.body;
     const newLeagueUser = await LeagueUser.create();
     await newLeagueUser.createUser({firstName, lastName, email});
     const league = await League.find({where: {id: leagueId}});
     await league.addLeagueUser(newLeagueUser);
     res.send(JSON.stringify(newLeagueUser));

 })

 app.post('/score', async function (req, res) {
     const {leagueId, leagueUserId, score, date, scoreType} = req.body;
     console.log(leagueUserId);
     console.log(score);
     console.log(date);
     const newScore = await Score.create({date, scoreType, value: score});
     const user = await LeagueUser.find({where: {id: leagueUserId}});
     await user.addScore(newScore);
     res.send(JSON.stringify(newScore));

 })
 
// epilogue.resource({
//     model: League,
//     endpoints: ['/leagues', '/leagues/:id'],
//   });

//   epilogue.resource({
//     model: User,
//     endpoints: ['/user', '/user/:id'],
//   });



const port = process.env.SERVER_PORT || 3001;

database.sync({alter: false}).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});