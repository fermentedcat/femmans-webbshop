import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import Container from '@mui/material/Container'
import { AdminPage } from './pages/AdminPage';
import {Navbar} from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <Container>
      <Navbar />
      <Switch>
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </Container>
  );
} 

export default App;
