require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const {database, League, User, LeagueUser, Score } = require('./DataModel');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/leagues', async function (req, res) {
    const allLeagues = await League.findAll({include: {all: true, nested: true}});
    res.send(JSON.stringify(allLeagues));
 })

 app.delete('/leagues/:id', async function (req, res) {
   const { id } = req.params;
   await League.destroy({
    where: {
      id: id,
    }
  });

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
     try {
      await Score.destroy({where: {leagueUserId: leagueUserId, leagueId, date: date}});
      const newScore = await Score.create({date, scoreType, leagueUserId, leagueId, value: score});
      const user = await LeagueUser.find({where: {id: leagueUserId}});
      console.log('got here')
      await user.addScore(newScore);
      res.send(JSON.stringify(newScore));
     } catch (err) {
       res.send(JSON.stringify(err));
     }

 })
 
// epilogue.resource({
//     model: League,
//     endpoints: ['/leagues', '/leagues/:id'],
//   });

//   epilogue.resource({
//     model: User,
//     endpoints: ['/user', '/user/:id'],
//   });



const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../react/build')));
  app.get('*', function(req, res) {
    response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
  });
}

database.sync({alter: false}).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});