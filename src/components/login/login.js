import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

function LoginForm() {
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Form>
          
        <Form.Group className="mb-3" controlId="formBasicUser">
          <Form.Control type="text" placeholder="Usuário" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Senha" />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-2'>
          Login
        </Button>

      </Form>
      </Container>
  );
}

export default LoginForm;