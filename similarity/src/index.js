import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MovieList from './MovieList';
import MovieDisplay from './MovieDisplay';
import RatingList from './RatingList';
import SignUpForm from './SignUpForm';
import Similarity from './Similarity';
import LoginForm from './LoginForm';
import SimilarMovies from './SimilarMovies';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<MovieList />
//<SignUpForm />
//<LoginForm />
//<RatingList />
//<Similarity />
//<SimilarMovies />
//<App />


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
