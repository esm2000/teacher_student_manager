import React, { Component, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../../css/Campuses.css'
import CampusCard from './CampusCard'
import EditCampusForm from './EditCampusForm'
import CampusesAbsent from './CampusesAbsent'
import CampusesPresent from './CampusesPresent'
import Campus from '../Campus/Campus'

class Campuses extends Component {
  // PROPS
  // ------
  // ------
  // NONE
  // ------
  
  // STATE
  // ------
  // ------
  // campusCardInfo contains info for campus cards 
  // if edit is true, render campus edit form
  // editInfo is the info that's passed into campus edit form
  // if isSingle is true, a single Campus page is generated
  // singleInfo is the info that's passed into single Campus page
  constructor(props){
    super(props)
    this.state = {
        campusCardInfo: [],
        edit: false,
        editInfo: {},
        isSingle: false,
        singleInfo: {}
    }
  }

  // this function populates the editInfo object in state with campus info 
  // from the campus card object that had its edit button clicked
  // CALLED FROM: CampusCard Component
  changeEditInfo = (id, name, address, imageUrl, description) => {
    this.setState({
      editInfo: {
        id: id,
        name: name,
        address: address,
        imageUrl: imageUrl,
        description: description
      }
    })
  }

  // this function populates the singleInfo object in state with campus info 
  // from the campus card object that had its name clicked
  // CALLED FROM: CampusCard Component
  changeSingleInfo = (id, name, address, imageUrl, description, numStudents, studentData) => {
    this.setState({
      singleInfo: {
        id: id,
        name: name,
        address: address,
        imageUrl: imageUrl,
        description: description,
        numStudents: numStudents,
        studentData: studentData
      }
    })
  }

  // this function switches edit to true to trigger the rendering of 
  // the edit campus form component
  changeEdit = () => {
    this.setState({
      edit: (!this.state.edit)
    })
  }

  // this function switches isSingle to true to tigger the rendering of the 
  // single campus page
  changeIsSingle = () => {
    this.setState({
      isSingle: (!this.state.isSingle)
    })
  }

  // placeholder function that needs to be removed... (remove its calls first)
  addCampus = () => {
    console.log('clicked');
  }

  // this function grabs the campuses data from the database and sends the 
  // collect data as input to setCampusData()
  getCampusData = () => {

    axios.get('http://localhost:3003/campuses').then((response) => {
      this.setCampusData(response.data);
    })
    
  }

  // this function converts the data into the appropiate format then updates
  // campusCardInfo in the state with it
  setCampusData = (data) => {

      let names = []
      let imageUrls = []
      let ids = []
      let addresses = []
      let descriptions = []
      let campusInfo = []

      for(let i = 0; i < data.length; i++){
          names.push(data[i].name)
          imageUrls.push(data[i].imageurl)
          ids.push(data[i].id)
          addresses.push(data[i].address)
          descriptions.push(data[i].description)
      }

      for(let i = 0; i < names.length; i++) {
        campusInfo.push({
          name: names[i],
          address: addresses[i],
          imageUrl: imageUrls[i],
          description: descriptions[i],
          id: ids[i]
        })
      }

      this.setState({
        campusCardInfo: campusInfo
      })
  }

  // if isSingle in state is true return a single campus site component to 
  // if not return a campus card component for each campus
  // this function is passed into and called by the CampusesPresent component
  getCampuses = () => {

    if(this.state.isSingle) {
      return (
        <Campus
          id={this.state.singleInfo.id}
          name={this.state.singleInfo.name}
          address={this.state.singleInfo.address}
          imageurl={this.state.singleInfo.imageUrl}
          description={this.state.singleInfo.description}
          numStudents={this.state.singleInfo.numStudents}
          studentData={this.state.singleInfo.studentData}
        />
      );

    }
    let key = 0;
    return this.state.campusCardInfo.map( (info) => {
      ++key;
      return (
          <CampusCard
              key={key}
              id={info.id}
              name={info.name}
              imageUrl={info.imageUrl}
              address={info.address}
              description={info.description}
              changeEditInfo={this.changeEditInfo}
              changeEdit={this.changeEdit}
              changeSingleInfo={this.changeSingleInfo}
              changeIsSingle={this.changeIsSingle}
          />
      );
    });
  }

  render(){
    // get the campus data first
    this.getCampusData();
    // if edit in state is false...
    if(!this.state.edit){
      // and there are no campuses in the database, render a CampusesAbsent component
      if(this.state.campusCardInfo.length === 0){
        return (
          <CampusesAbsent/>
        )
      }
      // and there are campuses in the database, render a CampusesPresent component 
      // with the function for the JSX for either single campus view or campus card passed in
      // depending on whether the user clicks on a campus title or not 
      else {
        return (
          <CampusesPresent getCampuses={this.getCampuses}/>
        );
      }
    }
    // if edit in state is true render a EditCampusForm
    else {
      return (
        <EditCampusForm
          id={this.state.editInfo.id}
          name={this.state.editInfo.name}
          address={this.state.editInfo.address}
          imageurl={this.state.editInfo.imageUrl}
          description={this.state.editInfo.description}
        />
      );
    }
  }
}

export default Campuses;
