// TYPE IMPORTS
import { H2, IMG, BUTTON, DIV, P, H1, INPUT} from '../types';

// IMG IMPORTS
import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';
import bigSun from '../imgs/bigSun.png';

const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

export const section1 = () => {

  const clouds = {
    type: DIV,
    selfEnclosing: false,
    className: 'clouds'
  };

  const createWrap = {
    type: DIV,
    selfEnclosing: false,
    className: 'creat-wrap',
    subElements: [
      {
        type: H1,
        selfEnclosing: false,
        content: 'SIGN UP',
      },
      {
        type: H2,
        selfEnclosing: false,
        content: 'It\'s free and will always be',
      },
      {
        // TODO - add two type so we get <input type="email" .... \> etc 
        type: INPUT,
        selfEnclosing: true,
        name: 'email',
        placeholder: 'e-mail',
      },
      {
        // TODO - add two type so we get <input type="password" .... \> etc 
        type: INPUT,
        selfEnclosing: true,
        name: 'password',
        placeholder: 'password',
      },
      {
      type: BUTTON,
      selfEnclosing: false,
      content: 'CREATE ACCOUNT',
  },
    ],
  };


  const topLogo = {
    type: IMG,
    selfEnclosing: true,
    className: 'logo',    
    src: logo,
    alt: 'Sun Labs logo',
  };

  const textContent = {
    type: DIV,
    selfEnclosing: false,
    className: 'text-content',
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
    subElements: [clouds, topLogo, createWrap, textContent, downBtn, hill],
    className: 'section1',
  };
}

export const section2 = () => {

  const clouds = {
    type: DIV,
    selfEnclosing: false,
    className: 'clouds',
  };

  const header = {
    type: DIV,
    selfEnclosing: false,
    className: 'header',
  };

  const textContent = {
    type: DIV,
    selfEnclosing: false,
    className: 'text-content',
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
    subElements: [header, clouds, textContent],
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
    className: 'text-content',
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
    type: DIV,
    selfEnclosing: false,
    id: 'lulLogo'
  };

  const eu = {
    type: DIV,
    selfEnclosing: false,
    id: 'euLogo'
  };

  const sunlabs = {
    type: DIV,
    selfEnclosing: false,
    id: 'sunlabsLogo'
  };

  const textContent = {
    type: DIV,
    selfEnclosing: false,
    className: 'text-content',
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
    subElements: [header, textContent, lul, eu, sunlabs],
    className: 'section4',
  };
}