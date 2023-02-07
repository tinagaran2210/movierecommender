import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import MovieList from './MovieList';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginForm} />
      <Route path="/movies" component={MovieList} />
    </Router>
  );
}

export default App;
