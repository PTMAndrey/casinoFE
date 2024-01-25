import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header/Header";
import PaginaPrincipala from "./pages/Home/Home";
import Layout from './pages/Layout/Layout'
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Alert from "./components/Alert/Alert";
import useStateProvider from "./hooks/useStateProvider";
import useWindowDimensions from "./hooks/useWindowDimensions"
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProfilulMeu from "./pages/Profile/ProfilulMeu";
import Roulette from "./pages/Roulette/Roulette";

function App() {
  const { width } = useWindowDimensions();
  const { alert } = useStateProvider();
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Header expand={width >= 750 ? "md" : false} ></Header>
              <Layout>
                <ProtectedRoutes />
              </Layout>
            </>
          }
        >
          {/* protected routes */}
          <Route path="/" element={<PaginaPrincipala />} />
          <Route path="/ruleta" element={<Roulette />} />
          
          <Route path="/user">
            <Route path="profil" element={<ProfilulMeu />} />
            <Route path="referal" element={<ProfilulMeu />} />
            <Route path="depunere" element={<ProfilulMeu />} />
            <Route path="retragere" element={<ProfilulMeu />} />
            {/* <Route path="abonament" element={<ProfilulMeu />} /> */}
          </Route>

        </Route>

        <Route
          element={
            <>
              <Header expand={width >= 750 ? "sm" : false} ></Header>
              <Outlet />
            </>
          }
        >
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* onboarding routes */}
        {/* <Route path="/register" element={<Onboarding />} />
        <Route path="/forgot-password" element={<Onboarding />} />
        <Route path="/reset-password" element={<Onboarding />} /> */}
      </Routes>
      {alert && <Alert message={alert.message} type={alert.type} />}
    </Router>
  );
}

export default App;
