import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/Student.css';
import axios from 'axios';
import EditStudentForm from './EditStudentForm';
import CampusPresent from './CampusPresent';
import CampusAbsent from './CampusAbsent';

  // PROPS
  // ------
  // ------
  // id - student id
  // name - student name 
  // email - student email
  // imageurl - student imageurl
  // gpa - student gpa
  // singleCardInfo - all student data as an object
  // ------
  
  // STATE
  // ------
  // ------
  // isEdit - if true, EditStudentForm component is rendered instead
class Student extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false
    }
  }


  // this function deletes the student from the database and redirects user to Students
  // this function is passed into CampusAbsent or CampusPresent component to deal with a delete button click
  // PATH1: STUDENT -> CampusAbsent
  // PATH2: STUDENT -> CampusPresent
  handleDeleteClick = () => {
    axios.delete(`http://localhost:3003/students/delete/${this.props.id}`)
      .then(res => {
        console.log(res.data);
        window.location.replace("http://localhost:3005/Students");
      })
  }

  // this function sets isEdit in state to true
  // this function is passed into CampusAbsent or CampusPresent component to deal with an edit button click
  // PATH1: STUDENT -> CampusAbsent
  // PATH2: STUDENT -> CampusPresent
  handleEditClick = () => {
    this.setState({
      isEdit: !(this.state.isEdit)
    })
  }

  render(){
    // if isEdit is false
    if(!this.state.isEdit) {
      // [FIX CONDITION] and student is not enrolled in any campuses, render CampusAbsent
      if(true){ {/*QUERY: this.state.RELQUERYRES.length === 0 */}
        return (
          <CampusAbsent
            imageurl={this.props.imageurl}
            name={this.props.name}
            gpa={this.props.gpa}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
          />
        )
      }
      // and student is enrolled in at least one campus, render CampusPresent
      else {
        return (
          <CampusPresent
            imageurl={this.props.imageurl}
            name={this.props.name}
            gpa={this.props.gpa}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
          />
        )
      }
    }
    // if isEdit is true, render EditStudentForm component
    else {
      const fullName = this.props.name.split(' ');
      return (
        <EditStudentForm
          id={this.props.id}
          firstName={fullName[0]}
          lastName={fullName[1]}
          email={this.props.email}
          imageurl={this.props.imageurl}
          gpa={this.props.gpa}
        />
      )
    }
  }
}

export default Student;

