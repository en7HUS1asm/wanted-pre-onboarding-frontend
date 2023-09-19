import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstPage from './Pages/FirstPage';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import ToDo from './Pages/ToDo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </Router>
      <div>
        hello
      </div>
    </div>
  );
}

export default App;
