import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../css/Campuses.css'
import Student from '../Student/Student';

class CampusCard extends Component {
  // PROPS
  // ------
  // ------
  // key - each CampusCard has a key just in case
  // id - campus id
  // name - campus name
  // imageUrl - campus image url
  // address - campus address
  // description - campus description
  // changeEditInfo() - passed in from Campuses component... 
  //                  - changes the edit info to the info of the campus card 
  // changeEdit() - passed in from Campuses component...
  //              - allows Campuses to render EditCampusForm component
  // changeSingleInfo() - passed in from Campuses component... 
  //                    - changes the single campus view info to the info of the campus card 
  // changeIsSingle() - passed in from Campuses component...
  //                  - allows Campuses to render Campus component
  // ------
  
  // STATE
  // ------
  // ------
  // numStudents - the number of students in the campus (0 by default)
  // studentData - the data of the students that are in the campus 
  constructor(props){
    super(props)
    this.state = {
      numStudents: 0
    }
  }

  // this function deletes the campus from the database
  deleteCampus = () => {
    axios.delete(`http://localhost:3003/campuses/delete/${this.props.id}`)
      .then(res => {
        console.log(res.data);
      })
  }

  // when edit button is clicked enable Campus component to render EditCampusForm component
  handleClick = () => {
    console.log(this.props.id)
    this.props.changeEditInfo(this.props.id, this.props.name, this.props.address, this.props.imageUrl, this.props.description)
    this.props.changeEdit()
  }

  // when title is clicked enable Campus component to render Campus component
  handleCampusClick = () => {
    console.log(this.props.id)
    this.props.changeSingleInfo(this.props.id, this.props.name, this.props.address, this.props.imageUrl, this.props.description, this.state.numStudents, this.state.studentData)
    this.props.changeIsSingle();
  }

  // update state with the number of students in the campus and the students' data
  setNumStudents = (data) => {
    this.setState({
      numStudents: data.length,
      studentData: data
    });
  }

  // make a request to the database to return all students in the campus 
  getNumStudents = () => {

    axios.get(`http://localhost:3003/students/in/campus/${this.props.id}`).then((response) => {
      this.setNumStudents(response.data);
    })
    
  }
  
  render = () => {
    this.getNumStudents();
    return (
      <div className="campuscard">
        <img src={this.props.imageUrl}></img>
        <a onClick={this.handleCampusClick}><h4>{this.props.name}</h4></a>
        <p>{this.state.numStudents + " Students"}</p>
        <div className="buttons">
          <button onClick={this.handleClick}>Edit</button>
          <button onClick={this.deleteCampus}>Delete</button>
        </div>
      </div>
    );
  }
}


export default CampusCard;
