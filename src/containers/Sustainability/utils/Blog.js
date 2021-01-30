import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { Component } from "react";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const styles = (theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
});

const sections = [
  { title: "Fuel Cell", url: "#" },
  { title: "Electrical", url: "#" },
  { title: "Epidemiology", url: "#" },
  { title: "Biorefinery", url: "#" },
  { title: "LCA", url: "#" },
  { title: "Bioengineering", url: "#" },

];

const featuredPosts = [
  {
    title: "Microbial Fuel Cell",

    slug: "mfc",
    description:
      "Electricity harvesting from wastewaters.",
    image:
      "https://h7f7z2r7.stackpathcdn.com/sites/default/files/images/articles/hydrogen-hwy-lead-hyundai-fuel-cell-truck-1.jpg",
  },
  {
    title: "Microbial Electrosynthesis",
    slug: "mes",

    description:
      "Recovery of organic acids as high value products from CO2 capture and reuse.",
    image:
      "https://learnaboutgmp.com/wp-content/uploads/2015/06/cont.png",
  },
  {
    title: "Combined Heat and Power",
    slug: "chp",

    description:
      "CHP generation from biomass (bioenergy).",
    image:
      "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Bioethanol",
    slug: "bioethanol",

    description:
      "Bioethanol, a drop-in biofuel to petrol, production from non-food cellulosic and lignocellulosic feedstock.",
    image: "https://www.hrs-heatexchangers.com/wp-content/uploads/2016/06/HRS-Bioethanol-1140x600.png",
  },
  {
    title: "Chemical",
    slug: "chemical",

    description: "Four top chemical productions from biomass.",
    image:
      "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Pyrolysis",
    slug: "pyrolysis",

    description:
      "Thermal decomposition of biomass in anaerobic condition into oil, gas and char.",
    image: "https://kingtigergroup.com/wp-content/uploads/2018/09/Biomass-Pyrolysis-Plant.jpg",
  },

  {
    title: "Bio Jet Fuel",
    slug: "bio-jet-fuel",

    description: "Bio jet fuel production by hydroprocessing",
    image:
      "https://cdn.pixabay.com/photo/2019/07/18/20/14/aeroplane-4347341__340.jpg",
  },
];




class Blog extends Component {
  state = {
    featuredPosts: featuredPosts,
  };

  changeFeaturedPosts = (searchQuery) => {
    let newFeaturedPosts = featuredPosts.filter(
      (post) => post.title.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1
    );

    this.setState({
      featuredPosts: newFeaturedPosts,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            title="Sustainability"
            sections={sections}
            changeFeaturedPosts={this.changeFeaturedPosts}
          />
          <main>
            {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
            <Grid container spacing={4}>
              {this.state.featuredPosts
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
            </Grid>
            <Grid container spacing={5} className={classes.mainGrid}>
              {/* <Main title="From the firehose" posts={posts} /> */}
           
            </Grid>
          </main>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Blog);
