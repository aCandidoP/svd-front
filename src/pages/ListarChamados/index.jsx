import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardChamado from '../../components/CardChamado';
import Paginacao from '../../components/Paginacao';
import { useAuth } from '../../contexts/AuthContext';
import { validTokenDecoded } from '../../helpers/decode';

export default function ListarChamados() {
  const [chamados, setChamados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [perPage, setPerPage] = useState(5);
  // para validar depois
  const { token, logout } = useAuth();

  const navegate = useNavigate();

  useEffect(() => {
    if (!validTokenDecoded(token)) {
      logout();
    }
    async function fetchChamados() {
      // primeiro fazer validação do token

      const response = await fetch('http://localhost:5000/chamados', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setChamados(data);
    }

    // fetchChamados();
  }, []);

  // Paginacao
  useEffect(() => {
    if (!validTokenDecoded(token)) {
      logout();
      navegate('/');
      return;
    }
    // preparando para paginacao
    async function fetchPaginated() {
      try {
        const response = await fetch(
          `http://localhost:5000/chamados/paginados?page=${page}&per_page=${perPage}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        // ver retorno correto da api
        setChamados(data.chamados);
        setPage(data.pagination_metadata.page);
        setTotalPages(data.pagination_metadata.total_pages);
      } catch (error) {
        console.error(error);
      }
    }
    // console.log(perPage);
    // console.log(page);
    fetchPaginated();
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
