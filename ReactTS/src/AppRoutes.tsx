import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

export function AppRoutes(){
  return(
    <Router>
      <Routes>
        <Route path='/home' element={ <Home />} />
        <Route path='/about-us' element={ <AboutUs />} />
      </Routes>
    </Router>
  )    
}
