import { toast } from "@/hooks/use-toast";
import { loginService } from "@/services/authService";
import { getUserService } from "@/services/userService";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  token: string;
  email: string;
  username: string;
  access: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (idToken: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token: string) => {
    try {
      const decoded: { picture: string } = jwtDecode(token);
      // console.log("Decoded Token:", decoded.picture);
      localStorage.setItem("profile_url", decoded.picture);
      const data = await getUserService(token);
      setUser({
        token,
        email: data.userdetails.email,
        username: data.userdetails.student_name,
        access: data.userdetails.access,
      });
    } catch (error) {
      localStorage.removeItem("profile_url");
      localStorage.removeItem("token");
      console.log(error);
      toast({
        title: "Error",
        description: "Invalid token",
        duration: 5000,
      });
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      fetchUser(token);
      // console.log("token", token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (idToken: string): Promise<boolean> => {
    try {
      const data = await loginService(idToken);
      if (!data.userdetails) {
        toast({
          title: "Error",
          description: data.message,
          duration: 4000,
        });
        return false;
      }
      localStorage.setItem("token", idToken);
      localStorage.setItem("username", data.userdetails.student_name);
      localStorage.setItem("email", data.userdetails.email);
      localStorage.setItem("access", data.userdetails.access);
      setUser({
        token: idToken,
        email: data.userdetails.email,
        username: data.userdetails.student_name,
        access: data.userdetails.access,
      });
      toast({
        title: "Success",
        description: "You have successfully logged in",
        duration: 4000,
      });
      return true;
    } catch (error) {
      // console.error("Error logging in:", error.response);
      const message = error.response.data.message;
      // console.log("message", message);
      toast({
        title: "Error",
        description: message,
        duration: 4000,
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profile_url");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
