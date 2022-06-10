
import { useCookies } from "react-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Fourofour from "./pages/Fourofour";
import Home from './pages/Home';
import OnBoarding from './pages/OnBoarding'

function App() {
  // eslint-disable-next-line
  const [cookies,setCookie,removeCookie]=useCookies(['user']);
  const authToken=cookies.AuthToken;
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={authToken?<DashBoard/>:<Home/>}/>
          {authToken && <Route path='/dashboard' element={<DashBoard/>}/>}
          {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
          <Route path="*" element={<Fourofour/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
