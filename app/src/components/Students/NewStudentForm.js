import React, { Component } from 'react'
import '../../css/Students.css'

// ADD FUNCTIONALITY
// this component is the form for a new student and currently lacks the ability to take 
// in and pass new student data to the database
class NewStudentForm extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit = () => {
    console.log('Adding new student to database...');
  }

  handleChange = (e) => {
    console.log(e.target.value);
    //this.setState({school: e.target.value});
  }

  render(){
    return (
      <div className="newstudentform-container">
        <form onSubmit={this.handleSubmit} method="POST" action="http://localhost:3003/students">
          <h1>New Student Form</h1>
          <h2>Student Name</h2>
          <input type='text' onChange={this.handleChange}/>
          <input className="hide" value="http://clipart-library.com/new_gallery/142-1427672_college-students-images-hd-png-download-student-image.png" type='text' name="imageurl" onChange={this.handleChange}/>
          <input type='submit' value="Add Student"/> {/*ADD REDIRECT TO /STUDENTS*/}
        </form>
      </div>
    );
  }
}

export default NewStudentForm;
