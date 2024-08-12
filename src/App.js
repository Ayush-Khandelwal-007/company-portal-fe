import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import Explore from './Pages/Explore';
import CandidateDetails from './Pages/CandidateDetails';

function App() {
  return (
    <div className="app-container">
    <Sidebar />
    <div className='main-content'>
      <Router>
          <Routes>
            <Route path="/" element={<Explore/>}/>
            <Route path="/user/:id" element={<CandidateDetails/>}/>
          </Routes>
      </Router>
    </div>
  </div>
  );
}

export default App;
