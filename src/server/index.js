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
     newLeagueUser.createUser({firstName, lastName, email});
     const league = await League.findAll({where: {id: leagueId}});
     league[0].addLeagueUser(newLeagueUser);
     newLeagueUser.setLeague(league[0]);
     res.send(JSON.stringify(newLeagueUser));

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

database.sync({alter: true}).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});