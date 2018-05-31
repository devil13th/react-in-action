import React from 'react';
import stl from './style.css';
export default () => {
    console.log(stl);
    return(
        <h1 className={stl.continueButton}> Home </h1>
    )
}