import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
       <div className="main-container">
        <div className="nav-container">
          <div>
            <h1>Expense Tracker</h1>
          </div>
          <div className="nav-link">
            <ul>
              <li>
                <NavLink to="/" className="links">
                  Home
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink className="links" to="/add-expense">
                  Add Expense
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <NavLink className="links" to="" onClick={logout}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
  );
}