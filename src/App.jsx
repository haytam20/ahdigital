import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Store from './pages/store';
// import Login from './Login';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/store" element={<Store />} />
          <Route path="/" element={<Navigate to="/store" />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;