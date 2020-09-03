import React, { Component } from "react";
import LinearCoupled from "./LinearCoupled/LinearCoupled";
import ModelExplorer from "../../components/UI/FileController/ModelExplorer";
import PublishedDialog from "../../components/UI/PublishedDialog/PublishedDialog";

import classes from "./ModelBench.module.css";

import SolverAnalysis from "./SolverAnalysis/SolverAnalysis";
import Model from "../../components/Calculations/Dynamic/SampleEquations/Model";

class ModelBench extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {
    allModelId: {} /* { modelID: modelObj ...} */,
    allPublicId: {},

    selectedModelId: "",
    selectedModel: "",

    calculate: false,
    error: false,
    tabChoiceValue: 1 /* TODO This component doesnt need to know this */,
    loading: false,
    seekChildUpdates: false,
    published: false,
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
    aNewModel.meta.name =
      aNewModel.meta.name + Object.keys(this.state.allModelId).length;

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
        body: JSON.stringify(aNewModel),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          this.setState({
            error: false,
            selectedModelId: data.name,
            selectedModel: aNewModel,
            allModelId: { ...this.state.allModelId, [data.name]: aNewModel },
          });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  toSkeleton = (modelObj) => {
    return modelObj;
  };

  /**
   * At this point this states selectedModel is completely up2date
   */
  MODEL_save = () => {
    this.setState({ seekChildUpdates: true });
    // this.setState({ seekChildUpdates: true }, () => {
    //let payload = this.toSkeleton(this.state.selectedModel);
    //console.log(payload)

    //   if (this.state.selectedModelId !== "") {
    //     this.generalDBRequest(
    //       payload,
    //       "https://tesarrec.firebaseio.com/eqns/" +
    //         this.props.userId +
    //         "/" +
    //         this.state.selectedModelId +
    //         "/.json?auth=" +
    //         this.props.token,
    //       "PATCH",
    //       this.setState({ error: false, seekChildUpdates: false }, () => {
    //         this.MODEL_getPrivate();
    //       })
    //     );
    //   } else {
    //     this.setState({ error: true });
    //   }
    // });

    //const payload = this.state.selectedModel;
  };

  MODEL_publish = () => {
    const payload = { ...this.state.selectedModel.returnConstructorObj(), SavedBy: this.props.userId };
    // alert("model Published");
    this.setState({ published: false });
    // if (this.state.selectedModelId !== "") {
    //   this.generalDBRequest(
    //     payload,
    //     "https://tesarrec.firebaseio.com/public" +
    //       ".json?auth=" +
    //       this.props.token,
    //     "POST",
    //     this.setState({ error: false }, () => {
    //       this.MODEL_getPublic();
    //     })
    //   );
    // } else {
    //   this.setState({ error: true });
    // }

    //////////////////////////////////

    fetch(
      "https://tesarrec.firebaseio.com/public" +
        ".json?auth=" +
        this.props.token,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          fetch(
            "https://tesarrec.firebaseio.com/public.json?auth=" +
              this.props.token,
            {
              method: "get",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data1) => {
              if (!data1.error) {
                this.setState({
                  allPublicId: data1,
                  error: false,
                  loading: false,
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
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  MODEL_onSelectLink = (modelId) => {
    //sets model id and eqns
    let allModels = { ...this.state.allModelId, ...this.state.allPublicId };

    this.setState({
      calculate: false,
      selectedModel: allModels[modelId],
      selectedModelId: modelId,
      tabChoiceValue: 1,
    });
  };

  MODEL_onEditName = (newModelName) => {
    let modelObj = this.state.selectedModel;
    modelObj.meta.name = newModelName;
    this.setState({ selectedModel: modelObj }, () => {
      console.log(this.state.selectedModel.meta.name);
    });

    //this.MODEL_save()

    // this.sendToParent(modelObj);
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

  /**
   * This is used by child components to keep this parent informed of changes
   * Therefore we must merge itemwise because its possible that
   * further changes to the model has happened in this class
   */
  sendToParent = (modelObj) => {
    // At the moment only the name can be out of sync here
    modelObj.meta.name = this.state.selectedModel.meta.name;

    this.setState({ selectedModel: modelObj }, () => {
      console.log(this.state.selectedModel.returnConstructorObj())
      let payload = this.state.selectedModel.returnConstructorObj();
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
          this.setState({ error: false, seekChildUpdates: false }, () => {
            this.MODEL_getPrivate();
          })
        );
      } else {
        this.setState({ error: true });
      }
    });
  };

  handleTabChange = (event, val) => {
    this.setState({ tabChoiceValue: val });
  };

  /** Get all mehod names aligned */

  newModel() {
    /** TODO Harmonise default params */
    /** TODO return new Model() */

    let newModel = new Model();

    return newModel;

    //return {
    // Eqns: DEFAULTEQUATIONS,
    // Vars: DEFAULTVARS,
    // Name: "Untitled",
    // Description: "Please add Description",
    // ActualSolution: "",
    // SolutionTechnique: "RK4",
    //};
  }

  render() {
    let modelLinks;
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
            publishEquation={()=>{
              this.setState({published:true})
            }}
            copyAllEqnsText={this.EQNS_copyAllText}
            createNewFile={this.MODEL_createNew}
            handleTabChange={this.handleTabChange}
            tabChoiceValue={this.state.tabChoiceValue}
          />
        ))
      : (modelLinks = null);

    const nodeRef = React.createRef(null);
    return (
      // can u inject a background-color: ranmdom lookup color if DEVMODE=TRUE

      <div className={classes.ModelBenchContainer}>
        <div ref={nodeRef} className={classes.ModelBenchItemLeft}>
          <div className={classes.ModelBenchItemLeftFileNav}>
            {/* {this.state.loading ? <Skeleton /> : null} */}
            {modelLinks}
          </div>

          {/* <div className={classes.ModelBenchItemLeftEqnNav}>
            <MyTabs
              value={this.state.tabChoiceValue}
              handleChange={this.handleTabChange}
              labels={["Single ODE", "Coupled ODE", "Solver Analysis"]}
            />
          </div> */}
        </div>

        <div className={classes.ModelBenchItemCenter}>
          {/* {this.state.tabChoiceValue === 0 ? <SingleODE /> : null} */}
          {this.state.tabChoiceValue === 1 ? (
            <LinearCoupled
              modelId={this.state.selectedModelId}
              modelObj={this.state.selectedModel}
              sendToParent={this.sendToParent}
              seekChildUpdates={this.state.seekChildUpdates}
            />
          ) : null}
          {this.state.tabChoiceValue === 2 ? <SolverAnalysis /> : null}
          {this.state.published ? (
            <PublishedDialog
              onCancelPublish={() => {
                this.setState({ published: false });
              }}
              onPublishModel={this.MODEL_publish}
              
            />
          ) : null}
        </div>
        {/* {this.state.error ? <MyErrorMessage /> : null} */}
        <div className={classes.copyright}>
          <p>
            For the Model Bench User, <br/>you must give appropriate credit: ©Sohum
            Sen{" "}<br/>
            <a href="https://tesarrec.org/modelbench" target="_blank">
              https://tesarrec.org/modelbench<br/>
            </a>{" "}
            01/05/2020
          </p>
        </div>
      </div>
    );
  }
}

export default ModelBench;
