import React, { Component, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../../css/Campuses.css'
import CampusCard from './CampusCard'
import EditCampusForm from './EditCampusForm'
import CampusesAbsent from './CampusesAbsent'
import CampusesPresent from './CampusesPresent'

class Campuses extends Component {
  constructor(props){
    super(props)
    this.state = {
        campusCardInfo: [],
        edit: false,
        editInfo: {}
    }
  }

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

  changeEdit = () => {
    this.setState({
      edit: (!this.state.edit)
    })
  }

  addCampus = () => {
    console.log('clicked');
  }

  getCampusData = () => {

    axios.get('http://localhost:3003/campuses').then((response) => {
      this.setCampusData(response.data);
    })


    // return fetch(`http://localhost:3000/campuses`).then((response) => {
    //         if(response.status === 200) {
    //             return response.json()
    //         } else {
    //             throw new Error('Couldn\'t connect to server')
    //         }
    //     }).then((data) => {
    //         return data
    //     })


  }

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

  getCampuses = () => {

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
          />
      );
    });
  }

  render(){
    this.getCampusData();
    if(!this.state.edit){
      if(this.state.campusCardInfo.length === 0){
        return (
          <CampusesAbsent/>
        )
      }
      else {
        return (
          <CampusesPresent getCampuses={this.getCampuses}/>
        );
      }
    }
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
