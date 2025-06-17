import { useEffect, useState } from 'react';
import CardChamado from '../../components/CardChamado';
import Paginacao from '../../components/Paginacao';
import { useAuth } from '../../contexts/AuthContext';

export default function ListarChamados() {
  const [chamados, setChamados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [perPage, setPerPage] = useState(5);
  // para validar depois
  const { token } = useAuth();

  useEffect(() => {
    async function fetchChamados() {
      // primeiro fazer validação do token

      const response = await fetch('http://localhost:3001/chamados');
      const data = await response.json();
      setChamados(data);
    }

    fetchChamados();
  }, []);

  useEffect(() => {
    // preparando para paginacao
    async function fetchPaginated() {
      try {
        const response = await fetch(
          `http://localhost:5000/chamado?page=${page}&per_page=${perPage}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        // ver retorno correto da api
        setChamados(data.pagination_metadata.page);
        setTotalPages(data.pagination_metadata.total_pages);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(perPage);
    console.log(page);
  }, [perPage, page]);

  return (
    <div className="container">
      <h1>Listar Chamados</h1>
      {chamados.length > 0 ? (
        <div className="container">
          <ul>
            {chamados.map((chamado) => (
              <CardChamado
                className="list-group-item mb-2"
                key={chamado.id}
                chamado={chamado}
              />
            ))}
          </ul>
          <Paginacao
            setPerPage={setPerPage}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      ) : (
        'Nenhum chamado encontrado.'
      )}
    </div>
  );
}
