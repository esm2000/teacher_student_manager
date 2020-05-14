import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import CampusImage from './CampusImage';
import CampusAddress from './CampusAddress';
import CampusName from './CampusName';
import CampusDesc from './CampusDesc';
import StudentCard from '../Students/StudentCard';
import '../../css/Campuses.css';

// this component renders the student cards for students in a campus for that 
// specific single campus page

class StudentPresent extends Component{
  
  // PROPS
  // ------
  // ------
  // name - campus name
  // address - campus address
  // imageUrl - campus imageurl
  // description - campus description
  // studentData - the student data for each student in a campus, to be used to generate student cards
  // handleEditClick() - allows for the render of EditCampusForm
  // handleDeleteClick() - allows for the deletion of the campus
  // changeIsSingle() - being passed to StudentCard component
  //                  - tells Campus to render Student component
  // changeSingleInfo() - being passed to StudentCard component
  //                    - passes information for Student component back to Campus component
  // ------
  
  // STATE
  // ------
  // ------
  // 
  constructor(props){
    super(props)
  }

  // this function is being passed into StudentCard as a prop
  // PATH: Campus -> STUDENTPRESENT -> StudentCard
  changeIsSingle = () => {
    this.props.changeIsSingle();
  }

  //  this function is being passed into StudentCard as a prop
  // PATH: Campus -> STUDENTPRESENT -> StudentCard
  changeSingleInfo = (id, name, email, imageurl, gpa) => {
    this.props.changeSingleInfo(id, name, email, imageurl, gpa);
  }

  // this function takes the studentData in props and uses it to return StudentCard components 
  getStudentCardInfo = () => {
    
    let key = 0;
    let singleStudentData = {};

    return this.props.studentData.map( (info) => {
      singleStudentData = this.props.studentData[key]
      ++key;
      return (
        <StudentCard
          key={key}
          id={singleStudentData.id}
          name={singleStudentData.firstname + " " + singleStudentData.lastname}
          email={singleStudentData.email}
          imageurl={singleStudentData.imageurl}
          gpa={singleStudentData.gpa}
          changeSingleInfo={this.changeSingleInfo}
          changeIsSingle={this.changeIsSingle}
        />          
      );
    });
  }

  // renders the StudentCard components at bottom of page by calling getStudentCardInfo
  render = () => {
    return (
      <div className="container">
        <div className="box box1">
          <div className="item item1">
            <CampusImage
              imageUrl={this.props.imageUrl}
            />
            <CampusAddress
              address={this.props.address}
            />
          </div>
          <div className="item item2">
            <CampusName name={this.props.name}/>
            <CampusDesc description={this.props.description}/>

            <div className="buttons">
              <button onClick={this.props.handleEditClick}>Edit</button>
              <button onClick={this.props.handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
        <div className="box box2">
          <h3>Students on campus</h3>
          <NavLink to="/Students/NewStudentForm"><button>Add Student</button></NavLink>
        </div>
        <div className="studentcard-container">
          {this.getStudentCardInfo()}
        </div>
      </div>
  );
  }
  
}

export default StudentPresent;
