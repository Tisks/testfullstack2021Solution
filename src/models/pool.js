import { Pool } from 'pg';
import dotenv from 'dotenv';
import { userString, hostString, databaseString, passwordString, portNumber } from '../settings';

  
export const pool = new Pool({  
    user: userString,
    host: hostString,
    database: databaseString,
    password: passwordString,
    port: portNumber
})