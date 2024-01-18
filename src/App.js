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
import Profile from "./pages/Profile/Profile";

function App() {
  const { width } = useWindowDimensions();
  const { alert } = useStateProvider();
  const {user} = useAuth();
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
          <Route path="/profil" element={<Profile />} />

        </Route>

        <Route
          element={
            <>
              <Header expand={width >= 750 ? "sm" : false} ></Header>
              <Layout>
                <Outlet />
              </Layout>
            </>
          }
        >
          {/* public routes */}
          <Route path="/login" element={<Login />} />
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
