import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || null
  );

  const signin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
      } else {
        setError(data.error.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setIsAuthenticated(false);
    }
    console.log("Credentials:", JSON.stringify(credentials));
  };

  const signout = async () => {
    /*
    fetch("http://localhost:8000/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsername(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });*/
    console.log("Signout");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, signin, signout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
