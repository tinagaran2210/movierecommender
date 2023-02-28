import React from 'react'

import '../../css/admin.css'

class Dashboard extends React.Component
{
    constructor(props){

        super(props)

        this.state = {
            username: localStorage.getItem('username'), //Getting current user username
        };

    }

  
    render()
    {
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
                                
                                <a class="nav-link collapsed" href="/AddMovie" data-toggle="collapse" aria-expanded="false" aria-controls="collapsePages">
                                    <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                    Add Movie
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <a class="nav-link collapsed" href="/ListMovies" data-toggle="collapse" aria-expanded="false" aria-controls="collapsePages">
                                    <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                    View Movies
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <a class="nav-link collapsed" href="/ListUser" data-toggle="collapse" aria-expanded="false" aria-controls="collapsePages">
                                    <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                    View Users
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                            </div>
                        </div>
                        <div class="sb-sidenav-footer">
                            <div class="large">Logged in as:</div>
                            {/* Displaying current user username */}
                            {this.state.username}
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid">
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active"><h4>Hi {this.state.username}!</h4></li>
                            </ol>
                            <div class="row">
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-dark text-white mb-4">
                                        <a class="small text-white stretched-link" href="/AddMovie">
                                            <div class="card-body"><center><h2>Add Movie</h2></center></div>
                                        </a>
                                        <div class="card-footer d-flex align-items-center justify-content-between"/>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-dark text-white mb-4">
                                        <a class="small text-white stretched-link" href="/ListUser">
                                            <div class="card-body"><center><h2>View Users</h2></center></div>
                                        </a>
                                        <div class="card-footer d-flex align-items-center justify-content-between"/>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-dark text-white mb-4">
                                        <a class="small text-white stretched-link" href="/ListMovies">
                                            <div class="card-body"><center><h2>List of Users</h2></center></div>
                                        </a>
                                        <div class="card-footer d-flex align-items-center justify-content-between"/>
                                    </div>
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
)   } }
 export default Dashboard;