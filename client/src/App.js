import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEntry from './pages/CreateEntry';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<div>Welcome to MoodJournal</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
