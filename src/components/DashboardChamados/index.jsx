import { Link } from 'react-router-dom';

export default function DashboardChamados() {
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
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-check-lg"></i>
          Chamados aguardando sua aprovação
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-circle-fill text-success"></i>
          Novo
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-circle text-success"></i>
          Em atendimento
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-circle-fill text-warning"></i>
          Pendente
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-circle"></i>
          Solucionado
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-circle-fill"></i>
          Fechado
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
      <div className="d-flex pt=2 pb-2 align-items-center justify-content-between border">
        <div className="d-flex justify-content-center align-items-center gap-1 ms-2">
          <i className="bi bi-trash3-fill text-danger"></i>
          Excluído
        </div>
        <div className="me-2 ps-2 pe-2 bg-secondary rounded text-white mt-2">
          0
        </div>
      </div>
    </div>
  );
}
