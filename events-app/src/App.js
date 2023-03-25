import './App.css';
import Login from "./components/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation';
import {Routes, Route} from 'react-router-dom'
import UserEvents from './components/userEvents';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Events" element={<UserEvents/>}/>
      </Routes>
    </div>
  );
}

export default App;
