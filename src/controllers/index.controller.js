import fs from 'fs';
import { readToFile, saveToFile } from '../files/index.file.js';

import services from '../services/index.service.js';

const controller = async (request, response) => {
  try {
    const { method } = request;
    const [, queryParams] = request.url.split('?');
    const resource = new URLSearchParams(queryParams).get('resource');
    const source = new URLSearchParams(queryParams).get('source');
    const type = new URLSearchParams(queryParams).get('type');
    const page = new URLSearchParams(queryParams).get('page');
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formateDate = `${day}${month}${year}`;
    const fileName = source +'-'+ resource + '_' + formateDate;
    let code = 200;

    let result;
    if (!fs.existsSync(`./src/database/data/${fileName}.json`)) {
      result = await services(resource, method, source, type);
      saveToFile(fileName, result);
    } else {
      result = readToFile(fileName);
    }



    console.log('IndexRoute.response.code: ', code);
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(result));
    response.end();
    
  } catch (error) {
    console.error(error);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.write({ message: 'Internal error server'});
    response.end();
  }
};

export default controller;