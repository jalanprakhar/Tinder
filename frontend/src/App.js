
import { useCookies } from "react-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Home from './pages/Home';
import OnBoarding from './pages/OnBoarding'

function App() {
  const [cookies,setCookie,removeCookie]=useCookies(['user']);
  const authToken=cookies.AuthToken;
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          {authToken && <Route path='/dashboard' element={<DashBoard/>}/>}
          {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
