import './App.css';
import './css/style.css'
import { BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';

import ListMovies from './components/pages/ListMovies';
import AddMovie from './components/pages/AddMovie';
import SignUp from './components/pages/Signup';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import ListUser from './components/pages/ListUser';
import ViewMovie from './components/pages/ViewMovie';
import MovieDetails from './components/pages/MovieDetails';
import FavMovies from './components/pages/FavMovies';


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            
            <Route path = "/" element = {<Login/>}> </Route>
            <Route path = "/AddMovie" element = {<AddMovie/>}> </Route>
            <Route path = "/SignUp" element = {<SignUp/>}> </Route>
            <Route path = "/Login" element = {<Login/>}> </Route>
            <Route path = "/Dashboard" element = {<Dashboard/>}> </Route>                
            <Route path = "/ListMovies" element={<ListMovies/>}> </Route>       
            <Route path = "/ListUser" element={<ListUser/>}> </Route>      
            <Route path = "/ViewMovie" element={<ViewMovie/>}> </Route> 
            <Route path = "/MovieDetails/:id" element={<MovieDetails/>}> </Route> 
            <Route path = "/FavMovies" element={<FavMovies/>}></Route> 

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
