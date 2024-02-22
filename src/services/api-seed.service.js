import https from 'https';
import http from 'http';

const getDataApiReq = async (resource, method) => {
  try {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 443,
      path: '/users',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // url = 'https://reqres.in/api/users?page=2';
    // url = 'https://jsonplaceholder.typicode.com/users';
    console.log('GetDataApiExt: ');

    const req = https.request(options, (res) => {
      console.log('ON');
      let resAccum = '';

      //console.log(res.headers);
      //console.log(res.statusCode, res.statusMessage);
      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        resAccum += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on('end', () => {
        const result = JSON.parse(resAccum);
        console.log(result);
      });
    });

    req.on('error', (err) => {
      console.log('Req.Error: ', err);
    });

    req.end();
  } catch (err) {
    console.log('Catch.Service - Error: ', err);
  }
};

const getDataApi = async (resource, method) => {
  try {
    const url = 'https://reqres.in/api/users';
    // const url = 'https://jsonplaceholder.typicode.com/users';
    let result;
    const resp = await fetch(url);
    if( resp.status == 200){
      const dataJson = await resp.json();
      console.log('Service DATA: ', dataJson['data']);
      result = dataJson['data'];
    } else {
      result = { code: resp.status, message: resp.statusText }
    }
    return result;
  } catch (error) {
    console.log('Service ERROR: ', error);
    throw error;
  }
}

export { getDataApi };
