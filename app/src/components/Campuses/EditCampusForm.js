import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import StudentsAbsent from './StudentsAbsent'
import StudentsPresent from './StudentsPresent'
import StudentCard from '../Students/StudentCard';
import '../../css/Campuses.css'

class EditCampusForm extends Component {
  // PROPS
  // ------
  // ------
  // id - campus id
  // name - campus name 
  // address - campus address
  // imageurl - campus imageurl
  // description - campus description
  // ------
  // STATE
  // ------
  // ------
  // campusInfo - holds the new data that is sent to the database to update campus info
  constructor(props){
    super(props);
    this.state = {
      campusInfo: []
    };
    // [DON'T TOUCH] - enables continuous updates to state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.change = this.change.bind(this);
  }

  // this function takes user input and converts it into the proper format that 
  // the database will accept
  change = e => {
    const obj = { [e.target.name]: e.target.value };
    const campusInfo = Object.assign({}, this.state.campusInfo, obj);
    this.setState({
      campusInfo
    });
  };

  // this function updates the campus in the database with info in the state
  updateCampusInfo = (data, alertMessage) => {
    axios({
      method: 'put',
      url: `http://localhost:3003/campuses/update/${this.props.id}`,
      data: data
    }).then(res => {
        if(res.status === 200 ) {
          // after put request send an alert message to the screen
          alert(alertMessage)
          console.log(res);
          console.log(res.data);
        } else {
          throw new Error();
        }

      }).catch((err) => {
        alert("Error " + err.response.data.errors)
        console.log('CATCH! =' + err.response.data.errors)
      });
  }

  // this function handles the submit button press
  handleSubmit = (e) => {
    // prevents page from reloading
    e.preventDefault();

    let updateCampus = null

    // if name field or address field is empty make update info the same as old info 
    if (!this.state.campusInfo.name || !this.state.campusInfo.address) {
      updateCampus = {
        name: this.props.name,
        imageurl: this.props.imageurl,
        description: this.state.campusInfo.description
      }

      this.updateCampusInfo(updateCampus, 'ERROR: You can\'t leave "name" or "address" blank!');
    // if image field is missing and name and address fields are present, change
    // imageurl to a preestablished default
    } else if(!this.state.campusInfo.imageurl){
      updateCampus = {
        name: this.state.campusInfo.name,
        imageurl: 'https://www.usnews.com/dims4/USNEWS/0b40ca9/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2Fed%2F49512dcc50e5394df36dccecb41082%2FUSNews18_MainHall.jpg',
        address: this.state.campusInfo.address,
        description: this.state.campusInfo.description
      }

      this.updateCampusInfo(updateCampus, "This campus has been successfully updated!");

    // if name, image, and address fields are present just update state with what's there
    } else {
      updateCampus = {
        name: this.state.campusInfo.name,
        imageurl: this.state.campusInfo.imageurl,
        address: this.state.campusInfo.address,
        description: this.state.campusInfo.description
      }

      this.updateCampusInfo(updateCampus, "This campus has been successfully updated!");
    }
    // axios.put(`http://localhost:3003/campuses/update/${this.props.id}`, this.state.campusInfo)
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
  }

  render(){
    // if students are enrolled in the campus show student cards
    // and allow user to add students not in campus to campus [UPDATE CONDITION]
    if(false){ {/*QUERY: this.state.RELQUERYRES.length !== 0 */}
      return (
        <div className="editcampusform-container">
          <form onSubmit={this.handleSubmit}>
            <h1>Edit Campus Form</h1>
            <label>Campus Name <input name="name" type='text' placeholder={this.props.name} onChange={e => this.change(e)}/></label>
            <label>Campus Location <input name="address" type='text' placeholder={this.props.address} onChange={e => this.change(e)}/></label>
            <label>Campus Image URL <input name="imageurl" type='text' placeholder={this.props.imageurl} onChange={e => this.change(e)}/></label>
            <label>Campus Description <input name="description" type='text' placeholder={this.props.description} onChange={e => this.change(e)}/></label>
            <input className="hide" name="id" value={this.props.id} readOnly></input>
            <input type='submit' value="Save Changes"/> {/*ADD REDIRECT TO /CAMPUSES*/}
          </form>
          <h1>Students on Campus</h1>
          <div className="box box3">
            <div className="item item3">
              <select >
                <option>Student 1</option>
                <option>Student 2</option>
              </select>
              <NavLink to="/"><button>Add to Campus</button></NavLink>{/*remove navlink*/}
            </div>
          </div>
          <div className="studentcard-container">
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
          </div>
        </div>
      );
    }
    // if students are not enrolled in campus, display all student cards and allow user
    // add students to campus 
    else {
      return (
        <div className="editcampusform-container">
          <form onSubmit={this.handleSubmit}>
            <h1>Edit Campus Form</h1>
            <label>Campus Name <input name="name" type='text' placeholder={this.props.name} onChange={e => this.change(e)}/></label>
            <label>Campus Location <input name="address" type='text' placeholder={this.props.address} onChange={e => this.change(e)}/></label>
            <label>Campus Image URL <input name="imageurl" type='text' placeholder={this.props.imageurl} onChange={e => this.change(e)}/></label>
            <label>Campus Description <input name="description" type='text' placeholder={this.props.description} onChange={e => this.change(e)}/></label>
            <input className="hide" name="id" value={this.props.id} readOnly></input>
            <input type='submit' value="Save Changes"/> {/*ADD REDIRECT TO /CAMPUSES*/}
          </form>
          <h1>Students on Campus</h1>
          <div className="box box3">
            <div className="item item3">
              <select >
                <option>Student 1</option>
                <option>Student 2</option>
              </select>
              <NavLink to="/"><button>Add to Campus</button></NavLink>{/*remove navlink*/}
            </div>
          </div>
          <p>There are no students currently registered to this campus</p>
        </div>
      )
    }
  }
}

export default EditCampusForm;
