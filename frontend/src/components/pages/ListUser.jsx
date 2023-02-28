import React, {Component} from 'react'
import UserService from '../../services/UserService'

import '../../css/admin.css'

class ListUser extends Component{

    constructor(props){

        super(props)

        this.state = {
            users: [], //Creating a user array
            username: localStorage.getItem('username') //Getting the current user username
        }

        this.promoteToAdmin = this.promoteToAdmin.bind(this); //To bind the function promoteToAdmin to the render call
        this.deleteUser = this.deleteUser.bind(this); //To bind the function delete user to the render call
    }

    //Function to promote a user to admin by passing the user object
    promoteToAdmin(user){

        //Api call to update the user to admin, show an alert that user is updated and refresh the page to show changes
        UserService.updateToAdmin(user).then((res) =>{
            alert('User Updated')
            window.location.reload();

            //Catching error from the back end side
        }).catch(error =>{
                console.log(error)
        })
    }

    //Function delete user
    deleteUser(user){

        //Api call to delete the user, show an alert that user is deleted and refresh the page to show changes
        UserService.delete(user).then((res) =>{
            alert('User Deleted')
            window.location.reload();

            //Catching error from the back end side
        }).catch(error =>{
                console.log(error)
        })
    }

    //Function to run when the page is load
    componentDidMount(){

        //Getting all the user from API call and store it into the users array
        UserService.getAll().then((res) => {
            this.setState({ users: res.data});
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
                                <div class="small">Logged in as:</div>
                                {this.state.username}
                            </div>
                        </nav>
                    </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid">
                            <h1 class="mt-4">List of Users</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Promote or Delete User</li>
                            </ol>
                                <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table mr-1"></i>
                                    Users
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    //Mapping each row of user into the display
                                                    this.state.users.map(
                                                        user =>
                                                        <tr key = {user.userid}>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            {
                                                                //Checking if the user type is 2, change it to User if 1 to Admin
                                                                user.type == 2 ?

                                                                user.type = "User"
                                                                :
                                                                user.type = "Admin"
                                                            }     
                                                            {
                                                                //Checking if the user type is User, show promote to admin and delete button
                                                                user.type == "User" ?
                                                                <td>
                                                                    <button 
                                                                        onClick={ () => this.deleteUser(user)}
                                                                        style={{
                                                                                color: "white",
                                                                                backgroundColor: "red",
                                                                                marginRight: "30px",
                                                                            }}
                                                                    >Delete</button>
                                                                    <button 
                                                                        onClick={ () => this.promoteToAdmin(user)}
                                                                        style={{
                                                                            color: "white",
                                                                            backgroundColor: "green",
                                                                        }}
                                                                    >Promote</button>
                                                                    
                                                                </td> 
                                                                :
                                                                //If the user type is admin only show the delete button
                                                                <td>
                                                                    <button 
                                                                        onClick={ () => this.deleteUser(user)}
                                                                        style={{
                                                                                color: "white",
                                                                                backgroundColor: "red",
                                                                            }}
                                                                    >Delete</button>
                                                                </td> 
                                                            }            
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
export default ListUser;