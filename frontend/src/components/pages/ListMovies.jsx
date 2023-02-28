import React, {Component} from 'react'
import MovieService from '../../services/MovieService'

import '../../css/admin.css'

class ListMovies extends Component {


    constructor(props){

        super(props)

        this.state = {
            movies: [], //Creating a movie array
            username: localStorage.getItem('username') //Getting the current user username
        }

        this.deleteMovie = this.deleteMovie.bind(this); //To bind the function delete movie to the render call
    }

    //Function delete movie by passing movie object into it
    deleteMovie(movie){

        //Api call to delete movie, then if success display the alert and reload the page to show changes
        MovieService.deleteMovie(movie).then(() =>{
            alert('Movie Deleted')
            window.location.reload();
            
            //Catching error and display it in the console
        }).catch(error =>{
                console.log(error)
        })

    }

    //On page load we run the api call to get all the movie and save it into the movie object
    componentDidMount(){
        MovieService.getAllMovie().then((res) => {
            this.setState({ movies: res.data});
        });
    }

    render(){
        return (
            <div>
                <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    <a class="navbar-brand" href="/Dashboard">Admin</a>
                    <a class="navbar-logout" href="/">Logout</a>
                </nav>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div class="sb-sidenav-menu">
                                <div class="nav">
                                    <div class="sb-sidenav-menu-heading">Core</div>
                                    <a class="nav-link" href="/Dashboard">
                                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                        Dashboard
                                    </a>
                                    <div class="sb-sidenav-menu-heading">Functionality</div>
                                    
                                    <a class="nav-link collapsed" href="/AddMovie" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                        Add Movie
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                    <a class="nav-link collapsed" href="/ListMovies" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                        View Movies
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                    <a class="nav-link collapsed" href="/ListUser" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                        View Users
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                </div>
                            </div>
                            <div class="sb-sidenav-footer">
                                <div class="large">Logged in as:</div>
                                {this.state.username}
                            </div>
                        </nav>
                    </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid">
                            <h1 class="mt-4">List of Movies</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Promote or Delete Movies</li>
                            </ol>
                                <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table mr-1"></i>
                                    Movies
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Movie ID</th>
                                                    <th>Title</th>
                                                    <th>Genre</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    //Mapping each row of object movies into the display
                                                    this.state.movies.map(
                                                        movie =>
                                                        <tr key = {movie.movieid}>
                                                            <td>{movie.movieid}</td>
                                                            <td>{movie.title}</td>
                                                            <td>{movie.genres}</td>                                                        
                                                            <td>
                                                                <button 
                                                                    //Calling delete movie functino when clicked on
                                                                    onClick={ () => this.deleteMovie(movie)}
                                                                    style={{
                                                                            color: "white",
                                                                            backgroundColor: "red",
                                                                        }}
                                                                >Delete</button>
                                                            </td> 
                                                                      
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Tinagaran 2023</div>
                            </div>
                        </div>
                    </footer>
                </div>
                </div>
            
            </div>
        ) 
    }
}

export default ListMovies;