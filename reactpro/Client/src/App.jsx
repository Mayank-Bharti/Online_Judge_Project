import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about";
// import { Contact } from "./pages/Contact";
// import { Service } from "./pages/Service";
import { Register } from "./pages/Registration";
import { Login } from "./pages/login.jsx"
import { Navbar } from "./components/Navbar";


const App = () => {
  return (
    <Router>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/service" element={<Service />} /> */}
        <Route path="/Registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;