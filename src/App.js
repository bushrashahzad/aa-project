import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
    </Routes>
 </BrowserRouter>
  );
}

export default App;
