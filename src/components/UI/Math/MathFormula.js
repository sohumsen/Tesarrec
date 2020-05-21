import React from 'react';
import { Node, Context } from 'react-mathjax';

const Formula=(props)=> {
  return (

    <div>

      <Node>{props.tex}</Node>
    </div>

  )
}

export default Formula