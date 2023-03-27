import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" Component={Home} />
        <Route exact path = "/addUser" Component={AddUser} />
      </Routes>  
    </div>
  );
}

export default App;
