import AuthFormContainer from "./users/UserRegistration";
import Base from "./base";
import VerifyOtp from "./users/VerifyOtp";
import Home from "./home/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes path="/" element={<Base />}>
          <Route index element={<AuthFormContainer />} />
          <Route path="/verifyOtp" exact element={<VerifyOtp />}  />
          <Route path="/home" exact  element={<Home />}  /> 
          {/* <Route path="/home"  element={<Navbar />}  /> */}
          {/* <Route path="/home"  element={<ProductsContainer />}  /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
