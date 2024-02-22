import http from 'node:http';
import indexRoutes from './src/routes/index.routes.js';

// import semver from 'semver';
import pkg from './package.json' assert {type: 'json'};

console.warn("NodeJs version: ", process.version);
const version = pkg.engines.node;
console.warn("Package version: ", version);

// if (!semver.satisfies(process.version, version)) {
//   console.log(
//     `Required node version ${version} not satisfied with current version ${process.version}.`,
//   );
//   process.exit(1);
// }

const port = process.env.NODE_PORT || 3000;

const httpServer = http
  .createServer(indexRoutes)
  .listen(port, () => {
    console.log(`Server running at port ${port}`);
  });


export { httpServer }