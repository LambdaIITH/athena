import Header from "@/layout/header";
import Sidebar from "@/layout/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/providers/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {/* <div className="h-0">{user ? <Outlet /> : <Navigate to="/auth" />}</div> */}
      </main>
    </div>
  );
};

export default Dashboard;
