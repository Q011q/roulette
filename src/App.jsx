import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import University from './components/University';
import Profile from './components/Profile'; // Импорт профиля
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/university" element={<University />} />
        <Route path="/profile" element={<Profile />} /> {/* Новый маршрут */}
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;