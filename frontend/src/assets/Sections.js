// TYPE IMPORTS
import { H2, IMG, BUTTON, DIV, P } from '../types';

// IMG IMPORTS
import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';
import bigSun from '../imgs/bigSun.png';

const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

export const section1 = () => {
  const topLogo = {
    type: IMG,
    selfEnclosing: true,
    className: 'logo',    
    src: logo,
    alt: 'Sun Labs logo',
  };

  const createAccBtn = {
    type: BUTTON,
    selfEnclosing: false,
    content: 'CREATE ACCOUNT',
  };

  const textContent = {
    type: DIV,
    selfEnclosing: false,
    className: 'textContent',
    subElements: [
      {
        type: H2,
        selfEnclosing: false,
        content: 'What is Energiportalen?',
      },
      {
        type: P,
        selfEnclosing: false,
        content: placeholder,
      },
    ],
  };

  const downBtn = {
    type: IMG,
    selfEnclosing: true,
    className: 'downButton',  
    src: downButton,
    alt: 'Down Button',
  };

  const hill = {
    type: DIV,
    selfEnclosing: false,
    className: 'hill',
  };

  const background = {
    type: DIV,
    selfEnclosing: false,
    className: 'background',
  };

  return {
    subElements: [topLogo, createAccBtn, textContent, downBtn, hill, background],
    className: 'section1',
  };
}

export const section2 = () => {
  const header = {
    type: DIV,
    selfEnclosing: false,
    className: 'header',
  };

  const textContent = {
    type: DIV,
    selfEnclosing: false,
    className: 'textContent',
    subElements: [
      {
        type: H2,
        selfEnclosing: false,
        content: 'What is Energiportalen?',
      },
      {
        type: P,
        selfEnclosing: false,
        content: placeholder,
      },
    ],
  };

  const background = {
    type: DIV,
    selfEnclosing: false,
    className: 'background',
  };

  const sun = {
    type: IMG,
    selfEnclosing: true,
    className: 'bigSun',    
    src: bigSun,
    alt: 'Big Sun',
  };

  return {
    subElements: [header, textContent, background, sun],
    className: 'section2',
  };
}

export const section3 = () => {
  const header = {
    type: DIV,
    selfEnclosing: false,
    className: 'header',
  };

  const textContent = {
    type: DIV,
    selfEnclosing: false,
    className: 'textContent',
    subElements: [
      {
        type: H2,
        selfEnclosing: false,
        content: 'What is Energiportalen?',
      },
      {
        type: P,
        selfEnclosing: false,
        content: placeholder,
      },
    ],
  };

  const background = {
    type: DIV,
    selfEnclosing: false,
    className: 'background',
  };

  return {
    subElements: [header, textContent, background],
    className: 'section3',
  };
}