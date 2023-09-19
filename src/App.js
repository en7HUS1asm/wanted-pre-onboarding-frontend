import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstPage from './components/FirstPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<FirstPage />} />
        </Routes>
      </Router>
      <div>
        hello
      </div>
    </div>
  );
}

export default App;
