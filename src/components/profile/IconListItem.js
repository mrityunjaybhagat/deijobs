

import React, { useState, useEffect } from 'react';
const IconListItem = ({linkTo,iconCode,iconText}) => {
  return (
    <>
    <a className='iconlisitem' href={linkTo}>
       <div className="d-flex items-center gap-4">
          <span className='icon'>{iconCode}</span>
          <span className='icontxt'>{iconText}</span>                         
        </div>
    </a>
    </>
  );
};

export default IconListItem;