import React from "react";
import classes from "./Team.module.css";
import Jhuma from "../../../assets/aboutpage/Jhuma.jpg";
import Sohum from "../../../assets/aboutpage/Sohum2.JPG";
import Siddharth from "../../../assets/aboutpage/Siddharth.jpg";

const Team = (props) => {
  return (
    <div className={classes.row}>
      <h1>Meet our Team</h1>
      <div className={classes.column}>
        <div className={classes.card}>
          <img src={Jhuma} alt="Dr Jhuma Sadhukhan" style={{ width: "67%" }} />
          <div className={classes.container}>
            <h2>Dr Jhuma Sadhukhan</h2>
            <p className={classes.title}>Lead academic &amp; Founder</p>
            <a
              href="https://www.surrey.ac.uk/people/jhuma-sadhukhan"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.surrey.ac.uk/people/jhuma-sadhukhan
            </a>
            <p>
              {/* <button className={classes.button}>Contact</button> */}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.card}>
          <img
            src={Siddharth}
            alt="Dr Siddharth Gadkari"
            style={{ width: "66%" }}
          />
          <div className={classes.container}>
            <h2>Dr Siddharth Gadkari</h2>
            <p className={classes.title}>NERC-UKRI Industrial Innovation Fellow</p>
            <a
              href="https://www.surrey.ac.uk/people/siddharth-gadkari"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.surrey.ac.uk/people/siddharth-gadkari
            </a>

            <p>
              {/* <button className={classes.button}>Contact</button> */}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.card}>
          <img src={Sohum} alt="Sohum Sen" style={{ width: "100%" }} />
          <div className={classes.container}>
            <h2>Sohum Sen</h2>
            <p className={classes.title}>IT Analyst </p>
            <a href="https://github.com/sohumsen" target="_blank" rel="noopener noreferrer">
              https://github.com/sohumsen
            </a>

            <p>
              {/* <button className={classes.button}>Contact</button> */}
            </p>
          </div>
        </div>
      </div>

    </div>
         
  );
};

export default Team;
