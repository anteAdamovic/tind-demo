import { Button } from '@mui/material';
import './App.css';
import SearchFilters from './components/SearchFilters';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <a href="#">Språk</a>
          <a href="#">Innstillinger</a>
          <a href="#">Om</a>
          <a href="#">Kontakt</a>
        </nav>
        <div className="login-button-wrapper">
          <Button className="login-button" variant="outlined">LOG IN</Button>
        </div>
      </header>
      <SearchFilters/>
    </div>
  );
}

export default App;
