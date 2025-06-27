import { useCallback, useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Registrar(props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:5000/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: password,
          organizacao_id: 1,
          perfil_id: 2,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.erro);
        return;
      }
      navigate('/');
    },
    [email, password, nome, token, navigate]
  );

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
            <Form.Group className="mb-2" controlId="formBasicName">
              <Form.Label>Nome: </Form.Label>
              <Form.Control
                value={nome}
                type="text"
                placeholder="Nome"
                onChange={(event) => setNome(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                value={email}
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Senha: </Form.Label>
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
              className="p-2 mt-1"
              onClick={handleSubmit}
            >
              Registrar novo usuário
            </Button>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
