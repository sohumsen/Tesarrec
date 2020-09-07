import React, { Component } from "react";
import $ from "jquery";
import test from "./test.py";
import axios from "axios";

class DBAccess extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    let scrapeJSON = "http://127.0.0.1:8080";

    // axios
    //   .get("http://127.0.0.1:8080/scipy_integrate?eqnStr=x**3")

    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    console.log(this.props.modelObj.returnConstructorObj())
    fetch("http://127.0.0.1:8080/scipy_integrate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify(this.props.modelObj.returnConstructorObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get("http://127.0.0.1:8080/plot.png")

    //   .then((res) => console.log( res))
    //   .catch((err) => console.log("error " + err));

    // $.get(test, function(data) {
    //     // Get JSON data from Python script
    //     if (data){
    //        console.log("Data returned:", data)
    //     }
    //     let jobDataJSON = JSON.parse(data)
    //  })

    // $.ajax({
    //   type: "GET",
    //   url: "~C:\Sohum\Home\Sohum\CodeHome\Javascript\TESSARAC\tesarrecWithoutCODWithHeatMapgithub\src\containers\Lab\test.py",
    //   dataType: 'json',

    //   data: { x: 3 },
    //   success: function (data) {
    //       console.log(data)
    //     this.setState({ data: data });
    //   }.bind(this),
    // });
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
  }

  //  postData(input) {
  //     $.ajax({
  //         type: "GET",
  //         url: "/test.py",
  //         data: { x: input },
  //         success: callbackFunc
  //     });
  // }

  callbackFunc = (response) => {
    // do something with the response
    console.log(response);
  };

  // postData('data to process');
  render() {
    return <div></div>;
  }
}
export default DBAccess;
