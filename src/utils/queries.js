
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
let columnNames = ['id_student', 'student_name', 'student_lastName']
let dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 'VARCHAR NOT NULL', 'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Teacher'
columnNames = ['id_teacher', 'teacher_name', 'teacher_lastName']
dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 'VARCHAR NOT NULL', 'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Subject'
columnNames = ['id_subject', 'subject_name']
dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Teacher_Subject'
columnNames = ['id_teacher','id_subject','CONSTRAINT id_teacher_subject']
dataTypes = ['INT REFERENCES Teacher (id_teacher) ON UPDATE CASCADE ON DELETE CASCADE',
            'INT REFERENCES Subject (id_subject) ON UPDATE CASCADE ON DELETE CASCADE',
            'PRIMARY KEY (id_teacher, id_subject) ']

createTable(table, columnNames, dataTypes)


table = 'Course'
columnNames = ['id_teacher','id_subject','CONSTRAINT id_course', 'name']
dataTypes = [ 
            'INT REFERENCES Teacher (id_teacher) ON UPDATE CASCADE ON DELETE CASCADE',
            'INT REFERENCES Subject (id_subject) ON UPDATE CASCADE ON DELETE CASCADE',
            'PRIMARY KEY (id_teacher, id_subject) ',
            'VARCHAR NOT NULL']

createTable(table, columnNames, dataTypes)

table = 'Student_Course'
columnNames = ['id_student_course','id_course', 'id_student','FOREIGN KEY (id_student_course,id_course)']
dataTypes = [ 'INT primary key GENERATED ALWAYS AS IDENTITY',
              'INT NOT NULL',
              'INT REFERENCES Student (id_student) ON UPDATE CASCADE ON DELETE CASCADE',
              'REFERENCES Course (id_teacher,id_subject)']

createTable(table,columnNames,dataTypes)

table = 'Test'
columnNames = ['id_test', 'id_course','FOREIGN KEY (id_test,id_course)','title','date']
dataTypes = ['INT primary key GENERATED ALWAYS AS IDENTITY', 
             'INT NOT NULL',
             'REFERENCES Course (id_teacher,id_subject)',
             'VARCHAR NOT NULL',
             'TIMESTAMP NOT NULL']


createTable(table,columnNames,dataTypes)

table = 'Mark'
columnNames = ['id_student','id_test','mark']
dataTypes = ['INT REFERENCES Student (id_student) ON UPDATE CASCADE ON DELETE CASCADE',
              'INT REFERENCES Test (id_test) ON UPDATE CASCADE ON DELETE CASCADE',
              'INT NOT NULL']

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
