import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserIdJwt, validTokenDecoded } from '../../helpers/decode';
import './style.css';

function Header(props) {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const { token, logout } = useAuth();

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/usuarios/${getUserIdJwt(token)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }, [token]);

  useEffect(() => {
    const isTokenValid = token && token !== null && validTokenDecoded(token);
    const storedToken = localStorage.getItem('token');
    const isLoggedIn = storedToken && storedToken === token && isTokenValid;
    const fetchUser = async () => {
      await getUser();
    };
    setHasLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      fetchUser();
    }
    if (!isTokenValid && storedToken) {
      logout();
    }
  }, [token, logout, getUser]);

  const handleLogout = () => {
    logout();
    setHasLoggedIn(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container className="justify-content-between">
        <Link to="/" className="navbar-brand">
          {/* idoo */}
          <img
            src="/logo-s-fundo.svg"
            alt=""
            style={{ width: '40px', height: '40px' }}
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {hasLoggedIn ? (
            <>
              <Nav className="me-auto d-flex ms-auto">
                <Link to="/novo-chamado" className="nav-link">
                  Novo chamado
                </Link>
                <Link to="/consultar-chamados" className="nav-link">
                  Consultar chamados
                </Link>
              </Nav>
              <NavDropdown
                title={user.email}
                id="basic-nav-dropdown"
                className=""
              >
                {user.perfil_id === 1 && (
                  <Link to="/registrar" className="dropdown-item">
                    Registrar
                  </Link>
                )}
                <Link to="/perfil" className="dropdown-item">
                  Perfil
                </Link>
                <Link to="/configuracoes" className="dropdown-item">
                  Configurações
                </Link>
                <NavDropdown.Divider />
                <Link to="/ajuda" className="dropdown-item">
                  Ajuda
                </Link>
              </NavDropdown>
              <Link
                to="/"
                onClick={handleLogout}
                className="nav-link"
                style={{ marginLeft: '10px' }}
              >
                Sair
              </Link>
            </>
          ) : (
            <Nav className="me-auto d-flex ms-auto">
              <Link to="/login" className="nav-link">
                Entrar
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
