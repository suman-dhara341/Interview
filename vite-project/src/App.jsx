import React from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import { Suspense } from "react";

const TodoList = lazy(() => import("./Todo"));
const UserProfileForm = lazy(() => import("./UserProfileForm"));
const Login = lazy(() => import("./Login"));
const ProtectedPage = lazy(() => import("./ProtectedPage"));
const ApiTodo = lazy(() => import("./Api-Task"));

const App = () => {
  return (
    <Router>
      <Header />
      <div className="mt-4">
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            <Route path="/todo" element={<TodoList />} />
            <Route path="/ApiTodo" element={<ApiTodo />} />
            <Route path="/form" element={<UserProfileForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/protected" element={<ProtectedPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
