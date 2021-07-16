
export var insertTableArray = []

var createTable = (tableName, columnNames, dataTypes) => {
  let query = `DROP TABLE IF EXISTS ${tableName} CASCADE; `
  if(columnNames.length !== dataTypes.length){
    console.log(`En la tabla ${tableNames} existen un numero desigual de nombres de columnas y tipo de datos`)
    return;
  }
  let columns = ''
  for (let i = 0; i<columnNames.length; i++) {
      if(i+1 === columnNames.length){
        columns+= `${columnNames[i]} ${dataTypes[i]}`
      }
      else{        
        columns+= `${columnNames[i]} ${dataTypes[i]}, `
      }
  }
  query += `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`

  insertTableArray.push(query)
}

let table = 'Student'
let columnNames = ['student_id', 'name', 'lastName']
let dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 'VARCHAR NOT NULL', 'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Teacher'
columnNames = ['teacher_id', 'name', 'lastName']
dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 'VARCHAR NOT NULL', 'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Subject'
columnNames = ['subject_id', 'name']
dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Teacher_Subject'
columnNames = ['teacher_subject_id','teacher_id','subject_id', 'CONSTRAINT cs_teacher_fk','CONSTRAINT cs_subject_fk', 'CONSTRAINT teacher_subject_pk']
dataTypes = ['INT UNIQUE GENERATED ALWAYS AS IDENTITY',
            'INT NOT NULL ',
            'INT NOT NULL ',
            'FOREIGN KEY (teacher_id) REFERENCES Teacher (teacher_id) ON UPDATE CASCADE ON DELETE CASCADE',
            'FOREIGN KEY (subject_id) REFERENCES Subject (subject_id) ON UPDATE CASCADE ON DELETE CASCADE',
            'PRIMARY KEY (teacher_id,subject_id)']

createTable(table, columnNames, dataTypes)


table = 'Course'
columnNames = ['course_id','teacher_subject_id', 'CONSTRAINT cs_teacher_course_fk','name']
dataTypes = [ 
              'INT UNIQUE primary key NOT NULL  GENERATED ALWAYS AS IDENTITY',
              'INT NOT NULL ',
              'FOREIGN KEY (teacher_subject_id) REFERENCES Teacher_Subject (teacher_subject_id) ON UPDATE CASCADE ON DELETE CASCADE',
              'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Student_Course'
columnNames = ['student_course_id','student_id', 'course_id','CONSTRAINT cs_teacher_course_fk','CONSTRAINT cs_subject_course_fk','CONSTRAINT student_course_pk']
dataTypes = [ 'INT UNIQUE GENERATED ALWAYS AS IDENTITY',
              'INT NOT NULL',
              'INT NOT NULL',
              'FOREIGN KEY (student_id) REFERENCES Student (student_id) ON UPDATE CASCADE ON DELETE CASCADE',
              'FOREIGN KEY (course_id) REFERENCES Course (course_id) ON UPDATE CASCADE ON DELETE CASCADE',
              'PRIMARY KEY (student_id,course_id)']

createTable(table,columnNames,dataTypes)

table = 'Test'
columnNames = ['test_id', 'course_id','CONSTRAINT cs_teacher_course_fk','title','date']
dataTypes = ['INT UNIQUE primary key  GENERATED ALWAYS AS IDENTITY', 
             'INT NOT NULL',
             'FOREIGN KEY (course_id) REFERENCES Course (course_id)  ON UPDATE CASCADE ON DELETE CASCADE',
             'VARCHAR NOT NULL',
             'TIMESTAMP NOT NULL']


createTable(table,columnNames,dataTypes)

table = 'Mark'
columnNames = ['mark_id','test_id','student_course_id','CONSTRAINT cs_test_fk','CONSTRAINT cs_student_course_fk','CONSTRAINT mark_pk','mark']
dataTypes = [ 'INT UNIQUE GENERATED ALWAYS AS IDENTITY',
              'INT NOT NULL',
              'INT NOT NULL',
              'FOREIGN KEY (test_id) REFERENCES Test (test_id)  ON UPDATE CASCADE ON DELETE CASCADE',
              'FOREIGN KEY (student_course_id) REFERENCES Student_Course (student_course_id)  ON UPDATE CASCADE ON DELETE CASCADE',
              'PRIMARY KEY (test_id,student_course_id)',
              'DECIMAL NOT NULL']

createTable(table,columnNames,dataTypes)


export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
  `;

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
      ('orji', 'second message')
`;

export const dropMessagesTable = 'DROP TABLE messages';
