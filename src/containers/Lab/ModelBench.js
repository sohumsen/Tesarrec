import React, { Component } from "react";
import SingleODE from "./SingleODE/SingleODE";
import LinearCoupled from "./LinearCoupled/LinearCoupled";
import FileController from "../../components/Calculations/Method/FileController/FileController";
import classes from "./ModelBench.module.css";
import GenericButton from "../../components/UI/Button/GenericButton";
class Dynamic extends Component {
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
    error: true,
  };

  componentDidMount() {
    this.getAllFiles();
  }

  createNewFile = () => {
    this.setState(
      {
        Eqns: [
          {
            id: "qwert",
            line: "a",
            DByDLatex: "\\frac{da}{dt}=",
            LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
            TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
            errorMessage: null,
          },
          {
            id: "yuiop",
            line: "b",

            DByDLatex: "\\frac{db}{dt}=",
            LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
            TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
            errorMessage: null,
          },
          {
            id: "asdfg",
            line: "c",

            DByDLatex: "\\frac{dc}{dt}=",
            LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
            TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
            errorMessage: null,
          },
          {
            id: "hjklz",
            line: "d",

            DByDLatex: "\\frac{dd}{dt}=",
            LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
            TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
            errorMessage: null,
          },
        ],
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

  saveEquation = (eqns) => {
    const Eqns = {
      Eqns: eqns,
    };

    if (this.state.modelId !== "") {
      fetch(
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          "/" +
          this.state.modelId +
          ".json?auth=" +
          this.props.token,
        {
          method: "put",
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
      modelId: modelId,
      Eqns: this.state.allModelId[modelId].Eqns,
    });
  };

  onEditFileLinkName = () => {
    // curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
    // 'https://[PROJECT_ID].firebaseio.com/users/jack/name.json'

    //     curl -X PATCH -d '{"last":"Jones"}' \
    //  'https://[PROJECT_ID].firebaseio.com/users/jack/name/.json'
    const Name = {
      Name: "somethifn",
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
            "type": 'patch',
            "dataType": 'json'
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
            console.log(data);
          } else {
            console.log(data);

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

  onRemoveFileLink = (modelId) => {
    let allModelId = { ...this.state.allModelId };
    delete allModelId[modelId];

    this.setState({ modelId: null, Eqns: [], allModelId: allModelId });

    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        "/" +
        modelId +
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
          this.setState({ allModelId: data, error: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  //        <TemplateController/>

  render() {
    let modelLinks = null;
    Object.keys(this.state.allModelId).length !== 0
      ? (modelLinks = (
          <FileController
            onRemoveFileLink={this.onRemoveFileLink}
            allModelId={this.state.allModelId}
            onExpandFileLink={this.onExpandFileLink}
          />
        ))
      : (modelLinks = null);
    return (
      // can u inject a background-color: ranmdom lookup color if DEVMODE=TRUE
      <div className={classes.ModelBenchContainer}>
        <div className={classes.ModelBenchItemLeft}>
          <h2>Files</h2>
          {modelLinks}
          <br />
          <GenericButton
            type="button"
            value="Create"
            displayValue="CREATE model"
            onClick={this.createNewFile}
          />
          <GenericButton
            type="button"
            value="Rename"
            displayValue="Rename model"
            onClick={this.onEditFileLinkName}
          />
        </div>
        <div className={classes.ModelBenchItemCenter}>
          <LinearCoupled
            userId={this.props.userId}
            token={this.props.token}
            modelId={this.state.modelId}
            Eqns={this.state.Eqns}
            saveEquation={this.saveEquation}
          />
        </div>
      </div>
    );
  }
}

export default Dynamic;
