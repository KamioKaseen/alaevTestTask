import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import InitialPage from './pages/InitialPage';
import LoginPage from './pages/LoginPage';
import AuthRoute from './components/AuthRoute';
import AuthProvider from './context/authContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<InitialPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route 
          path="/profile" 
          element={
            <AuthRoute>
              <p>Прувет</p>
            </AuthRoute>
          }/>
      </Routes>
    </AuthProvider>
  );
};

export default App;


