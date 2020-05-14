// DOCUMENTATION/GUIDE: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const db = require('./queries')
const port = 3003


// This method allows the apps to exchange information
app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/students', db.getStudents)
app.get('/campuses', db.getCampuses)
app.get('/campuses/new', db.getNewestCampus)
app.get('/students/:id', db.getStudentById)
app.get('/campuses/:id', db.getCampusById)
app.get('/students/in/campus/:id', db.getStudentsInCampus)
app.post('/students/:id', bodyParser.json(),db.addCampusToStudent)
app.post('/campuses/:id', bodyParser.json(),db.addStudenttoCampus)
app.post('/students', db.createStudent)
app.post('/campuses', db.createCampus)
app.delete('/students/delete/:id', db.deleteStudent)
app.delete('/campuses/delete/:id', db.deleteCampus)
app.put('/students/update/:id', db.updateStudent)
app.put('/campuses/update/:id', db.updateCampus)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})



