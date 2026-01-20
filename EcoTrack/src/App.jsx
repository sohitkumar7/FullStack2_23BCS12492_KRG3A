import Header from "./components/Header";
import Logs from "./pages/logs";
import Dashboard from "./pages/DashboardLayout";
import { logs } from "./data/logs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Login from "./pages/login";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardSummary from "./pages/DashboardSummary";
import DashboardAnalutics from "./pages/DashboardAnalutics";
const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />

            </ProtectedRoute>
          }>
          <Route index element={<DashboardSummary></DashboardSummary>}></Route>
          <Route path="summary" element={<DashboardSummary/>}></Route>
          <Route path="analytics" element={<DashboardAnalutics></DashboardAnalutics>}></Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
