import React from "react";
import { Component } from "react";
import Team from "../../components/UI/AboutPage/Team";
import Sidebar from "../Sustainability/utils/Sidebar";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import TwitterIcon from "@material-ui/icons/Twitter";
export default class About extends Component {
  render() {
    return (
      <div>
        <title>About</title>
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

        {/* Header */}
        <header
          className="w3-container w3-blue w3-center"
          style={{ padding: "128px 16px" }}
        >
          <h1 className="w3-margin w3-jumbo">Tesarrec™</h1>
          <p className="w3-xlarge">Learn, Compare, Fit</p>
          <a
            className="w3-button w3-black w3-padding-large w3-large w3-margin-top"
            href="https://tesarrec.web.app/sustainability"
          >
            Go to Sustainability
          </a>
        </header>
        {/* First Grid */}
        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-twothird">
              <h1>TESARREC</h1>
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
              <h1> We solve interdisciplinary sustainability problems</h1>
              <h5 className="w3-padding-32">
                We develop computer software for use in:
              </h5>
              <p className="w3-text-grey">
                <ol>
                  <li>
                    Default life cycle impacts and savings by products and
                    services for sustainability
                  </li>

                  <li>
                    {" "}
                    Default life cycle impacts and savings by products and
                    services for net zero carbon future
                  </li>
                  <li>
                    Bio-product synthesis from wastes, residues, non-food
                    cellulosic and lignocellulosic feedstocks
                  </li>
                  <li>Resource recovery from waste </li>
                  <li>Carbon dioxide capture and reuse </li>
                  <li>Renewable technologies </li>
                  <li>Circular economy systems </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
        <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
          {/* <div className="w3-content">
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
          </div> */}
        </div>
        <Team />

        <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
          <Sidebar
          social={[
            {
              name: "",
              icon: GitHubIcon,
              link: "https://github.com/sohumsen/React-tesarrec",
            },
            { name: "", icon: TwitterIcon, link: "" },
            { name: "", icon: FacebookIcon, link: "" },
            {
              name: "Please fill out this form to help us measure our demographic",
              icon: CallToActionIcon,
              link:
                "https://docs.google.com/forms/d/e/1FAIpQLSdWsZgVV5gz6i0jGcaxlhbyV_jaq7gWWvdTahl8kyMwgwYABA/viewform",
            },
          ]}
        />

        </div>
      </div>
    );
  }
}
