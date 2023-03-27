import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Acceuil from './pages/Acceuil'
import Analytics from './pages/Analytics';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Side from './component/Side';
import Search from './pages/Search';
import Promo from './pages/Promo';


function App() {
  return (
    <BrowserRouter>
      <ProSidebarProvider>
        <Side/>
        <Routes>
          <Route path="" element={<Analytics/>} />
          <Route path="/Acceuil" element={<Acceuil/>} />
          <Route path="/Search" element={<Search/>}/>
          <Route path="/Promo" element={<Promo/>}/>
        </Routes>
      </ProSidebarProvider>
    </BrowserRouter>
  );
}

export default App;
