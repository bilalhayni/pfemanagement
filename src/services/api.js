import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth');
      Cookies.remove('role');
      Cookies.remove('userId');
      Cookies.remove('filId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== Auth Services ====================
export const authService = {
  login: (email, password) => api.post('/login', { email, password }),
  logout: () => api.post('/logout'),
  register: (data) => api.post('/registerStudent', data),
  resetPassword: (email) => api.post('/reset-password-email', { email })
};

// ==================== Filiere Services ====================
export const filiereService = {
  getAll: () => api.get('/filiere'),
  create: (name) => api.post('/addFiliere', { name })
};

// ==================== Prerequisite Services ====================
export const prerequisiteService = {
  getAll: () => api.get('/prerequi'),
  getByFiliere: (filiereId) => api.get(`/prerequisFil/${filiereId}`),
  create: (data) => api.post('/addPrerequi', data)
};

// ==================== Domain Services ====================
export const domainService = {
  getByFiliere: (filiereId) => api.get(`/domaineFil/${filiereId}`),
  create: (data) => api.post('/addDomaine', data)
};

// ==================== Profile Services ====================
export const profileService = {
  get: (userId) => api.get(`/profile/${userId}`),
  getStudent: (userId) => api.get(`/profileStd/${userId}`),
  update: (data) => api.put('/updateProfile', data)
};

// ==================== Professor Services ====================
export const professorService = {
  getByFiliere: (filiereId) => api.get(`/prof/${filiereId}`),
  getAll: () => api.get('/allProf'),
  getCount: () => api.get('/numProf'),
  getCountByFiliere: (filiereId) => api.get(`/numProfChedDep/${filiereId}`)
};

// ==================== Chef Departement Services ====================
export const chefDepService = {
  getAll: () => api.get('/allChefDep'),
  getCount: () => api.get('/numChefDep')
};

// ==================== Student Services ====================
export const studentService = {
  getByFiliere: (filiereId) => api.get(`/stdListe/${filiereId}`),
  getPending: () => api.get('/stdListe'),
  getActivated: () => api.get('/stdListeAct'),
  getCount: () => api.get('/numStd'),
  getCountByFiliere: (filiereId) => api.get(`/numStdChedDep/${filiereId}`),
  getPrerequisites: (userId) => api.get(`/prerequisStd/${userId}`),
  activate: (id) => api.put('/validStd', { id }),
  delete: (id) => api.delete(`/deleteUser/${id}`)
};

// ==================== Admin Services ====================
export const adminService = {
  createAccount: (data) => api.post('/adminCreate', data)
};

// ==================== PFE Services ====================
export const pfeService = {
  // Create
  create: (data) => api.post('/newPfe', data),

  // Read
  getMyPfes: (profId) => api.get(`/myPfe/${profId}`),
  getAllByFiliere: (filiereId) => api.get(`/allPfe/${filiereId}`),
  getAllForStudents: (filiereId) => api.get(`/allPfeStd/${filiereId}`),
  getSingle: (pfeId) => api.get(`/SinglePfe/${pfeId}`),
  getPrerequisites: (pfeId) => api.get(`/prerequisPfe/${pfeId}`),
  getCountByFiliere: (filiereId) => api.get(`/numPfe/${filiereId}`),
  getCountByProf: (profId) => api.get(`/numPfeProf/${profId}`),

  // Update
  update: (data) => api.put('/updatePfe', data),
  updateProgress: (id, avancement) => api.put('/updateavan', { id, avancement }),
  updateDefenseDate: (id, date) => api.put('/updateDateSout', { id, date }),

  // Delete
  delete: (pfeId) => api.delete(`/deletePfe/${pfeId}`)
};

// ==================== Demande Services ====================
export const demandeService = {
  // Create
  create: (data) => api.post('/addDemande', data),

  // Read
  getByProf: (profId) => api.get(`/demandes/${profId}`),
  getStudentPfes: (profId) => api.get(`/stdPfe/${profId}`),
  getStudentApplications: (userId) => api.get(`/pfeOfStd/${userId}`),
  getStudentAssignedPfe: (userId) => api.get(`/MypfeOfStd/${userId}`),

  // Update
  approve: (id) => api.put('/affectPfe', { id }),

  // Delete
  delete: (demandeId) => api.delete(`/deleteDemande/${demandeId}`)
};

// ==================== Stats Services ====================
export const statsService = {
  // Dashboard stats
  getDashboard: (filiereId) => api.get(`/stats/dashboard/${filiereId}`),

  // Chart data
  getProfChart: () => api.get('/profChart'),
  getChefPfeProgress: (profId) => api.get(`/chefDepadv/${profId}`),
  getAllPfeProgress: (filiereId) => api.get(`/chefDepadvAll/${filiereId}`),

  // Count endpoints
  getDomainCount: (filiereId) => api.get(`/numDomaines/${filiereId}`)
};

export default api;
