// TYPE IMPORTS
import { H2, IMG, BUTTON, DIV, P } from '../types';

// IMG IMPORTS
import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';
import bigSun from '../imgs/bigSun.png';
import lulLogo from '../imgs/luLogo.png';
import euLogo from '../imgs/euLogo.png';

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

  return {
    subElements: [topLogo, createAccBtn, textContent, downBtn, hill],
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


  return {
    subElements: [header, textContent],
    className: 'section2',
  };
}

export const section3 = () => {
  const header = {
    type: DIV,
    selfEnclosing: false,
    className: 'header',
  };

  const sun = {
    type: IMG,
    selfEnclosing: true,
    className: 'bigSun',    
    src: bigSun,
    alt: 'Big Sun',
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

  return {
    subElements: [header, textContent, sun],
    className: 'section3',
  };
}

export const section4 = () => {
  const header = {
    type: DIV,
    selfEnclosing: false,
    className: 'header',
  };

  const lul = {
    type: IMG,
    selfEnclosing: true,
    id: 'lulLogo',    
    src: lulLogo,
    alt: 'LUL logo',
  };

  const eu = {
    type: IMG,
    selfEnclosing: true,
    id: 'euLogo',    
    src: euLogo,
    alt: 'EU logo',
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

  return {
    subElements: [header, textContent, lul, eu],
    className: 'section4',
  };
}