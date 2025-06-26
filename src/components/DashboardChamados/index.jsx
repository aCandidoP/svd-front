import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

export default function DashboardChamados() {
  const [status, setStatus] = useState({});

  // 'NOVO', 'EM_ATENDIMENTO', 'SOLUCIONADO', 'FECHADO'

  const { token } = useAuth();
  const fetchStatusCounts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chamados/contagem_por_status`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Erro: ', error);
    }
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchStatusCounts();
    }
    // Cleanup function to avoid memory leaks
    return () => {
      isMounted = false;
    };
  }, [fetchStatusCounts]);
  return (
    <div
      className="container d-flex justify-content-center  flex-column"
      style={{ height: 'calc(100vh - 66px)' }}
    >
      <div className="d-flex pt-2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-info-circle text-secondary"></i>
          <span className="fw-bolder text-secondary">Chamados</span>
        </div>

        <Link
          to="/novo-chamado"
          className="pe-4 ps-4 me-2 text-secondary text-decoration-none border rounded"
        >
          + Novo Chamado
        </Link>
      </div>
      <Link to={`/consultar-chamados?status=AGUARDANDO`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-check-lg"></i>
            Chamados aguardando sua aprovação
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.AGUARDANDO || 0}
          </div>
        </div>
      </Link>
      <Link to={`/consultar-chamados?status=NOVO`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-circle-fill text-success"></i>
            Novo
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.NOVO || 0}
          </div>
        </div>
      </Link>
      <Link to={`/consultar-chamados?status=EM_ATENDIMENTO`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-circle text-success"></i>
            Em atendimento
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.EM_ATENDIMENTO || 0}
          </div>
        </div>
      </Link>
      <Link to={`/consultar-chamados?status=PENDENTE`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-circle-fill text-warning"></i>
            Pendente
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.PENDENTE || 0}
          </div>
        </div>
      </Link>
      <Link to={`/consultar-chamados?status=SOLUCIONADO`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-circle"></i>
            Solucionado
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.SOLUCIONADO || 0}
          </div>
        </div>
      </Link>
      <Link to={`/consultar-chamados?status=FECHADO`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-circle-fill"></i>
            Fechado
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.FECHADO || 0}
          </div>
        </div>
      </Link>
      <Link to={`/consultar-chamados?status=EXCLUIDO`}>
        <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border hover">
          <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
            <i className="bi bi-trash3-fill text-danger"></i>
            Excluído
          </div>
          <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
            {status.EXCLUIDO || 0}
          </div>
        </div>
      </Link>
    </div>
  );
}
