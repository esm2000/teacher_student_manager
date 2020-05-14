import React from 'react';
import '../../css/Student.css';

// this function returns the JSX to display student image
function StudentImage(props){
    const image = props.imageurl;
    // const image = "http://clipart-library.com/new_gallery/142-1427672_college-students-images-hd-png-download-student-image.png"//placeholder
    return (
      <img src={image}/>
    );
}

export default StudentImage;
