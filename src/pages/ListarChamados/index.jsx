import { useEffect, useState } from 'react';
import CardChamado from '../../components/CardChamado';
import { useAuth } from '../../contexts/AuthContext';

export default function ListarChamados() {
  useEffect(() => {
    async function fetchChamados() {
      // primeiro fazer validação do token

      const response = await fetch('http://localhost:3001/chamados');
      const data = await response.json();
      setChamados(data);
    }
    fetchChamados();
  }, []);

  const [chamados, setChamados] = useState([]);
  // para validar depois
  const { token } = useAuth();

  return (
    <div className="container">
      <h1>Listar Chamados</h1>
      {chamados.length > 0 ? (
        <ul>
          {chamados.map((chamado) => (
            <CardChamado
              className="list-group-item mb-2"
              key={chamado.id}
              chamado={chamado}
            />
          ))}
        </ul>
      ) : (
        'Nenhum chamado encontrado.'
      )}
    </div>
  );
}
