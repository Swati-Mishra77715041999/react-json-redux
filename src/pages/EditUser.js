import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const EditUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        content: "",
    });

    const [error, setError] = useState("");
    let {id} = useParams();
    const {user} = useSelector(state => state.data);
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const { title, content} = state;

    useEffect(() => {
        dispatch(getSingleUser(id));
    }, []);

    useEffect(() => {
        if(user) {
            setState({ ...user });
        }
    }, [user]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !content){
           setError("Please Fill Out All The Field"); 
        }else {
            dispatch(updateUser(state, id));
            navigate(`/`);
            setError("");
        }
    };

    return (
        <div>
            <Button  style={{ width: "100px", marginTop: "20px" }} 
            variant="contained" color="secondary" 
            onClick={() => navigate(`/`)}> Go To Home Page </Button>

            <h2> EDIT BLOG HERE</h2>
            {error && <h3 style={{color: "red"}}> {error} </h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit= {handleSubmit} >
            <TextField id="standard-basic" label="Title" value={title || ""} name = "title" type="text" onChange={handleInputChange} />
            <br/>
            <TextField id="standard-basic" label="Content" value={content || ""} name = "content" type="text" onChange={handleInputChange} />
            <br/>
            <Button 
            style={{ width: "100px" }}
            variant="contained" color="primary" type="submit" onChange={handleInputChange}> UPDATE </Button>
            </form>
        </div>
    );
};

export default EditUser;