import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import InitialPage from './pages/InitialPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<InitialPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/profile" />
      </Routes>
    </>
  );
};

export default App;


