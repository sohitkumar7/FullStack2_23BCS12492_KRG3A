import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CircularProgress, Box } from '@mui/material';
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Code splitting - Lazy load components for better performance
// This reduces initial bundle size and improves load time
const Login = lazy(() => import('./pages/login'));
const DashboardLayout = lazy(() => import('./pages/DashboardLayout'));
const DashboardSummary = lazy(() => import('./pages/dashboardSummary'));
const DashboardAnalutics = lazy(() => import('./pages/DashboardAnalutics'));

// Suspense fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
);

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardSummary />} />
            <Route path="summary" element={<DashboardSummary />} />
            <Route path="analytics" element={<DashboardAnalutics />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

