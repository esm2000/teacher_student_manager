import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/Students.css';

// this component is rendered by the Students component when there are no students 
// in the database. It lets the user know exactly that
function StudentsAbsent(){
  return (
    <div className="students-container">
      <div className="students-header">
        <h3>All Students</h3>
        <NavLink to="/Students/NewStudentForm"><button>Add Student</button></NavLink>
      </div>
      <p>There are no students registered in the database</p>
    </div>
  )
}

export default StudentsAbsent;
