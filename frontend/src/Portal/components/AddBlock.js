import React from 'react';

import '../styles/AddBlock.css';

const AddBlock = () => {
  return (
    <div className="add-block block" onClick={() => alert('ADD BLOCK')}>+ ADD BLOCK</div>
  );
}

export default AddBlock;