import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./app.routes";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
