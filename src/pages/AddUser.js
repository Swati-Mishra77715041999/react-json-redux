import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const AddUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        content: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const { title, content} = state;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !content){
           setError("Please Fill Out All The Field"); 
        }else {
            dispatch(addUser(state));
            navigate(`/`);
            setError("");
        }
    };

    return (
        <div>
            <Button  style={{ width: "100px", marginTop: "20px" }} 
            variant="contained" color="secondary" 
            onClick={() => navigate(`/`)}> Go To Home Page </Button>

            <h2> ADD NEW BLOG HERE</h2>
            {error && <h3 style={{color: "red"}}> {error} </h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit= {handleSubmit} >
            <TextField id="standard-basic" label="Title" value={title} name = "title" type="text" onChange={handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Content" value={content} name = "content" type="text" onChange={handleInputChange} />
            <br/>
            <Button 
            style={{ width: "100px" }}
            variant="contained" color="primary" type="submit" onChange={handleInputChange}> SUBMIT </Button>
            </form>
        </div>
    );
};

export default AddUser;