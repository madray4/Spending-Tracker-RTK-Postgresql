import { Link } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import './css/Navbar.css'

import { logout } from '../store/auth/authSlice'

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Spending Tracker</h1>
        </Link>
        <nav>
          {user && (
            <div className='nav-routes'>
              <span>{user.email}</span>
              <Link to="/add-entry"><button>Create</button></Link>
              <button onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className = 'nav-routes'>
              <Link to="/login"><button>Log in</button></Link>
              <Link to="/signup"><button>Sign Up</button></Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
};

export default NavBar;