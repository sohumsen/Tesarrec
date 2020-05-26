import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function CenteredTabs(props) {

  return (
    <div>
    <Paper>
      <Tabs
        value={props.value} 
        onChange={props.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="ODE Solver" />
        <Tab label="Linear Coupled" />
      </Tabs>
    </Paper>
    </div>
  );
}
