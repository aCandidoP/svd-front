import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './style.css';

function Header(props) {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const { token, logout } = useAuth();

  useEffect(() => {
    /**
     * TODO: fazer validação do token fazendo requisição para o backend
     */
    const storedToken = localStorage.getItem('token') === token ? token : null;
    // isso daqui tem brecha mas depois eu arrumo isso
    if (storedToken && storedToken !== 'null') {
      setHasLoggedIn(true);
    } else {
      setHasLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    setHasLoggedIn(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container className="justify-content-between">
        <Link to="/" className="navbar-brand">
          idoo
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
              <NavDropdown title="Usuário" id="basic-nav-dropdown" className="">
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
              <Link to="/registrar" className="nav-link">
                Registrar
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
