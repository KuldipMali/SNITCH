import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./app.routes";
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hook/useAuth";
import { useEffect } from "react";

const App = () => {
  const { handleGetMe } = useAuth();

  const user = useSelector((state) => state.auth.user);



  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
