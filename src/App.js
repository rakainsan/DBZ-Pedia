import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Planet from './pages/Planet';
import PlanetDetail from './pages/PlanetDetail';
import Comparison from './pages/Comparison';
import Profile from './pages/Profile';
import CharacterDetail from './pages/CharacterDetail';
import { register as registerServiceWorker } from './serviceWorker';

const App = () => {
  const queryClient = new QueryClient();

  React.useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/planet" element={<Planet />} />
          <Route path="/planet/:id" element={<PlanetDetail />} />
          <Route path="/compare" element={<Comparison />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
        <BottomNav />
      </Router>
    </QueryClientProvider>
  );
};

export default App;