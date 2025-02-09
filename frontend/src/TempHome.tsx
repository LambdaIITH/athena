import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TempHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth");
  }, []);
  return (
    <div>
      <h1>Temp Home</h1>
    </div>
  );
};

export default TempHome;
