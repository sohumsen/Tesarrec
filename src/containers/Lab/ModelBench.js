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
  };

  componentDidMount() {
    this.getAllFiles();
    //get all files and show user
    //when user clicks on file send eqns to linearcoupled
    //when user deletes file
    //when user updates file send eqns to db
  }

  // componentDidMount() {
  //   //this.createNewFile(); //post, stores a page and recieves its id
  //   //this.getAllFiles(); //get, gets page id of all files

  //   //this.readModelFromDb(this.state.modelId); //get, gets eqns given page id
  //   console.log(this.state.modelId);
  // }

  readModelFromDb = () => {
    const queryParams = "?auth=" + this.props.token; //+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        "/" +
        this.props.modelId +
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
          console.log("its fine");
          console.log(data);
          // console.log(Object.values(data)[0].Eqns);
          //this.setState({Eqns:Object.values(data)[0].Eqns,calculate:false})
          this.setState({
            Eqns: data.Eqns,
            calculate: false,
          });
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

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
          // userId:this.props.userId
        };
        console.log(this.state.Eqns);
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
              console.log("its fine");
              console.log(data);

              this.setState({ modelId: data.name }, () => {
                this.getAllFiles();
              });
            } else {
              console.log("its not fine" + data.error.message);
              console.log(data);
            }
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    );
  };

  saveEquation = (eqns) => {
    const Eqns = {
      Eqns: eqns,
    };
    this.setState({Eqns:eqns})
    console.log(this.state);
    //https://tesarrec.firebaseio.com/eqns/QXVRwu8vuHRTsLST6wMWOA9jt3b2/-MAQkzE9AFzlCAuvn6hs
    //https://tesarrec.firebaseio.com/eqns/QXVRwu8vuHRTsLST6wMWOA9jt3b2/-MAR6iLb8WpOpXylIzfW.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzZjI3NjU0MmJmZmU0NWU5OGMyMGQ2MDNlYmUyYmExMTc2ZWRhMzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzYXJyZWMiLCJhdWQiOiJ0ZXNhcnJlYyIsImF1dGhfdGltZSI6MTU5MjgzMDc0NywidXNlcl9pZCI6IlFYVlJ3dTh2dUhSVHNMU1Q2d01XT0E5anQzYjIiLCJzdWIiOiJRWFZSd3U4dnVIUlRzTFNUNndNV09BOWp0M2IyIiwiaWF0IjoxNTkyODMwNzQ3LCJleHAiOjE1OTI4MzQzNDcsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Hz_kxHOryao7zmRcEfrEEtM-sbZpPsnWBiLwLlhK2bOW27BloKRcIY_FLW87zhZj6OkCmSWn-LlZik3cqgfmEI5tOE474k0Wgr1HW2f_CU9-TvVdfqnzbYqs8PlAn0XSF2WfjubOLI9EHitEQxYn_7SNYATLJSJrti6gvfAQVZ-JG7eDlMQLbR3P6FBq3yCFPhepCCH5O4RnQKKqjPPKjZapf6ugZYrsS8mTP98U8bSHXLRCyg3nlMGrwdDlZigzZamiUQpXXi6hdrVx8cK2Bv1W0d4J8UWF73PtRlmFKYAIPpcvE7s4S9acfUS2WqVbL984ihS8kU3o_TNUymsGwQ
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
          console.log("its fine");
          console.log(data);
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  onExpandFileLink = (modelId) => {
    //sets model id and eqns
    console.log(modelId)
    this.setState(
      { modelId: modelId, Eqns: this.state.allModelId[modelId].Eqns },
      () => {
        console.log(this.state);
      }
    );
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
          console.log("its fine");
          console.log(data);
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
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
          console.log("its fine");
          console.log(data);
          this.setState({ allModelId: data });
          // console.log(Object.values(data)[0].Eqns);
          //this.setState({Eqns:Object.values(data)[0].Eqns,calculate:false})
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
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
        {modelLinks}
        <br/>
        <GenericButton
          type="button"
          value="Create"
          displayValue="CREATE model"
          onClick={this.createNewFile}
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
