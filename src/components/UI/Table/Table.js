import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    // minWidth: 5,
    // maxWidth: "1px",
    // width:200,
  },
  TableContainer: {
    // maxWidth: 820,
    // maxHeight: 180,
    width:"100%",
    height:"100%",
    overflow:"auto"

  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.TableContainer}>
      <Table
        stickyHeader
        className={classes.table}
        size="small"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell
                style={{ width: "10px" }}
                onClick={() => {
                  console.log(column);
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow>
              {props.columns.map((letter) => (
                <TableCell style={{ width: "10px" }}>{row[letter]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
