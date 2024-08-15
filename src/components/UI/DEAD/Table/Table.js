import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "X", field: "x", width:80
      }, {
        headerName: "Y", field: "y", width:100
      }],
      rowData: this.props.rowData
    }
  }

  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{
        height: '400px',
        width: '160px' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default Table;