import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    //Probar si funciona
    this.id = table.toLowerCase()+'_id';
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }
  async selectAll(clause) {
    let query = `SELECT * FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }
  async insertWithReturn(columns, values) {
    console.log("insertWithReturn: linea 30")
    let query = `
          INSERT INTO ${this.table} (${columns})
          VALUES (${values}) 
          RETURNING ${this.id},${columns}
    `;
    return this.pool.query(query);
  }
  async update(columns, values, conditions) {
    //Verificar que funcione
    let single_column
    let single_value
    let query = `
          UPDATE ${this.table}
          SET `
    for (let i = 0; i < columns.length; i++) {
      single_column = columns[i];
      single_value = values[i];
      if(single_value !== 'undefined'){
        query+= `${single_column} = ${single_value}, `
      }
    }
    query+= `WHERE ${conditions}`
    console.log('Linea 46: ', query)
    return this.pool.query(query);
  }
  async delete(conditions) {
    const query = `
          DELETE FROM ${this.table}
          WHERE ${conditions}
          RETURNING *;
      `;
    return this.pool.query(query);
  }

}

export default Model;