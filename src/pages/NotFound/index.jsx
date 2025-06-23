import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column"
      style={{
        paddingTop: 'auto',
        paddingBottom: 'auto',
        height: 'calc(100vh - 56px)',
      }}
    >
      <h1>404. Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to={'/'} className="btn btn-primary">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
