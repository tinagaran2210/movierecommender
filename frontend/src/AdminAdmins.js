import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './adminusers.css';

const Admintable = () => {

  const adminname = localStorage.getItem("adminname");
  const [admins, setadmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage, setadminsPerPage] = useState(10);
   const [query, setQuery] = useState("");
   const [filteredadmins, setFilteredadmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const adminResponse = await fetch("http://localhost:8080/api/user/getAdmins");
      const adminResult = await adminResponse.json();

      setadmins(adminResult);
    };
    fetchData();
  }, []);

  useEffect(() => {
        setFilteredadmins(
          admins.filter((admin) => admin.ADMINNAME.toLowerCase().includes(query.toLowerCase()))
        );
        setCurrentPage(1);
      }, [query, admins]);

  const indexOfLastadmin = currentPage * adminsPerPage;
  const indexOfFirstadmin = indexOfLastadmin - adminsPerPage;
  const currentadmins = admins.slice(indexOfFirstadmin, indexOfLastadmin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentadminss = filteredadmins.slice(indexOfFirstadmin, indexOfLastadmin);

  return (

      <div>
      <div className="menu-bar">

            <ul>
              <li>
                <input type="text" placeholder="Search admins here" value={query} onChange={(e) => setQuery(e.target.value)} />
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
              <th>Admins</th>
            </tr>
          </thead>
          <tbody>
            {currentadminss.map((admin) => (
              <tr key={admin.ID}>
                <td>{admin.ADMINNAME}</td>
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
            <li className={`page-item ${currentPage === Math.ceil(admins.length / adminsPerPage) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
                </button>
            </li>
            <br/>
                    <button className="add-button"
                         onClick={() => {
                           window.location.href = "/add-admins";
                         }}
                       >
                         Add Admins
                         </button>
            </ul>

           </nav>

           </div>
    );

};


export default Admintable;
