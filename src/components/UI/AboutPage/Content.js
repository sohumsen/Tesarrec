import React from "react";
import classes from "./Content.module.css";

const Content = (props) => {
  return (
    <div className={classes.content}>
      <h2>
        New gen engineered technologies and solutions for sustainability and
        circular economy
      </h2>
      
      <p>
        We develop computer software for use in:
        <ol>
          <li>
            Evaluation of organic compounds synthesized by carbon dioxide
            capture by organic degradation in wastewater;
          </li>
          <li>Evaluating the dynamic performance of these systems;</li>
          <li>
            Evaluating technical feasibility and life cycle sustainability of
            these systems;
          </li>
        </ol>
      </p>

      <h3>
      One such group of technologies are electrochemical technologies
      </h3>
      <p>
      Bio-based electrochemical technologies are becoming popular due to their non-toxic non-chemical way of transforming waste into electricity generation or fuel or chemical synthesis from carbon dioxide reuse, depending on the mode of operation. Their main modes of operation include microbial fuel cells (MFC) and microbial electrosynthesis systems (MES).
      </p>
    </div>
  );
};

export default Content;
