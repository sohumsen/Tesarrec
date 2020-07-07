import React, { Component } from "react";
import SingleODE from "./SingleODE/SingleODE";
import LinearCoupled from "./LinearCoupled/LinearCoupled";
import FileController from "../../components/Calculations/Method/FileController/FileGenerator";
import classes from "./ModelBench.module.css";
import MyTabs from "../../components/UI/MyTabs/MyTabs";
import Skeleton from "../../components/UI/Skeleton/Skeleton";
import MyErrorMessage from "../../components/UI/MyErrorMessage/MyErrorMessage";
import { Paper, Tooltip, IconButton } from "@material-ui/core";
import Draggable from "react-draggable";
import RestoreIcon from "@material-ui/icons/Restore";

import DraggableWrapper from "../../components/UI/DraggableWrapper/DraggableWrapper";
import DEFAULTEQNS from "./DefaultStates/DefaultEqns";

class ModelBench extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {
    modelId: "",
    allModelId: {},
    Eqns: [],
    calculate: false,
    error: false,
    tabChoiceValue: 1,
    loading: false,
    fileExplorerPos: { x: 0, y: 0 },
    eqnEditorPos: { x: 0, y: 0 },
    graphPos: { x: 0, y: 0 },
    configPos: { x: 0, y: 0 },
    resetAllPos: false,
  };



  componentDidMount() {
    this.setState({ loading: true });
    this.getAllFiles();
  }

  createNewFile = () => {
    this.setState(
      {
        Eqns: DEFAULTEQNS,
      },
      () => {
        const Eqns = {
          Eqns: this.state.Eqns,
          Name: "Untitled",
          // userId:this.props.userId
        };
        
        fetch(
          "https://tesarrec.firebaseio.com/eqns/" +
            this.props.userId +
            ".json?auth=" +
            this.props.token,
          {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Eqns),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              this.setState({ modelId: data.name, error: false }, () => {
                this.getAllFiles();
              });
            } else {
              this.setState({ error: true });
            }
          })
          .catch((error) => {
            this.setState({ error: true });
          });
      }
    );
  };

  sendToParent = (eqns) => {
    this.setState({ Eqns: eqns });
  };

  saveEquation = () => {
    const Eqns = {
      Eqns: this.state.Eqns,
    };

    if (this.state.modelId !== "") {
      fetch(
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          "/" +
          this.state.modelId +
          "/.json?auth=" +
          this.props.token,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Eqns),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            this.setState({ Eqns: data.Eqns, error: false }, () => {
              this.getAllFiles();
            });
          } else {
            this.setState({ error: true });
          }
        })
        .catch((error) => {
          this.setState({ error: true });
        });
    } else {
      this.setState({ error: true });
    }
  };

  onExpandFileLink = (modelId) => {
    //sets model id and eqns

    this.setState({
      calculate: false,
      modelId: modelId,
      Eqns: this.state.allModelId[modelId].Eqns,
    });
  };

  onEditFileLinkName = (newFileName) => {
    // curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
    // 'https://[PROJECT_ID].firebaseio.com/users/jack/name.json'

    //     curl -X PATCH -d '{"last":"Jones"}' \
    //  'https://[PROJECT_ID].firebaseio.com/users/jack/name/.json'
    const Name = {
      Name: newFileName,
      // userId:this.props.userId
    };
    // https://tesarrec.firebaseio.com/eqns/QXVRwu8vuHRTsLST6wMWOA9jt3b2/-MAeganGABPemhDxtCc_/Name

    if (this.state.modelId !== "") {
      fetch(
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          "/" +
          this.state.modelId +
          "/.json?auth=" +
          this.props.token,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            type: "patch",
            dataType: "json",
          },

          body: JSON.stringify(Name),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            // this.setState({ Eqns: data.Eqns, error: false }, () => {
            //   this.getAllFiles();
            // });
            this.getAllFiles();
          } else {
            this.setState({ error: true });
          }
        })
        .catch((error) => {
          this.setState({ error: true });
        });
    } else {
      this.setState({ error: true });
    }
  };

  onRemoveFileLink = () => {
    let allModelId = { ...this.state.allModelId };
    delete allModelId[this.state.modelId];

    this.setState({ modelId: null, Eqns: [], allModelId: allModelId });

    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        "/" +
        this.state.modelId +
        ".json?auth=" +
        this.props.token,
      {
        method: "delete",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          this.setState({ error: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  getAllFiles = () => {
    const queryParams = "?auth=" + this.props.token; //+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        ".json" +
        queryParams,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          this.setState({ allModelId: data, error: false, loading: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  copyAllEqnsText = () => {
    var allTextEqns = [];

    for (let i = 0; i < this.state.Eqns.length; i++) {
      let Eqn = {
        ...this.state.Eqns[i],
      };
      allTextEqns.push(Eqn.TextEqn);
    }
    navigator.clipboard.writeText(allTextEqns);
  };
  //        <TemplateController/>
  handleTabChange = (event, val) => {
    this.setState({ tabChoiceValue: val });
  };

  onStop = (e, data, name) => {
    let changed = {
      ...this.state[name],
    };
    changed.x = data.x;
    changed.y = data.y;

    this.setState({
      [name]: changed,
    });
  };

  resetAllPos = () => {
    this.setState({
      fileExplorerPos: { x: 0, y: 0 },
      eqnEditorPos: { x: 0, y: 0 },
      graphPos: { x: 0, y: 0 },
      configPos: { x: 0, y: 0 },
    });
  };
  render() {
    let modelLinks = null;
    Object.keys(this.state.allModelId).length !== 0
      ? (modelLinks = (
          <FileController
            allModelId={this.state.allModelId}
            selectedModelId={this.state.modelId}
            onExpandFileLink={this.onExpandFileLink}
            onRemoveFileLink={this.onRemoveFileLink}
            onEditFileLinkName={this.onEditFileLinkName}
            saveEquation={this.saveEquation}
            copyAllEqnsText={this.copyAllEqnsText}
            createNewFile={this.createNewFile}
          />
        ))
      : (modelLinks = null);

    const nodeRef = React.createRef(null);
    return (
      // can u inject a background-color: ranmdom lookup color if DEVMODE=TRUE

      <div className={classes.ModelBenchContainer}>
        <Tooltip title="Reset all Positions" placement="top" arrow>
          <span>
            <IconButton
              edge="end"
              aria-label="Reset"
              onClick={this.resetAllPos}
            >
              <RestoreIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Draggable
          position={this.state.fileExplorerPos}
          onStop={(e, data) => this.onStop(e, data, "fileExplorerPos")}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className={classes.ModelBenchItemLeft}>
            <div className={classes.ModelBenchItemLeftFileNav}>
              {this.state.loading ? <Skeleton /> : null}
              {modelLinks}
            </div>

            <div className={classes.ModelBenchItemLeftEqnNav}>
              <MyTabs
                value={this.state.tabChoiceValue}
                handleChange={this.handleTabChange}
                labels={["Single ODE", "Coupled ODE"]}
              />
            </div>
          </div>
        </Draggable>

        <div className={classes.ModelBenchItemCenter}>
          {this.state.tabChoiceValue === 0 ? (
            <SingleODE />
          ) : (
            <LinearCoupled
              calculate={this.state.calculate}
              modelId={this.state.modelId}
              Eqns={this.state.Eqns}
              sendToParent={this.sendToParent}
              nodeRef={nodeRef}
              eqnEditorPos={this.state.eqnEditorPos}
              graphPos={this.state.graphPos}
              configPos={this.state.configPos}
              onStop={this.onStop}
            />
          )}
        </div>
        {this.state.error ? <MyErrorMessage /> : null}
      </div>
    );
  }
}

export default ModelBench;
