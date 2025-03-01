import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/profile" />
      </Routes>
    </>
  );
};

export default App;


