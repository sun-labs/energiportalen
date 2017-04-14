import React from 'react';
import '../styles/Section.css';
import '../styles/Section1.css';
import '../styles/Section2.css';
import '../styles/Section3.css';
import '../styles/Section4.css'

import { TYPE, SELFENCLOSING, SUBELEMENTS, CONTENT } from '../types';

const nonAttributes = [TYPE, SELFENCLOSING, SUBELEMENTS, CONTENT];

const renderItem = (item) => {

  // TODO potential problem: two exactly same elements
  let k = '';
  let props = {};

  for (let key in item){
    if (item.hasOwnProperty(key)) {
      k += item[key];

      // checking if the key should be evaluated as an HTML attribute
      if (!nonAttributes.includes(key)) {
        props[key] = item[key];
      }
    } 
  }

  const type = item.type;
  const CustomTag = `${type}`;

  // checking if the item self encloses aka <Item /> or not, aka <Item></Item>
   if (!item[SELFENCLOSING]) {

    if (item[SUBELEMENTS]) {
      return (
        <CustomTag key={k} {...props}>
          {item[SUBELEMENTS].map((l) => {
            return renderItem(l);
          })}
        </CustomTag>
      );
    }
    // checking if the item should render content (aka text) within closing tags
    // aka <Item>text</Item> or not, if not, return selfenclosing tag
    else if (item[CONTENT]) {
      return (
        <CustomTag key={k} {...props}>
          {item[CONTENT]}
        </CustomTag>
      );
    }
  }

  return <CustomTag key={k} {...props} />;
}

const Section = ({ subElements, className }) => {
  return (        
    <div className={`section ${className ? className : ''}`}>

      {subElements ? subElements.map((item) => {
        return(renderItem(item));
      }) : ''}

    </div>
  );
}

export default Section;