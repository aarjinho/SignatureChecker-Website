import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Acceuil from './components/Home'
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardHome from './components/AdminDashboardHome';
import AdminDashboardSearch from './components/AdminDashboardSearch';
import Login from './components/Login'
import AddStudent from './components/AddStudent'



function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<Acceuil/>} />
          <Route path="acceuil" element={<Acceuil/>} />
          <Route path="admindashboard" element={<AdminDashboard/>}>
          <Route path="" element={<AdminDashboardHome/>} />
          <Route path="search" element={<AdminDashboardSearch/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="addstudent" element={<AddStudent/>}/>
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
