import { pool } from '../models/pool';
import {
  insertTableArray
} from './queries';

/*
export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  console.log(arr)
  arr.reduce(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});
*/
const executeQueryArray = async (previous, q) => {
  await previous;
  return pool.query(q);
};

export const createTables = () => insertTableArray.reduce(executeQueryArray, Promise.resolve());

//export const dropTables = () => executeQueryArray([ dropMessagesTable ]);
//export const createTables = () => executeQueryArray([ createMessageTable ]);
//export const insertIntoTables = () => executeQueryArray([ insertTeachers ]);
