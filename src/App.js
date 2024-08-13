import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import Explore from './Pages/Explore';
import CandidateDetails from './Pages/CandidateDetails';
import ShortListed from './Pages/ShortListed';

function App() {
  console.log(window.location.pathname);
  return (
    <Router>
    <div className="app-container">
    <Sidebar path={window.location.pathname}/>
    <div className='main-content'>
          <Routes>
            <Route path="/" element={<Explore/>}/>
            <Route path="/user/:id" element={<CandidateDetails/>}/>
            <Route path="/shortlisted" element={<ShortListed/>}/>
            <Route path="/compare" element={<CandidateDetails/>}/>
          </Routes>
    </div>
  </div>
  </Router>
  );
}

export default App;
