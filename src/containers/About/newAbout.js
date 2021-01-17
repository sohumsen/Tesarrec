import React from "react";
import { Component } from "react";
import Team from "../../components/UI/AboutPage/Team";

export default class About extends Component {
  render() {
    return (
      <div>
        <title>W3.CSS Template</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Lato"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\nbody,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}\n.w3-bar,h1,button {font-family: "Montserrat", sans-serif}\n.fa-anchor,.fa-coffee {font-size:200px}\n',
          }}
        />
        {/* Navbar */}
        <div className="w3-top">
          <div className="w3-bar w3-blue w3-card w3-left-align w3-large">
            <a
              className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-blue"
              href="javascript:void(0);"
              onclick="myFunction()"
              title="Toggle Navigation Menu"
            >
              <i className="fa fa-bars" />
            </a>
            <a
              href="#"
              className="w3-bar-item w3-button w3-padding-large w3-white"
            >
              Home
            </a>
            <a
              href="#"
              className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
            >
              Link 1
            </a>
            <a
              href="#"
              className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
            >
              Link 2
            </a>
            <a
              href="#"
              className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
            >
              Link 3
            </a>
            <a
              href="#"
              className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
            >
              Link 4
            </a>
          </div>
          {/* Navbar on small screens */}
          <div
            id="navDemo"
            className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large"
          >
            <a href="#" className="w3-bar-item w3-button w3-padding-large">
              Link 1
            </a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">
              Link 2
            </a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">
              Link 3
            </a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">
              Link 4
            </a>
          </div>
        </div>
        {/* Header */}
        <header
          className="w3-container w3-blue w3-center"
          style={{ padding: "128px 16px" }}
        >
          <h1 className="w3-margin w3-jumbo">Tesarrec™</h1>
          <p className="w3-xlarge">Learn, Compare, Fit</p>
          <a
            className="w3-button w3-black w3-padding-large w3-large w3-margin-top"
            href="https://tesarrec.web.app/sustainability/mes"
          >
            Go to MES
          </a>
       
        </header>
        {/* First Grid */}
        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-twothird">
              <h1>TESARREC?</h1>
              <h3 className="w3-padding-42 ">
                <p>
                  <b>T</b>ool for techno-
                  <br />
                  <b>E</b>conomic and <br />
                  <b>S</b>ustainability <br />
                  <b>A</b>nalysis of <br />
                  <b>R</b>esource <br />
                  <b>R</b>ecovery <br />
                  <b>E</b>ngineering solutions for <br />
                  <b>C</b>ircular renewable and bio economy
                  <br />
                </p>
              </h3>
            </div>
            <div className="w3-third w3-center">
              <i
                style={{ fontSize: "200px" }}
                className="	fa fa-recycle w3-padding-64 w3-text-blue"
              />
            </div>
          </div>
        </div>
        {/* Second Grid */}
        <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-third w3-center">
              <i
                style={{ fontSize: "200px" }}
                className="fa fa-cloud  w3-padding-64 w3-text-blue w3-margin-right"
              />
            </div>
            <div className="w3-twothird">
              <h1>
                {" "}
                New gen engineered technologies and solutions for sustainability
                and circular economy
              </h1>
              <h5 className="w3-padding-32">
                We develop computer software for use in:
              </h5>
              <p className="w3-text-grey">
                <ol>
                  <li>
                    Evaluation of organic compounds synthesized by carbon
                    dioxide capture by organic degradation in wastewater;
                  </li>
                  <li>Evaluating the dynamic performance of these systems;</li>
                  <li>
                    Evaluating technical feasibility and life cycle
                    sustainability of these systems;
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
        <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-twothird">
              <h1>
                One such group of technologies are electrochemical technologies
              </h1>
              <h5 className="w3-padding-32">
                Bio-based electrochemical technologies are becoming popular due
                to their non-toxic non-chemical way of transforming waste into
                electricity generation or fuel or chemical synthesis from carbon
                dioxide reuse, depending on the mode of operation.
              </h5>
              <p className="w3-text-grey">
                Their main modes of operation include microbial fuel cells (MFC)
                and microbial electrosynthesis systems (MES).
              </p>
            </div>
            <div className="w3-third w3-center">
              <i className="fa fa-coffee w3-padding-64 w3-text-blue w3-margin-right" />
            </div>
          </div>
        </div>
        <Team />

        <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
          <h1 className="w3-margin w3-xlarge">Quote of the day: live life</h1>
        </div>

     
      </div>
    );
  }
}
