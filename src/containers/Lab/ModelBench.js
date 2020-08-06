import React, { Component } from "react";
import SingleODE from "./SingleODE/SingleODE";
import LinearCoupled from "./LinearCoupled/LinearCoupledNew";
import ModelExplorer from "../../components/UI/FileController/ModelExplorer";
import classes from "./ModelBench.module.css";
import MyTabs from "../../components/UI/MyTabs/MyTabs";
import Skeleton from "../../components/UI/Skeleton/Skeleton";
// import MyErrorMessage from "../../components/UI/MyErrorMessage/MyErrorMessage";

import DEFAULTEQUATIONS from "../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONS";
import DEFAULTVARS from "../../components/Calculations/Dynamic/SampleEquations/DEFAULTVARS";
import DEFAULTGRAPHCONFIG from "./LinearCoupled/DefaultGraphConfig";

import SolverAnalysis from "./SolverAnalysis/SolverAnalysis";
import Model from "../../components/Calculations/Dynamic/SampleEquations/Model";


class ModelBench extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {
    allModelId: {},  /* { modelID: modelObj ...} */
    allPublicId: {},

    selectedModelId: "",
    selectedModel: "",

    calculate: false,
    error: false,
    tabChoiceValue: 1, /* TODO This component doesnt need to know this */
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.MODEL_getPrivate();
    this.MODEL_getPublic();
  }

  generalDBRequest = (payload, url, methodType, ifNoError) => {
    fetch(url, {
      method: methodType,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          ifNoError();
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  MODEL_createNew = () => {
    let aNewModel = this.newModel();

    this.setState(
      {
        selectedModel: aNewModel,
      },
      () => {
        this.generalDBRequest(
          this.state.selectedModel,
          "https://tesarrec.firebaseio.com/eqns/" +
            this.props.userId +
            ".json?auth=" +
            this.props.token,
          "post",

          this.setState({ error: false }, () => {
            this.MODEL_getPrivate();
          })
        );
        // const payload = this.state.selectedModel;

        // fetch(
        //   "https://tesarrec.firebaseio.com/eqns/" +
        //     this.props.userId +
        //     ".json?auth=" +
        //     this.props.token,
        //   {
        //     method: "post",
        //     headers: {
        //       Accept: "application/json, text/plain, */*",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (!data.error) {
        //       this.setState(
        //         { selectedModelId: data.name, error: false },
        //         () => {
        //           this.MODEL_getPrivate();
        //         }
        //       );
        //     } else {
        //       this.setState({ error: true });
        //     }
        //   })
        //   .catch((error) => {
        //     this.setState({ error: true });
        //   });
      }
    );
  };

  MODEL_save = () => {
    const payload = this.state.selectedModel;

    if (this.state.selectedModelId !== "") {
      this.generalDBRequest(
        payload,
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          "/" +
          this.state.selectedModelId +
          "/.json?auth=" +
          this.props.token,
        "PATCH",
        this.setState({ error: false }, () => {
          this.MODEL_getPrivate();
        })
      );
      // fetch(
      //   "https://tesarrec.firebaseio.com/eqns/" +
      //     this.props.userId +
      //     "/" +
      //     this.state.selectedModelId +
      //     "/.json?auth=" +
      //     this.props.token,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(payload),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (!data.error) {
      //       this.setState({ error: false }, () => {
      //         this.MODEL_getPrivate();
      //       });
      //     } else {
      //       this.setState({ error: true });
      //     }
      //   })
      //   .catch((error) => {
      //     this.setState({ error: true });
      //   });
    } else {
      this.setState({ error: true });
    }
  };

  MODEL_publish = () => {
    const payload = { ...this.state.selectedModel, SavedBy: this.props.userId };

    if (this.state.selectedModelId !== "") {
      this.generalDBRequest(
        payload,
        "https://tesarrec.firebaseio.com/public" +
          ".json?auth=" +
          this.props.token,
        "POST",
        this.setState({ error: false }, () => {
          this.MODEL_getPublic();
        })
      );
      // fetch(
      //   "https://tesarrec.firebaseio.com/public" +
      //     ".json?auth=" +
      //     this.props.token,
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(payload),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (!data.error) {
      //       this.setState({ error: false }, () => {
      //         this.MODEL_getPublic();
      //       });
      //     } else {
      //       this.setState({ error: true });
      //     }
      //   })
      //   .catch((error) => {
      //     this.setState({ error: true });
      //   });
    } else {
      this.setState({ error: true });
    }
  };

  MODEL_onSelectLink = (modelId) => {
    //sets model id and eqns
    let allModels = { ...this.state.allModelId, ...this.state.allPublicId };

    this.setState({
      calculate: false,
      selectedModel: allModels[modelId],
      selectedModelId: modelId,
      tabChoiceValue:1
    });
  };

  MODEL_onEditName = (newModelName) => {
    const Name = {
      Name: newModelName,
      // userId:this.props.userId
    };
    // https://tesarrec.firebaseio.com/eqns/QXVRwu8vuHRTsLST6wMWOA9jt3b2/-MAeganGABPemhDxtCc_/Name

    if (this.state.selectedModelId !== "") {
      this.generalDBRequest(
        Name,
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          "/" +
          this.state.selectedModelId +
          "/.json?auth=" +
          this.props.token,
        "PATCH",
        this.setState({ selectedModelId: "" }, () => {
          this.MODEL_getPrivate();
          this.MODEL_getPublic();
        })
      );
      // fetch(
      //   "https://tesarrec.firebaseio.com/eqns/" +
      //     this.props.userId +
      //     "/" +
      //     this.state.selectedModelId +
      //     "/.json?auth=" +
      //     this.props.token,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json",
      //       type: "patch",
      //       dataType: "json",
      //     },

      //     body: JSON.stringify(Name),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (!data.error) {
      //       this.setState({ selectedModelId: "" });
      //       this.MODEL_getPrivate();
      //       this.MODEL_getPublic();
      //     } else {
      //       this.setState({ error: true });
      //     }
      //   })
      //   .catch((error) => {
      //     this.setState({ error: true });
      //   });
    } else {
      this.setState({ error: true });
    }
  };

  MODEL_onRemove = () => {
    let allModelId = { ...this.state.allModelId };
    delete allModelId[this.state.selectedModelId];
    let selectedModel = { ...this.state.selectedModel };
    selectedModel.Eqns = [];
    selectedModel.Vars = [];

    this.setState({
      selectedModelId: null,
      selectedModel: selectedModel,
      allModelId: allModelId,
    });

    this.generalDBRequest(
      null,
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        "/" +
        this.state.selectedModelId +
        ".json?auth=" +
        this.props.token,
      "delete",
      this.setState({ error: false })
    );

    // fetch(
    //   "https://tesarrec.firebaseio.com/eqns/" +
    //     this.props.userId +
    //     "/" +
    //     this.state.selectedModelId +
    //     ".json?auth=" +
    //     this.props.token,
    //   {
    //     method: "delete",
    //     headers: {
    //       Accept: "application/json, text/plain, */*",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (!data.error) {
    //       this.setState({ error: false });
    //     } else {
    //       this.setState({ error: true });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  };

  MODEL_getPublic = () => {
    const queryParams = "?auth=" + this.props.token; //+'&orderBy="userId"&equalTo="'+this.props.userId+'"'

    // this.generalDBRequest(
    //   null,
    //   "https://tesarrec.firebaseio.com/public.json" + queryParams,
    //   "get",
    //   this.setState({ allPublicId: data, error: false, loading: false })
    // );
    fetch("https://tesarrec.firebaseio.com/public.json" + queryParams, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          this.setState({ allPublicId: data, error: false, loading: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  MODEL_getPrivate = () => {
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

  EQNS_copyAllText = () => {
    var allTextEqns = [];

    for (let i = 0; i < this.state.selectedModel.Eqns.length; i++) {
      let Eqn = {
        ...this.state.selectedModel.Eqns[i],
      };
      allTextEqns.push(Eqn.TextEqn);
    }
    navigator.clipboard.writeText(allTextEqns);
  };
  //        <TemplateController/>
  sendToParent = (eqns, vars) => {
    let selectedModel = { ...this.state.selectedModel };
    selectedModel.Eqns = eqns;
    selectedModel.Vars = vars;
    this.setState({ selectedModel: selectedModel });
  };

  handleTabChange = (event, val) => {
    this.setState({ tabChoiceValue: val });
  };

  /** Get all mehod names aligned */
  
  newModel() {

    /** TODO Harmonise default params */
    /** TODO return new Model() */
    let GRAPHCONFIG=DEFAULTGRAPHCONFIG

    let newModel = new Model(
      {
        vars: DEFAULTVARS,
        eqns: DEFAULTEQUATIONS,
        t0: GRAPHCONFIG.t0,
        h: GRAPHCONFIG.h,
        numOfCycles: 30,
        initialConditions: GRAPHCONFIG.initialConditions,
        lineNames: GRAPHCONFIG.lineNames,
      },
      GRAPHCONFIG.method,
      {
        calculate:false,
        name: "A sample model",
        description: "This is meant to describe a model",

      }
    );
    return {
      Eqns: DEFAULTEQUATIONS,
      Vars: DEFAULTVARS,
      Name: "Untitled",
      Description: "Please add Description",
      ActualSolution: "",
      SolutionTechnique: "RK4",
      
    };
  }

  render() {
    let modelLinks = null;
    Object.keys(this.state.allModelId + this.state.allPublicId).length !== 0
      ? (modelLinks = (
          <ModelExplorer
            allModelId={this.state.allModelId}
            allPublicId={this.state.allPublicId}
            selectedModelId={this.state.selectedModelId}
            onSelectModelLink={this.MODEL_onSelectLink}
            onRemoveModel={this.MODEL_onRemove}
            onEditModelName={this.MODEL_onEditName}
            saveEquation={this.MODEL_save}
            publishEquation={this.MODEL_publish}
            copyAllEqnsText={this.EQNS_copyAllText}
            createNewFile={this.MODEL_createNew}
          />
        ))
      : (modelLinks = null);

    const nodeRef = React.createRef(null);

    return (
      // can u inject a background-color: ranmdom lookup color if DEVMODE=TRUE

      <div className={classes.ModelBenchContainer}>
        <div ref={nodeRef} className={classes.ModelBenchItemLeft}>
          <div className={classes.ModelBenchItemLeftFileNav}>
            {this.state.loading ? <Skeleton /> : null}
            {modelLinks}
          </div>

          <div className={classes.ModelBenchItemLeftEqnNav}>
            <MyTabs
              value={this.state.tabChoiceValue}
              handleChange={this.handleTabChange}
              labels={["Single ODE", "Coupled ODE", "Solver Analysis"]}
            />
          </div>
        </div>

        <div className={classes.ModelBenchItemCenter}>
          {this.state.tabChoiceValue === 0 ? <SingleODE /> : null}
          {this.state.tabChoiceValue === 1 ? (
            <LinearCoupled
              calculate={this.state.calculate}
              modelId={this.state.selectedModelId}
              Eqns={this.state.selectedModel.Eqns}
              Vars={this.state.selectedModel.Vars}
              // modelObj={this.state.selectedModel}
              sendToParent={this.sendToParent}
            />
          ) : null}
          {this.state.tabChoiceValue === 2 ? <SolverAnalysis /> : null}
        </div>
        {/* {this.state.error ? <MyErrorMessage /> : null} */}
      </div>
    );
  }
}

export default ModelBench;
