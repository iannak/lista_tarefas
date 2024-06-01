import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import TaskList from "./components/TaskList";
import { Task } from "./@types";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute: React.FC = () => {
  const { signed } = useAuth();
  return signed ? <Outlet /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/tasks"
            element={
              <TaskList
                tasks={[]}
                setTasks={function (value: React.SetStateAction<Task[]>): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
