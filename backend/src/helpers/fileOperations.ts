import fsPromises from 'fs/promises';
import path from 'path';

const filepath = path.join(__dirname, '..', 'data', 'users.json');

const readFile = async (pathData = filepath) => {
  const result = await fsPromises.readFile(pathData, {
    encoding: 'utf-8',
    flag: 'r',
  });

  return JSON.parse(result);
};

const writeFile = async (resource: any, pathData = filepath) => {
  await fsPromises.writeFile(pathData, resource, {
    encoding: 'utf-8',
    flag: 'w',
  });
};

export { readFile, writeFile };
