import '../../css/admin.css'

//Navbar function to redirecting
function Navbar({ search, setSearch }) {

  return (
    <div>
      <div>
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="/ViewMovie">MooVie</a>
            <a class="navbar-brand" href="/FavMovies">Favourites</a>
            
            <a class="navbar-logout" href="/">Logout</a>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
