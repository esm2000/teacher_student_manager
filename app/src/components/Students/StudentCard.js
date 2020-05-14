import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../css/Students.css';
import CampusName from '../Campus/CampusName';

  // PROPS
  // ------
  // ------
  // key - each card has an index if needed
  // id - student id 
  // name - student name
  // email - student email
  // imageurl - student imageurl
  // gpa - student gpa
  // studentData - the student data for each student in a campus, to be used to generate student cards
  // changeIsSingle() - tells Campus to render Student component
  // changeSingleInfo() - passes information for Student component back to Campus component
  // ------
  
  // STATE
  // ------
  // ------
  // NONE
  // ------
class StudentCard extends Component {
  constructor(props) {
    super(props);
  }

  // this function tells the Campus component to switch to rendering Student component
  // and passes the information for the Student component 
  // PATH: Campus -> StudentPresent -> STUDENTCARD
  handleClick = () => {
    console.log(this.props.id)
    this.props.changeSingleInfo(this.props.id, this.props.name, this.props.email, this.props.imageurl, this.props.gpa)
    this.props.changeIsSingle();
  }

  // CampusName is a placeholder for the actual campus name (that would somehow render another Campus object in Campuses)
  render = () => {
    return (
      <div className="studentcard">
        <img src={this.props.imageurl}></img>
        <a onClick={this.handleClick}><h4>{this.props.name}</h4></a>
        <a><h4>{CampusName}</h4></a>
      </div>
    );
  }
}

export default StudentCard;
