
const API = process.env.REACT_APP_API || 'http://localhost:3001';

export async function doFetch(method, endpoint, body) {
    console.log(body);
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
      return await response.json();
    } catch (error) {
      console.error(error);
      return error;
    }
  }
