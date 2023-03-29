import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" Component={Home} />
        <Route exact path = "/addUser" Component={AddUser} />
        <Route exact path = "/editUser/:id" Component={EditUser} />
      </Routes>  
    </div>
  );
}

export default App;
