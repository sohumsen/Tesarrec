import React, { Component } from "react";
import LinearCoupled from "./LinearCoupled/LinearCoupled";
import ModelExplorer from "../../components/UI/FileController/ModelExplorer";
import PublishedDialog from "../../components/UI/PublishedDialog/PublishedDialog";

import classes from "./ModelBench.module.css";
import SolverAnalysis from "./SolverAnalysis/SolverAnalysis";
import Model from "../../components/Calculations/Dynamic/SampleEquations/Model";
import axios from "axios";
import FullScreenWrapper from "../../components/UI/FullScreenWrapper/FullScreenWrapper";
import SnackbarError from "../../components/UI/MyErrorMessage/SnackbarError";
import { withSnackbar,SnackbarProvider } from "notistack";
import Button from '@material-ui/core/Button';


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
    axios({
      method: methodType,
      url: url,
      data: payload,
    })
      .then(() => {
        ifNoError();
      })
      .catch((err) => {
        console.log(err);

        // this.setState({error:true})
      });
  };

  MODEL_createNew = () => {
    let aNewModel = this.newModel().returnConstructorObj();
    aNewModel.meta.name =
      aNewModel.meta.name + Object.keys(this.state.allModelId).length;

    axios
      .post(
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          ".json?auth=" +
          this.props.token,
        aNewModel
      )
      .then((response) => {
        this.props.enqueueSnackbar("Created new model", { variant: "success" });

        this.setState({
          error: false,
          selectedModelId: response.data.name,
          selectedModel: aNewModel,
          allModelId: {
            ...this.state.allModelId,
            [response.data.name]: aNewModel,
          },
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar("Failed to create new model", {
          variant: "error",
        });
        this.setState({ error: true });
      });
  };

  /**
   * At this point this states selectedModel is completely up2date
   */
  MODEL_save = () => {
    this.setState({ seekChildUpdates: true });
  };

  MODEL_publish = () => {
    let newModel = this.state.selectedModel;
    if (!(newModel instanceof Model)) {
      newModel = new Model(
        {
          Config: newModel.Config,
          Eqns: newModel.Eqns,
          Vars: newModel.Vars,
        },
        {
          name: newModel.meta.name,
          description: newModel.meta.description,
          modelId: this.state.modelId,
        }
      );
    }

    const payload = {
      ...newModel.returnConstructorObj(),
      SavedBy: this.props.userId,
    };

    // alert("model Published");
    this.setState({ published: false });

    axios
      .post(
        "https://tesarrec.firebaseio.com/public" +
          ".json?auth=" +
          this.props.token,
        payload
      )
      .then((response) => {
        this.props.enqueueSnackbar("Published model", {
          variant: "success",
        });
        this.setState({
          error: false,
          selectedModelId: "",
          // selectedModel: aNewModel,
          allPublicId: {
            ...this.state.allPublicId,
            [response.data.name]: newModel.returnConstructorObj(),
          },
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar("Failed to publish model", {
          variant: "error",
        });
        this.setState({ error: true });
      });
  };

  MODEL_onSelectLink = (modelId) => {
    //sets model id and eqns
    let allModels = { ...this.state.allModelId, ...this.state.allPublicId };
    this.props.enqueueSnackbar("Opened new model", {
      variant: "info",
    });
    this.setState({
      selectedModel: allModels[modelId],
      selectedModelId: modelId,
      tabChoiceValue: 1,
    });
  };

  MODEL_onEditName = (newModelName) => {
    this.props.enqueueSnackbar("Edited model name", {
      variant: "success",
    });
    let modelObj = this.state.selectedModel;
    modelObj.meta.name = newModelName;
    this.setState({ selectedModel: modelObj }, () => this.MODEL_save());
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

    axios
      .delete(
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          "/" +
          this.state.selectedModelId +
          ".json?auth=" +
          this.props.token
      )
      .then((res) => {
        this.props.enqueueSnackbar("Deleted model", {
          variant: "success",
        });
        this.setState({ error: false });
      })
      .catch((err) => {
        this.props.enqueueSnackbar("Failed to delete model", {
          variant: "error",
        });
        this.setState({ error: true });
      });
  };

  MODEL_getPublic = () => {
    axios
      .get(
        "https://tesarrec.firebaseio.com/public.json" +
          "?auth=" +
          this.props.token
      )
      .then((res) =>
        this.setState({ allPublicId: res.data, error: false, loading: false })
      )
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  MODEL_getPrivate = () => {
    // const queryParams = "?auth=" + this.props.token; //+'&orderBy="userId"&equalTo="'+this.props.userId+'"'

    axios
      .get(
        "https://tesarrec.firebaseio.com/eqns/" +
          this.props.userId +
          ".json" +
          "?auth=" +
          this.props.token
      )
      .then((res) =>
        this.setState({ allModelId: res.data, error: false, loading: false })
      )
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  EQNS_copyAllText = () => {
    let allTextEqns = [];

    for (let i = 0; i < this.state.selectedModel.Eqns.length; i++) {
      let Eqn = {
        ...this.state.selectedModel.Eqns[i],
      };
      allTextEqns.push(Eqn.textEqn);
    }
    navigator.clipboard.writeText(allTextEqns);
    this.props.enqueueSnackbar("Copied equations", {
      variant: "success",
    });
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
      let payload = this.state.selectedModel.returnConstructorObj();
      if (this.state.selectedModelId !== "") {
        // axios.put(
        //   "https://tesarrec.firebaseio.com/eqns/" +
        //     this.props.userId +
        //     "/" +
        //     this.state.selectedModelId +
        //     "/.json?auth=",
        //   payload
        // )
        // .then((response) => {
        //   this.setState({
        //     error: false,
        //     seekChildUpdates: false,

        //   });
        // })
        // .catch((error) => {
        //   this.setState({ error: true });
        // });
        this.generalDBRequest(
          payload,
          "https://tesarrec.firebaseio.com/eqns/" +
            this.props.userId +
            "/" +
            this.state.selectedModelId +
            "/.json?auth=" +
            this.props.token,
          "PUT",
          this.setState({ error: false, seekChildUpdates: false }, () => {
            this.MODEL_getPrivate();
            // this.props.enqueueSnackbar("Saved Model", {
            //   variant: 'success'
            // });
          })
        );
      } else {
        this.props.enqueueSnackbar("Failed to save model", {
          variant: "error",
        });
        this.setState({ error: true });
      }
    });
  };

  handleTabChange = (event, val) => {
    this.props.enqueueSnackbar("Switched mode", {
      variant: "info",
    });
    this.setState({ tabChoiceValue: val });
  };

  /** Get all mehod names aligned */

  newModel() {
    return new Model();
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
            publishEquation={() => {
              this.setState({ published: true });
            }}
            copyAllEqnsText={this.EQNS_copyAllText}
            createNewFile={this.MODEL_createNew}
            handleTabChange={this.handleTabChange}
            tabChoiceValue={this.state.tabChoiceValue}
          />
        ))
      : (modelLinks = null);

    const nodeRef = React.createRef(null);
    const notistackRef = React.createRef();
    const onClickDismiss = (key) => () => {
      notistackRef.current.closeSnackbar(key);
    };
    return (
      // can u inject a background-color: ranmdom lookup color if DEVMODE=TRUE

      <FullScreenWrapper>
        <div className={classes.ModelBenchContainer}>
          <div ref={nodeRef} className={classes.ModelBenchItemLeft}>
            {/* {this.state.loading ? <Skeleton /> : null} */}
            {modelLinks}

            {/* <div className={classes.ModelBenchItemLeftEqnNav}>
            <MyTabs
              value={this.state.tabChoiceValue}
              handleChange={this.handleTabChange}
              labels={["Single ODE", "Coupled ODE", "Solver Analysis"]}
            />
          </div> */}
          </div>

          <div className={classes.ModelBenchItemCenter}>
            {/* <MathQuillTest/> */}
            {/* {this.state.tabChoiceValue === 0 ? <SingleODE /> : null} */}
            {this.state.tabChoiceValue === 1 ? (
              // <SnackbarProvider
              //   maxSnack={2}
              //   ref={notistackRef}
              //   action={(key) => (
              //     <Button onClick={onClickDismiss(key)}>Dismiss</Button>
              //   )}
              //   preventDuplicate
              // >
              
                <LinearCoupled
                  modelId={this.state.selectedModelId}
                  modelObj={this.state.selectedModel}
                  sendToParent={this.sendToParent}
                  seekChildUpdates={this.state.seekChildUpdates}
                  enqueueSnackbar={this.props.enqueueSnackbar}
                />
              // </SnackbarProvider>
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
          {this.state.error ? <SnackbarError /> : null}
          <div className={classes.copyright}>
            <p>
              For the Model Bench User, <br />
              you must give appropriate credit: ©Sohum Sen <br />
              <a
                href="https://tesarrec.org/modelbench"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://tesarrec.org/modelbench
                <br />
              </a>
              01/05/2020
            </p>
          </div>
        </div>
      </FullScreenWrapper>
    );
  }
}

export default withSnackbar(ModelBench);
