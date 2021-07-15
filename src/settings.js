import dotenv from 'dotenv';
dotenv.config();
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;

export const userString =  'me'
export const hostString =  'localhost'
export const databaseString =  'school'
export const passwordString =  'password'
export const portNumber =  5432