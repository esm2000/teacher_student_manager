import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/Campuses.css';

// this component renders either the single campus view or campus cards depending on whether
// the user clicked on any of the campus cards titles
function CampusesPresent(props){
  // PROPS
  // ------
  // ------
  // getCampuses() - function that contains JSX to render for single campus view or campus cards
  // ------
  return (
    <div className="campuses-container">
      <div className="campuses-header">
        <h3>Campuses</h3>
        <NavLink to="/Campuses/NewCampusForm"><button>Add Campus</button></NavLink>
      </div>
      <div className="campuscard-container">
        {props.getCampuses()}
      </div>
    </div>
  );
}

export default CampusesPresent;
