import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function CenteredTabs(props) {
  let tabs = props.labels.map((label, i) => {
    return <Tab key={i} label={label} />;
  });

  return (
    <div>
      <Paper>
        <Tabs
          orientation="vertical"
          value={props.value}
          onChange={props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {tabs}
        </Tabs>
      </Paper>
    </div>
  );
}
