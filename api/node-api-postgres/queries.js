const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_campus',
    password: 'Password',
    port: 5432,
})

const getCampuses = (request, response) => {
    pool.query('SELECT * FROM campuses ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNewestCampus = (request, response) => {
  pool.query('SELECT MAX(id) AS id FROM campuses', (error, results) => {
      if(error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getStudents = (request, response) => {
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
      if(error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getStudentsInCampus = (request, response) => {
  const id = parseInt(request.params.id) 
  pool.query("SELECT * FROM students INNER JOIN (SELECT * FROM studentcampusrelationship WHERE campusid = $1) AS filteredstudents ON students.id = filteredstudents.studentid", [id], (error, results) => {
      if(error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getStudentsNotInCampus = (request, response) => {
  const id = parseInt(request.params.id) 
  pool.query("SELECT * FROM students INNER JOIN (SELECT * FROM studentcampusrelationship WHERE NOT campusid = $1) AS filteredstudents ON students.id = filteredstudents.studentid", [id], (error, results) => {
      if(error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getStudentById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getCampusById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM campuses WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createCampus = (request, response) => {
  const { name, imageurl, address, description } = request.body

  pool.query(`INSERT INTO campuses (name, imageurl, address, description) VALUES ($1, $2, $3, $4)`, [name, imageurl, address, description], (error, results) => {
      if (error) {
          throw error
      }
      response.status(201).send(`Campus added with ID: ${results.insertId}`)
  })
}

const createStudent = (request, response) => {
  const { firstname, lastname, email, imageurl, gpa } = request.body

  pool.query(`INSERT INTO students (firstname, lastname, email, imageurl, gpa) VALUES ($1, $2, $3, $4, $5)`, [firstname, lastname, email, imageurl, gpa], (error, results) => {
      if (error) {
          throw error
      }
      response.status(201).send(`Student added with ID: ${results.insertId}`)
  })
}

const addCampusToStudent = (request, response) => {
  const id = parseInt(request.params.id);
  const  {name} = request.body;
  db.query(`INSERT INTO studentscampusrelationship (studentid, campusid) VALUES ($1, (SELECT campusid FROM campus WHERE name = $2))`,  [id, name], (error, results) => {
      if(error) {
          throw error
      }
      response.status(201).send(`Campus added ${results}`)
  })
}

const addStudenttoCampus = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstname, lastname } = request.body;

  db.query(`INSERT INTO studentscampusrelationship (studentid, campusid) VALUES ((SELECT studentid FROM students WHERE (firstname = $1 AND lastname = $2)), $3)`,  [firstname, lastname, id], (error, results) => {
      if(error) {
          throw error
      }
      response.status(201).send(`Student added ${results}`)
  })
}

const updateCampus = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, imageurl, address, description } = request.body
  
    pool.query(
      'UPDATE campuses SET name = $1, imageurl = $2, address = $3, description = $4 WHERE id = $5',
      [ name, imageurl, address, description, id ],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Campus modified with ID: ${id}`)
      }
    )
}

const updateStudent = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstname, lastname, email, imageurl, gpa } = request.body
  
    pool.query(
      'UPDATE students SET firstname = $1, lastname = $2, email = $3, imageurl = $4, gpa = $5 WHERE id = $6',
      [firstname, lastname, email, imageurl, gpa, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Student modified with ID: ${id}`)
      }
    )
}

const deleteCampus = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM campuses WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Campus deleted with ID: ${id}`)
    })
}

const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Student deleted with ID: ${id}`)
    })
}

module.exports = {
    getCampuses,
    getStudents,
    getCampusById,
    getStudentById,
    createCampus,
    createStudent,
    deleteStudent,
    deleteCampus,
    addCampusToStudent,
    addStudenttoCampus,
    updateStudent,
    updateCampus,
    getNewestCampus,
    getStudentsInCampus
}