import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import InitialPage from './pages/InitialPage/InitialPage';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<InitialPage />}/>
        <Route path="/login" />
        <Route path="/profile" />
      </Routes>
    </>
  );
};

export default App;


