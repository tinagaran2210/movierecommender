import React, { useState } from 'react'
import MovieService from '../../services/MovieService'
import '../../css/admin.css'

//Page to add movie 
const AddMovie = () => {

    //Declare vairables
    const [title, setTITLE] = useState('') 
    const [genres, setGENRES] = useState('')
    const [poster, setPoster] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUsername] = useState(localStorage.getItem('username')) //Getting current user username

    //Function to save movie when click submit button
    const saveMovie = (e) =>{

        e.preventDefault(); //prevent page from loading on default

        const movie  = {title,genres,poster,description} //Creating a movie object that stores variables

        //Sending the movie object to axios post
        MovieService.createMovie(movie).then((response) => {

            alert('Movie Added')
            window.location.reload() //Reload the page to empty the form

        }).catch(error => {
            console.log(error)
        })
    }

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
                            {/* Displaying curent user username */}
                            {username}
                        </div>
                    </nav>
                </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4">Add Movie</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active"><h4>Enter The Movie Details</h4></li>
                        </ol>
                        <div class="row">
                            <div>
                                {/* Calling save movie function when submit the form */}
                                <form  onSubmit = {(e) => saveMovie(e)}>
                                <div className="Auth-form-content">
                                    <div className="form-group mt-3">
                                    <label>Movie Title</label>
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Avatar"
                                        type="text"
                                        value={title}
                                        onChange = {(e) => setTITLE(e.target.value) }
                                        required
                                    />
                                    </div>
                                    <div className="form-group mt-3">
                                    <label>Genres</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Action|Sci-fi"
                                        value={genres}
                                        onChange = {(e) => setGENRES(e.target.value) }
                                        required
                                    />
                                    </div>
                                    <div className="form-group mt-3">
                                    <label>Image</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Image Link Here"
                                        value={poster}
                                        onChange = {(e) => setPoster(e.target.value) }
                                        required
                                    />
                                    </div>
                                    <div className="form-group mt-3">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Movie Description"
                                        value={description}
                                        onChange = {(e) => setDescription(e.target.value) }
                                        required
                                    />
                                    </div>
                                    <div className="d-grid gap-2 mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div>Copyright &copy; Tinagaran 2023</div>
                        </div>
                    </div>
                </footer>
            </div>
            </div>
        
        </div>
    )
}

export default AddMovie