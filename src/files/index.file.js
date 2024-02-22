import fs from 'fs';

const saveToFile = (resource, data) => {
  try {
    if (fs.existsSync(`./src/database/data/${resource}.json`)) {
      let users = [];
      users = fs.readFileSync(
        `./src/database/data/${resource}.json`
      );
      users.push(JSON.parse(data))
    } else {
      fs.writeFileSync(
        `./src/database/data/${resource}.json`,
        JSON.stringify(data, null, 2),
        {
          encoding: 'utf-8',
        }
      );
    }
    console.log('Index.file: JSON data SAVED to file successfully.');
  } catch (error) {
    console.error('Error writing JSON data to file:', error);
  }
};

const readToFile = (resource) => {
  try {
    const buffer = fs.readFileSync(
      `./src/database/data/${resource}.json`, 
      {
        encoding: 'utf-8',
      }
    );
    console.log('JSON data READ to file successfully.');
    return JSON.parse(buffer);
      

  } catch (error) {
    console.error('Error read JSON data to file:', error);
  }
};

export { saveToFile, readToFile };
