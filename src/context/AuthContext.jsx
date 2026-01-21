import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService, profileService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User roles
  const ROLES = {
    PROFESSOR: 0,
    CHEF_DEPARTEMENT: 1,
    STUDENT: 2,
    ADMIN: 3
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const authToken = Cookies.get('auth');
      const userRole = Cookies.get('role');
      const userId = Cookies.get('userId');
      const filiereId = Cookies.get('filId');

      if (authToken && userId) {
        try {
          // Fetch user profile from backend
          const response = await profileService.get(userId);
          if (response.data) {
            setUser({
              id: parseInt(userId),
              role: parseInt(userRole),
              idFiliere: parseInt(filiereId),
              ...response.data
            });
          }
        } catch (error) {
          // If profile fetch fails, use cookie data
          setUser({
            id: parseInt(userId),
            role: parseInt(userRole),
            idFiliere: parseInt(filiereId)
          });
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      // Backend returns user object directly on success
      if (response.data && response.data.id) {
        const userData = response.data;

        // Store in cookies
        Cookies.set('auth', 'true', { expires: 1 });
        Cookies.set('role', userData.role.toString(), { expires: 1 });
        Cookies.set('userId', userData.id.toString(), { expires: 1 });
        Cookies.set('filId', userData.idFiliere?.toString() || '', { expires: 1 });

        setUser({
          id: userData.id,
          role: userData.role,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          idFiliere: userData.idFiliere
        });

        return { success: true, role: userData.role };
      }

      // Backend returns { message: "error" } on failure
      return {
        success: false,
        error: response.data?.message || 'Mauvaise combinaison email/mot de passe!'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue';

      // Handle specific error cases
      if (error.response?.status === 401) {
        return { success: false, error: 'Mauvaise combinaison email/mot de passe!' };
      }
      if (error.response?.status === 403) {
        return { success: false, error: "Votre compte n'a pas encore été activé" };
      }

      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      // Backend returns { message: "success" } or { message: "error" }
      if (response.status === 201 || response.data?.userId) {
        return { success: true };
      }

      return {
        success: false,
        error: response.data?.message || "Une erreur est survenue lors de l'inscription"
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription";

      if (error.response?.status === 400) {
        return { success: false, error: errorMessage };
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Continue with logout even if API call fails
    }

    Cookies.remove('auth');
    Cookies.remove('role');
    Cookies.remove('userId');
    Cookies.remove('filId');
    setUser(null);
  };

  const resetPassword = async (email) => {
    try {
      const response = await authService.resetPassword(email);

      if (response.data?.message === 'Password sent to your email') {
        return { success: true };
      }

      return { success: true }; // Assume success if no error
    } catch (error) {
      if (error.response?.status === 404) {
        return { success: false, error: "Cet email n'est pas enregistré" };
      }
      return { success: false, error: "Erreur lors de l'envoi du mot de passe" };
    }
  };

  const isAuthenticated = () => !!user && !!Cookies.get('auth');
  const hasRole = (role) => user?.role === role;

  const getRedirectPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case ROLES.PROFESSOR: return '/prof/home';
      case ROLES.CHEF_DEPARTEMENT: return '/';
      case ROLES.STUDENT: return '/student/home';
      case ROLES.ADMIN: return '/admin/home';
      default: return '/login';
    }
  };

  return (
    <AuthContext.Provider value={{
      user, loading, login, logout, register, resetPassword,
      isAuthenticated, hasRole, getRedirectPath, ROLES
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
