import React, { Component } from "react";
import $ from "jquery";
import test from "./test.py";

class DBAccess extends Component {
    state={
        data:{}
    }
    
  componentDidMount() {

    let scrapeJSON = 'http://bluegalaxy.info/cgi/scrapeJSON.py'

    $.get(test, function(data) {
        // Get JSON data from Python script
        if (data){
           console.log("Data returned:", data)
        }
        let jobDataJSON = JSON.parse(data)
     })



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
