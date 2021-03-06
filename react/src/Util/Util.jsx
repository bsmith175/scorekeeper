import { compareAsc, format } from "date-fns";


export const FORMAT_TIME_SCORE = 'm ss';
export const FORMAT_DATE = 'yyyy-MM-dd';
const PORT = process.env.REACT_APP_PORT || '3001';
const API =  process.env.NODE_ENV === 'production' ? 'https://crossword.herokuapp.com' 
                                                   : `http://localhost:${PORT}`;

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

  //return function returns positive number if score1 beats score2, 0 if scores are equal, negative 
  //number otherwise
  export const scoreComparator = ((scoreDirectionUp, scoreType) => {
    return function(score1, score2) {
      if (scoreType === scoreTypes.POINTS) {
        return scoreDirectionUp ? score1 - score2 :  score2 - score1;
      } else {
        const time1 = score1.replace(' ', '');
        const time2 = score2.replace(' ', '');
        return scoreDirectionUp ? time1 - time2 : time2 - time1;   
      }
    }
  });

  export const addScores = (scoreType) => {
    return function(score1, score2) {
      if (!score1) return score2;
      if (!score2) return score1;
      if (scoreType === scoreTypes.POINTS) {
        return parseInt(score1) + parseInt(score2);
      } else {
        score1 = score1.split(' ');
        score2 = score2.split(' ');
        const seconds1 = parseInt(score1[0]) * 60 + parseInt(score1[1]);
        const seconds2 = parseInt(score2[0]) * 60 + parseInt(score2[1]);
        return `${Math.floor((seconds1 + seconds2) / 60)} ${(seconds1 + seconds2) % 60}`;
      }

    }
  }

  //takes in int and converts to unformatted score
  export function intToScore(score, scoreType) {
    if (scoreType === scoreTypes.POINTS) {
      return `${score}`;
    } else {
      const minutes = Math.floor(score / 60);
      const secs = score % 60;
      return `${minutes} ${secs < 10 ? `0${secs}` : secs}`;
    }
  }
  //takes in unparsed score string and converts to int (number of seconds or point value)
  export function scoreToInt(score, scoreType) {
    if (scoreType === scoreTypes.POINTS) {
      return parseInt(score);
    } else {
      score = score.split(' ');
      const seconds = parseInt(score[0]) * 60 + parseInt(score[1]);
      return seconds;
    }
  }

  //returns a map with key as a date string and value as a Map with key: leagueUser id and 
  // value: the users best score for that date 
  export const getAllDatesWithScore = (league, comparator) => {
    if (!league) return null;
    const dates = new Map();
    const leagueUsers = [...league.leagueUsers];
    leagueUsers.forEach((leagueUser) => 
    leagueUser.scores.forEach((score) => {
      if (dates.has(score.date)) {
        return false;
      } else {
        dates.set(score.date, null);
        return true;
      }
   }));
   leagueUsers.forEach((leagueUser) => {
      leagueUser.scores.forEach((score) => {
        let userMap = dates.get(score.date);
        if (userMap === null) {
          userMap = new Map();
          userMap.set(leagueUser.id, score);
          dates.set(score.date, userMap);
        } else {
          const bestScore = userMap.get(leagueUser.id);
          if (!bestScore || comparator(score.value, bestScore.value) > 0) {
            userMap.set(leagueUser.id, score);
          }
        }
     })
  })
   return dates;
  }

//returns foramtted date without adjusting for time zone (date-fns does this automatically)
export function formatIgnoreTimeZone(date, formatString) {
  const dateNew = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  return format(dateNew, formatString);
}

export const scoreTypes = {
  POINTS : 'points',
  TIME : 'time',
};

export function parseScore(scoreString) {
  if (!scoreString) return null;
  const toArr = scoreString.trim().split(' ');
  if (toArr.length === 1) {
    return toArr[0];
  } else if (toArr.length === 2) {
    return toArr[0] + ':' + toArr[1];
  }
  return null;
}