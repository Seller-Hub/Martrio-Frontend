import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Storefront from './pages/Storefront';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store/:sellerId/*" element={<Storefront />} />
      {/* add more routes as we grow */}
    </Routes>
  );
}