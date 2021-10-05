import './App.css';
import {Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <>
    <div>Hej</div>
    <Switch >
      <Route path="/admin" component={}>
        <TestComponent />
      </Route>
    </Switch>
    </>
  );
} 

export default App;
