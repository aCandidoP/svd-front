import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { decodeJwt } from '../../helpers/decode';

import './Login.css';

function LoginForm(props) {
  const handleSubmit = async (event) => {
    console.log({ email, password });
    event.preventDefault();
    const response = await fetch('http://localhost:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: password,
      }),
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    props.setToken(data.token);
    console.log(data);
    decodeJwt();
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container fluid className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <div className="text-center mb-4">
            <Image
              src="/logo.png"
              fluid
              style={{ maxHeight: '130px' }}
              className="mb-0"
            />
          </div>

          <div className="text-center mt-0 mb-5">
            <p>Sistema de Gerenciamento de Chamados</p>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Control
                value={email}
                type="text"
                placeholder="Usuário"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={password}
                type="password"
                placeholder="Senha"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-25"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
