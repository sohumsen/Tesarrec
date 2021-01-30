import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {},
  sidebarSection: {},
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { archives, description, social, title } = props;

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      {social.map((network) => (
        <Link
          href={network.link}
          key={network}
          style={{
            color: "white",
            padding:"30px"
          }}
        >
            <network.icon />
        </Link>
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};
