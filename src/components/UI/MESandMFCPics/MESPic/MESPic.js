import React from 'react'

import MES from '../../../../assets/MES.png'

import classes from './MESPic.module.css'

export default class ImageComponent extends React.Component {

  render() {
    return (
      <div>
        <img
          className={classes.MESPic}
          src={MES}
          alt="mes"
        />
       
      </div>
    );
  }
}
