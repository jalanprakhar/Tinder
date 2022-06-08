
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Home from './pages/Home';
import OnBoarding from './pages/OnBoarding'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path="/onboarding" element={<OnBoarding/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
