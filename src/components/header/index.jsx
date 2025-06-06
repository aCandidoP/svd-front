import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './header.css';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container className="justify-content-between">
        <Navbar.Brand href="#home">idoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex ms-auto">
            <Nav.Link href="#link">Novo chamado</Nav.Link>
            <Nav.Link href="#link">Consultar chamados</Nav.Link>
          </Nav>
          {/* só aparece se tiver logado */}
          <NavDropdown title="Usuário" id="basic-nav-dropdown" className="">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#link" className="" style={{ marginLeft: '10px' }}>
            Sair
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
