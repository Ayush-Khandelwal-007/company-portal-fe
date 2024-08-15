import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import Explore from './Pages/Explore';
import CandidateDetails from './Pages/CandidateDetails';
import ShortListed from './Pages/ShortListed';
import CompareCandidates from './Pages/CompareCandidates';

function App() {
  return (
    <Router>
    <div className="app-container">
    <Sidebar/>
    <div className='main-content'>
          <Routes>
            <Route path="/" element={<Explore/>}/>
            <Route path="/user/:id" element={<CandidateDetails/>}/>
            <Route path="/shortlisted" element={<ShortListed/>}/>
            <Route path="/compare" element={<CompareCandidates/>}/>
          </Routes>
    </div>
  </div>
  </Router>
  );
}

export default App;
