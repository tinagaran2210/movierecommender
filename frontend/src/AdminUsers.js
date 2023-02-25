import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './adminusers.css';

const Usertable = () => {

  const adminname = localStorage.getItem("adminname");
  const [users, setusers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setusersPerPage] = useState(10);
   const [query, setQuery] = useState("");
   const [filteredusers, setFilteredusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch("http://localhost:8080/api/user/getUsers");
      const userResult = await userResponse.json();

      setusers(userResult);
    };
    fetchData();
  }, []);

  useEffect(() => {
        setFilteredusers(
          users.filter((user) => user.USERNAME.toLowerCase().includes(query.toLowerCase()))
        );
        setCurrentPage(1);
      }, [query, users]);

  const indexOfLastuser = currentPage * usersPerPage;
  const indexOfFirstuser = indexOfLastuser - usersPerPage;
  const currentusers = users.slice(indexOfFirstuser, indexOfLastuser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentuserss = filteredusers.slice(indexOfFirstuser, indexOfLastuser);

  return (

      <div>
      <div className="menu-bar">

            <ul>
              <li>
                <input type="text" placeholder="Search users here" value={query} onChange={(e) => setQuery(e.target.value)} />
              </li>
              <li>
                <Link to="/admin-dashboard">Movies</Link>
              </li>
              <li>
                <Link to="/admin-user">Users</Link>
              </li>
              <li>
                <Link to="/admin-admins">Admins</Link>
              </li>
              <li>
                    <Link to="/admin-login">Logout ({adminname})</Link>
              </li>
            </ul>
          </div>
        <table>
          <thead>
            <tr>
              <th>Users</th>
            </tr>
          </thead>
          <tbody>
            {currentuserss.map((user) => (
              <tr key={user.ID}>
                <td>{user.USERNAME}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
            <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
                </button>
            </li>
            <br/>
                    <button className="add-button"
                         onClick={() => {
                           window.location.href = "/add-users";
                         }}
                       >
                         Add Users
                         </button>
            </ul>

           </nav>

           </div>
    );

};


export default Usertable;
