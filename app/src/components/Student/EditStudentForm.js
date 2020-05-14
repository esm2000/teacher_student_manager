import React, { Component } from 'react'
import '../../css/Students.css'

// ADD FUNCTIONALITY
  // PROPS
  // ------
  // ------
  // id - student id
  // firstName - student first name 
  // lastName - student last name
  // email - student email
  // imageurl - student imageurl
  // gpa - student gpa
  // ------
class EditStudentForm extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit = () => {
    console.log(this.props.id);
  }

  handleChange = (e) => {
    console.log(e.target.value);
    console.log(this.props.id);
    //this.setState({school: e.target.value});
  }

  render(){
    return (
      <div className="editstudentform-container">
        <form onSubmit={this.handleSubmit}>
          <h1>Edit Student Form</h1>
          <label>First Name <input type='text' placeholder={this.props.firstName} onChange={this.handleChange}/></label>
          <label>Last Name <input type='text' placeholder={this.props.lastName} onChange={this.handleChange}/></label>
          <label>GPA <input type='text' placeholder={this.props.gpa} onChange={this.handleChange}/></label>
          <label>Student Image URL <input type='text' placeholder={this.props.imageurl} onChange={this.handleChange}/></label>
          <input className="hide" name="id" value={this.props.id} readOnly></input>
          <input type='submit' value="Save Changes"/> {/*ADD REDIRECT TO /CAMPUSES*/}
        </form>
      </div>
    );
  }
}

export default EditStudentForm;
