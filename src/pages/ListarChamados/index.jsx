import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardChamado from '../../components/CardChamado';
import Paginacao from '../../components/Paginacao';
import Spinner from '../../components/spinner';
import { useAuth } from '../../contexts/AuthContext';
import { validTokenDecoded } from '../../helpers/decode';

export default function ListarChamados() {
  const [loading, setLoading] = useState(false);
  const [chamados, setChamados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [perPage, setPerPage] = useState(5);
  const [status, setStatus] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const { token, logout } = useAuth();
  const [searchParams] = useSearchParams();
  // pega o parametro status da url
  const statusParam = searchParams.get('status');

  const listStatus = useMemo(
    () => [
      'NOVO',
      'EM_ATENDIMENTO',
      'SOLUCIONADO',
      'FECHADO',
      'PENDENTE',
      'EXCLUIDO',
      'AGUARDANDO',
    ],
    []
  );

  const getChamadosPaginados = useCallback(async () => {
    try {
      setLoading(true);
      setHasFetched(false);
      const response = await fetch(
        `http://localhost:5000/chamados/paginados/${status}?page=${page}&per_page=${perPage}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setChamados(data.chamados || []);
      setPage(data.pagination_metadata?.page || 1);
      setTotalPages(data.pagination_metadata?.total_pages || 1);
      setHasFetched(true);
    } catch (error) {
      console.error(error);
      setChamados([]);
      setHasFetched(true);
    } finally {
      setLoading(false);
    }
  }, [perPage, page, token, status]);

  useEffect(() => {
    // verifica se o status já foi definido, se não força a definição
    if (status === null) {
      const initialStatus =
        statusParam && listStatus.includes(statusParam) ? statusParam : 'NOVO';
      setStatus(initialStatus);
    }
  }, [statusParam, status, listStatus]);

  useEffect(() => {
    let isMounted = true;
    if (!validTokenDecoded(token)) {
      logout();
      return;
    }
    async function fetchData() {
      if (isMounted && status !== null) {
        await getChamadosPaginados();
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [getChamadosPaginados, token, logout, status]);

  if (status === null) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <h1>Listar Chamados</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <select
            name="status"
            id="status"
            className="form-select mb-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {listStatus.map((statusOption, index) => (
              <option value={statusOption} key={index}>
                {statusOption}
              </option>
            ))}
          </select>

          {!hasFetched ? (
            <Spinner />
          ) : chamados.length > 0 ? (
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
            <div className="alert alert-info">
              Nenhum chamado encontrado para o status {status}.
            </div>
          )}
        </>
      )}
    </div>
  );
}
