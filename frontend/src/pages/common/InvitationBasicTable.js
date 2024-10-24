import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './common.css';


const InvitationBasicTable = (props) => {
  const { headers, rows, preview, edit, deleteFunc } = props;
  return (
    <TableContainer class="table1" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align="center">
                <b>{header}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.subject}</TableCell>
              <TableCell align="center">{row.message}</TableCell>
              <TableCell align="center">{row.receiver}</TableCell>
              <TableCell align="center">{row.sender}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => preview(row)} aria-label="preview">
                  <PreviewIcon />
                </IconButton>
                <IconButton onClick={() => edit(row)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteFunc(row)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvitationBasicTable;
