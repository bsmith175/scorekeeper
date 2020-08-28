import { compareAsc } from "date-fns";

export const FORMAT_DATE = 'yyyy-MM-dd';

const API = process.env.REACT_APP_API || 'http://localhost:3001';

export async function doFetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      return  {response: await response.json(), error: null};
    } catch (error) {
      return {response: null, error: error};
    }
  }

  //returns positive number if score1 beats score2, 0 if scores are equal, negative 
  //number otherwise
  export const scoreComparator = ((scoreDirectionUp) => {
    return function(score1, score2) {
      return scoreDirectionUp ? score1 - score2 :  score2 - score1;
    }
  });

  //returns a map with key as a date string and value as a Map with key: leagueUser id and 
  // value: the users best score for that date 
  export const getAllDatesWithScore = (league) => {
    if (!league) return null;
    const dates = new Map();
    const leagueUsers = [...league.leagueUsers];
    leagueUsers.flatMap((leagueUser) => 
    leagueUser.scores.map((score) => score.date)).filter((date) => {
      if (dates.has(date)) {
        return false;
      } else {
        dates.set(date, null);
        return true;
      }
   });
   for (const leagueUser in leagueUsers) {
     for (const score in leagueUser.scores) {
        const userMap = dates.get(score.date);
        if (userMap === null) {
          userMap = new Map();
          userMap.set(leagueUser.id, score);
          dates.set(score.date, userMap);
        } else {
          const bestScore = userMap.get(leagueUser.id);
          if (scoreComparator(score.value, bestScore.value) > 0) {
            userMap.set(leagueUser.id, score);
          }
        }
     }
   }
   return dates;
  }


