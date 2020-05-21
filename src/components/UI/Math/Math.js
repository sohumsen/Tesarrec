import React from 'react';
import { Fraction, toTex } from 'algebra.js';
import Formula from './MathFormula'
const FractionDisplay=(props)=> {
  const a = new Fraction(1, 5);
  const b = new Fraction(2, 7);
  const answer = a.multiply(b);

  const question = <Formula tex={`${toTex(a)} × ${toTex(b)} = ${toTex(answer)}`} />;

  return (
    <div>
      {question}
    </div>
  );
}

export default FractionDisplay
