const DEFAULTLAYOUT = (props) => [
  {
    i: "Eqns",
    x: 0,
    y: 0,
    w: 3,
    h: 1.5 + props.Eqns.length * 1.8,
    isResizable: false,
    static: true,
  },
  {
    i: "Vars",
    x: 3,
    y: 0,
    w: 1.5,
    h: 1.5 + props.Vars.length * 1.8,
    isResizable: false,
    static: true,
  },

  {
    i: "GraphButtons",
    x: 4.5,
    y: 0,
    w: 7,
    h: 1.5,
    isResizable: false,
    static: true,
  },
  {
    i: "Graph",
    x: 4.5,
    y: 1.5,
    w: 7,
    h: 12.5,
    isResizable: false,
    static: true,
  },
  {
    i: "GraphConfig",
    x: 0,
    y: 1.5 + props.Eqns.length * 1.8,
    w: 3,
    h: 4,
    isResizable: false,
    static: true,
  },
];

export default DEFAULTLAYOUT;
