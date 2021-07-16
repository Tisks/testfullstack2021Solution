import { pool } from '../models/pool';
import {
  insertTableArray
} from './queries';

const executeQueryArray = async (previous, q) => {
  await previous;
  return pool.query(q);
};

export const createTables = () => insertTableArray.reduce(executeQueryArray, Promise.resolve());
