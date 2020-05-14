import React from 'react';
import '../../css/Campus.css';

// this component displays the image of a campus based on image url which is passed in as a prop
function CampusImage(props){
  //const image = this.props.image;
  const image = props.imageUrl;
  return (
    <img src={image}/>
  );
}

export default CampusImage;
