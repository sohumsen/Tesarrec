import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Responsive,
  Segment,
  Visibility,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import buildingpic from "../../assets/aboutpage/buildingpic.jpg";
import indiapic from "../../assets/aboutpage/indiapic.jpg";
import mes from "../../assets/aboutpage/mes.jpg";
import mfc from "../../assets/aboutpage/mfc.jpg";
import waste from "../../assets/aboutpage/waste.jpg";
import {NavLink} from 'react-router-dom'

import cube from "../../assets/aboutpage/cube.gif";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <div>

    <Header
      as="h1"
      content="Tesarrec"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,


        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content=" New gen technologies for sustainability and circular economy"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />

    <NavLink to={"/process/mes"} exact >
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
        </NavLink>


  </div>
); 

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We are a team helping to develop new gen technologies for
              sustainability and circular economy.
            </Header>

            <Header as="h3" style={{ fontSize: "2em" }}>
              We model technologies for sustainability evaluation and dynamic
              simulation analysis.{" "}
            </Header>
          </Grid.Column>
          <Image bordered rounded size="large" src={buildingpic} />
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Image bordered rounded src={indiapic} />

          <Image bordered rounded size="medium" src={mes} />
          <Image bordered rounded size="medium" src={mfc} />
          <Image bordered rounded size="medium" src={cube}></Image>

        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          One such group of technologies are electrochemical technologies{" "}
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Bio-based electrochemical technologies are becoming popular due to
          their non-toxic non-chemical way of transforming waste into
          electricity generation or fuel or chemical synthesis from carbon
          dioxide reuse, depending on the mode of operation. Their main modes of
          operation include microbial fuel cells (MFC) and microbial
          electrosynthesis systems (MES).
        </p>
        {/* <Button as="a" size="large">
          Read More
        </Button>
    */}
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        ></Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Aided by pure cultures or bacteria communities,{" "}
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Or isolated enzymes to catalyse redox reactions of biodegradable
          substrates to generate electricity or products, the primary driver for
          the upsurge in their interests is their suitability for the production
          of sustainable energy product, along with other synergistic benefits,
          including wastewater treatment and resource recovery for circularity.
        </p>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container></Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
