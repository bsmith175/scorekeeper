
export const FORMAT_DATE = 'yyyy-MM-dd';

const API = process.env.REACT_APP_API || 'http://localhost:3001';

export async function doFetch(method, endpoint, body) {
    console.log(body);
    debugger;

    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      console.log(response);
      return  {response: await response.json(), error: null};
    } catch (error) {
      console.error(error);
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

  export const getAllDatesWithScore = (league) => {
    
  }

