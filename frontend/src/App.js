import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthSuccess from './pages/AuthSuccess';
import VerifyEmail from './pages/VerifyEmail';
import UserProfile from './pages/UserProfile';
import MyAds from './pages/MyAds';
import Messages from './pages/Messages';
import SavedSearches from './pages/SavedSearches';
import Favorites from './pages/Favorites';
import ProfileSettings from './pages/ProfileSettings';
import PhoneVerification from './pages/PhoneVerification';
import EditProfile from './pages/EditProfile';
import ProfileVerify from './pages/ProfileVerify';
import TestLogin from './pages/TestLogin';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/create" element={<CreateProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test-login" element={<TestLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/success" element={<AuthSuccess />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              {/* Rent and Sell pages */}
              <Route path="/rent" element={<ProductsPage />} />
              <Route path="/sell" element={<ProductsPage />} />
              {/* User Profile with nested routes */}
              <Route path="/profile" element={<UserProfile />}>
                <Route path="my-ads" element={<MyAds />} />
                <Route path="messages" element={<Messages />} />
                <Route path="saved-searches" element={<SavedSearches />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="settings" element={<ProfileSettings />} />
                <Route path="phone" element={<PhoneVerification />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="verify" element={<ProfileVerify />} />
              </Route>
            </Routes>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
