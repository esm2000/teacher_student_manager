import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import EditCampusForm from '../Campuses/EditCampusForm';
import StudentPresent from './StudentPresent';
import StudentAbsent from './StudentAbsent';
import Student from '../Student/Student'

import '../../css/Campus.css';

class Campus extends Component {
  // PROPS
  // ------
  // ------
  // id - campus id
  // name - campus name
  // address - campus address
  // imageurl - campus imageurl
  // description - campus description
  // numStudents - number of students in campus
  // studentData - the student data for each student in a campus, to be used to generate student cards
  // ------
  
  // STATE
  // ------
  // ------
  // isEdit - if true render an EditCampusForm component
  // isStudent - if it exists/is true render Student component (single Student page)
  // studentPageInfo - contains student information to pass into Student component
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isStudent: null,
      studentPageInfo: {}
    }
  }

  // this function changes isStudent in the state to true
  // and gets fired by clicking on the name of a student in a StudentCard component
  // PATH: CAMPUS -> StudentPresent -> StudentCard
  changeIsSingle = () => {
    this.setState({
      isStudent: true
    })
  }

  // this function populates the studentPageInfo object
  // with the information of the student that had their name clicked in a StudentCard component
  // PATH: CAMPUS -> StudentPresent -> StudentCard
  changeSingleInfo = (id, name, email, imageurl, gpa) => {
    this.setState({
      studentPageInfo: {
        id: id,
        name: name,
        email: email,
        imageurl: imageurl,
        gpa: gpa
      }
    })
  }

  // this function switches isEdit in state to true 
  // and causes a render of the EditCampusForm component
  handleEditClick = () => {
    this.setState({
      isEdit: !(this.state.isEdit)
    })
  }

  // Delete the campus from the database and redirect the user back to Campuses
  handleDeleteClick = () => {
    axios.delete(`http://localhost:3003/campuses/delete/${this.props.id}`)
      .then(res => {
        console.log(res.data);
        window.location.replace("http://localhost:3005/");
      })
  }

  render(){
    // if isEdit is false, 
    if(!this.state.isEdit){
      // and there are no students in the campus, render the StudentAbsent component
      if( !this.props.numStudents || this.props.numStudents === 0 ){ {/*QUERY: this.state.RELQUERYRES.length === 0 */}
        return (
          <StudentAbsent
            imageUrl={this.props.imageurl}
            address={this.props.address}
            name={this.props.name}
            description={this.props.description}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
          />
        )
      // and if isStudent is true, render the a single student page
      } else if(this.state.isStudent) {
        return(
          <Student
            id={this.state.studentPageInfo.id}
            name={this.state.studentPageInfo.name}
            email={this.state.studentPageInfo.email}
            imageurl={this.state.studentPageInfo.imageurl}
            gpa={this.state.studentPageInfo.gpa}
            singleCardInfo={this.state.studentPageInfo}
          />
        );
      // and if isStudent is false, render the StudentPresent component
      } else {
        return (
          <StudentPresent
            imageUrl={this.props.imageurl}
            address={this.props.address}
            name={this.props.name}
            description={this.props.description}
            studentData={this.props.studentData}
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
            changeIsSingle={this.changeIsSingle}
            changeSingleInfo={this.changeSingleInfo}
          />
        )
      }
    // if isEdit is true, render the EditCampusForm component
    } else {
        return (
          <EditCampusForm
            id={this.props.id}
            name={this.props.name}
            address={this.props.address}
            imageurl={this.props.imageurl}
            description={this.props.description}
          />
        )
    }

  }
}

export default Campus;
