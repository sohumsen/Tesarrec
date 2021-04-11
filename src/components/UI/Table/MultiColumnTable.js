import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

  },


}))(TableRow);



const useStyles = makeStyles({});

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <p>{props.title}</p>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.headers.map((header) => (
              <StyledTableCell align="right">{header}</StyledTableCell>
            ))}

            {/* <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <StyledTableRow key={row}>
              {row.map((rowel) => (
                <StyledTableCell component="th" scope="row">
                  {typeof rowel !== "string" ? rowel.toFixed(2) : rowel}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
