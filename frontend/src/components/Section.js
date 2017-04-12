import React from 'react';

import logo from '../imgs/logo.png'
import downButton from '../imgs/downButton.png'

const renderItem = (item) => {

  let k = '';
  let c = [];

  for (let key in item){
    if(item.hasOwnProperty(key)){
      k = key + item[key];
      c = c.concat(key);

      console.log(item[key]);
      console.log(c);
      
    } 
  }


  console.log(item);
  const type = item.type;

  const CustomTag = `${type}`;

  const props = { src:`${logo}`};

  return (<CustomTag key={k} {...props} />);

}

const Section = ({props}) => {
  return (        
  <div>
  {props.map((item) => {
    return(renderItem(item));
  })}
  </div>
  );
}

export default Section;