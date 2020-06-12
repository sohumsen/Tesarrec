import React from "react";
import classes from "./Team.module.css";

const Team = (props) => {
  return (
      <div className={classes.row}>
        <div className={classes.column}>
          <div className={classes.card}>
            <img src="img1.jpg" alt="Jane" style={{ width: "100%" }} />
            <div className={classes.container}>
              <h2>Dr Jhuma Sadhukhan</h2>
              <p className={classes.title}>Lead academic &amp; Founder</p>
              <a href="https://www.surrey.ac.uk/people/jhuma-sadhukhan">https://www.surrey.ac.uk/people/jhuma-sadhukhan</a>
              <p>
                <button className={classes.button}>Contact</button>
              </p>
            </div>
          </div>
        </div>
      <div className={classes.column}>
        <div className={classes.card}>
          <img src="img1.jpg" alt="Jane" style={{ width: "100%" }} />
          <div className={classes.container}>
            <h2>Dr Siddharth Gadkari</h2>
            <p className={classes.title}>Other Academic</p>
            <a href="https://www.surrey.ac.uk/people/siddharth-gadkari">https://www.surrey.ac.uk/people/siddharth-gadkari</a>

            <p>
              <button className={classes.button}>Contact</button>
            </p>
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.card}>
          <img src="img1.jpg" alt="Jane" style={{ width: "100%" }} />
          <div className={classes.container}>
            <h2>Sohum Sen</h2>
            <p className={classes.title}>IT Analyst </p>
            <a href="https://github.com/sohumsen">https://github.com/sohumsen</a>

            <p>
              <button className={classes.button}>Contact</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
