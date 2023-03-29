import React, {useEffect} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900
    },
});

const Home = () => {
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.data)
    useEffect(() => {
      dispatch(loadUsers());
    }, []);

    const handleDelete = (id) => {
      if(window.confirm("Are you sure wanted to delete this Blog?")){
        dispatch(deleteUser(id))
      }
    };

    return(
        <div>
          <div className={buttonStyles.root}>
              <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate(`/addUser`)}
              >
                Add Blog</Button>
          </div>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Content</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.title}
              </StyledTableCell>
              <StyledTableCell align="center">{user.content}</StyledTableCell>
              <StyledTableCell align="center">
                <div className={buttonStyles.root}>
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                  <Button style={{marginRight: "5px"}} color="primary" onClick={() => navigate(`/editUser/${user.id}`)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                </ButtonGroup>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default Home;