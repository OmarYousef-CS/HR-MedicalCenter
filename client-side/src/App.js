import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './pages/AdminPages/AdminPage'
import EditClassResponsible from './pages/AdminPages/classAdminPages/editClassResponsible';
import UserPage from './pages/UserPages/UserPage'
import AdminLogin from './pages/loginPages/AdminLogin'
import ClassResponsibleLogin from './pages/loginPages/ClassResponsibleLogin'
import AddSurvey from './pages/UserPages/AddSurvey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"      element={<AdminPage/>} />
        <Route path="/classResponsible/:id"      element={<EditClassResponsible/>} /> 
        <Route path="/user/:id"      element={<UserPage/>} />
        <Route path="/user/:userId/addSurvey/:id"      element={<AddSurvey/>} />
        <Route path="/admin-login"    element={<AdminLogin/>} />
        <Route path="/classResponsible-login"    element={<ClassResponsibleLogin/>} />
      </Routes>
  </Router>
  )
}

export default App;
