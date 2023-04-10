import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Acceuil from './components/Home'
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardHome from './components/AdminDashboardHome';
import AdminDashboardSearch from './components/AdminDashboardSearch';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<Acceuil/>} />
          <Route path="acceuil" element={<Acceuil/>} />
          <Route path="admindashboard" element={<AdminDashboard/>}>
            <Route path="" element={<AdminDashboardHome/>} />
            <Route path="search" element={<AdminDashboardSearch/>} />
          </Route>

          
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
