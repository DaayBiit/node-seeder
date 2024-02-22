import { getDataApi } from './api-seed.service.js';

const services = (resource, method, source, type) => {
  console.log('Services.Params: ', { resource, method, source, type });
  if (method == 'GET') {
    return getDataApi(resource, method);
  } else if (method == 'POST') {
    // await service.create();
  } else {
    // await service.remove();
  }
};

export default services;
