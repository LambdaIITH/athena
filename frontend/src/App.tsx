import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/auth";
import Dashboard from "./pages/Layout";
import TempHome from "./TempHome";
import Home from "./pages/dashboard/Home";
import {useAuth} from "./pages/auth/providers/AuthContext";
import { Navigate } from "react-router-dom";


const App = () => {
  const {user} = useAuth();
  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    return user ? <>{children}</> : <Navigate to="/auth" replace />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<TempHome />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/home" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<RequireAuth><Home /></RequireAuth> } />
        </Route>
      </Routes>
    </>
  );
};

export default App;