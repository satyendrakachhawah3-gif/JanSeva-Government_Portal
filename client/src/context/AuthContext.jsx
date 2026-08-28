import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('janseva_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.get('/auth/me');
        if (res.data.success) {
          setUser(res.data.user);
          setProfile(res.data.profile);
        }
      } catch (err) {
        console.error('[Auth] Session fetch failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success) {
      localStorage.setItem('janseva_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setProfile(res.data.profile);
    }
    return res.data;
  };

  const register = async (userData) => {
    const res = await API.post('/auth/register', userData);
    if (res.data.success) {
      localStorage.setItem('janseva_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setProfile(res.data.profile);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('janseva_token');
    setToken('');
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (profileData) => {
    const res = await API.put('/auth/profile', profileData);
    if (res.data.success) {
      setProfile(res.data.profile);
    }
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        loading,
        role: user ? user.role : 'GUEST',
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
