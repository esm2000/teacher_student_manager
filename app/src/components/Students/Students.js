import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../css/Students.css';
import StudentCard from './StudentCard';
import StudentsAbsent from './StudentsAbsent';
import StudentsPresent from './StudentsPresent';
import EditStudentForm from '../Student/EditStudentForm';
import Student from '../Student/Student';

// This component is the Students page, it displays StudentCards to user
class Students extends Component {
  // PROPS
  // ------
  // ------
  // NONE
  // ------
  
  // STATE
  // ------
  // ------
  // studentCardInfo - array of StudentCard data that will be passed into StudentCard components
  // isSingle - false by default, if true single Student page will be rendered
  // singleInfo - data for the single Student page 
  // ------
  constructor(props) {
    super(props);
    this.state = {
      studentCardInfo: [],
      isSingle: false,
      singleInfo: {}
    }
  }

  // this function sets isSingle to true in the state triggering a render of a single student page
  changeIsSingle = () => {
    this.setState({
      isSingle: !(this.state.isSingle)
    })
  }

  // this function populates the state with the data of the student whose name 
  // was clicked on to generate the single student page
  changeSingleInfo = (id, name, email, imageurl, gpa) => {
    this.setState({
      singleInfo: {
        id: id,
        name: name,
        email: email,
        imageurl: imageurl,
        gpa: gpa
      }
    })
  }

  // this function gets all student data from the database
  getStudentData = () => {
    axios.get('http://localhost:3003/students').then((response) => {
      this.setStudentData(response.data);
    })
  }

  // this function processes the student data and sends it state
  setStudentData = (data) => {

    let ids = []
    let names = []
    let emails = []
    let imageurls = []
    let gpas = []
    let studentInfo = []

    for(let i = 0; i < data.length; i++){
        ids.push(data[i].id)
        names.push(data[i].firstname + " " + data[i].lastname)
        emails.push(data[i].email)
        imageurls.push(data[i].imageurl)
        gpas.push(data[i].gpa)
    }

    for(let i = 0; i < names.length; i++) {
      studentInfo.push({
        id: ids[i],
        name: names[i],
        email: emails[i],
        imageurl: imageurls[i],
        gpa: gpas[i]
      })
    }

    this.setState({
      studentCardInfo: studentInfo
    })
  }

  // this function returns the JSX elements for the single Student page if isSingle
  // is true or for the StudentCards if isSingle is false,
  // PATH: STUDENTS -> StudentsPresent
  getStudents = () => {

    if(this.state.isSingle) {
      return (
        <Student
          id={this.state.singleInfo.id}
          name={this.state.singleInfo.name}
          email={this.state.singleInfo.email}
          imageurl={this.state.singleInfo.imageurl}
          gpa={this.state.singleInfo.gpa}
          singleCardInfo={this.state.singleInfo}
        />
      );
    }

    let key = 0;
    return this.state.studentCardInfo.map( (info) => {
      ++key;
      return (
        <StudentCard
          key={key}
          id={info.id}
          name={info.name}
          email={info.email}
          imageurl={info.imageurl}
          gpa={info.gpa}
          changeSingleInfo={this.changeSingleInfo}
          changeIsSingle={this.changeIsSingle}
        />
      );
    });
  }

  // this function grabs all Student data then renders the StudentAbsent component if 
  // there are no students in the database or renders the StudentPresent component is there 
  // are students in the database
  render(){
    this.getStudentData();

      if(this.state.studentCardInfo.length === 0){
        return (
          <StudentsAbsent/>
        )
      }
      else {
        return (
          <StudentsPresent getStudents={this.getStudents}/>
        )
      }

  }
}

export default Students;
