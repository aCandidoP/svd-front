import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CardChamado({ chamado, className }) {
  const userEmail = useState(null);
  useEffect(() => {}, []);
  return (
    <div className={`${className}`}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-col gap-2">
              <div>{chamado.tipo.desc_tipo}</div>
              <div>{chamado.categoria.nome}</div>
            </div>
            <div>
              <div>{chamado.status}</div>
            </div>
          </div>
          <h4>{chamado.titulo}</h4>
          <p>{chamado.descricao}</p>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2 align-items-center">
              <div className="d-flex flex-column">
                <div>{chamado.usuario_nome}</div>
                {/* <div>{chamado.usuario.email}</div> */}
              </div>
              <div>{chamado.data_criacao}</div>
            </div>
            {/* botoes */}
            <div className="d-flex gap-2">
              <Link to={`/comentar-chamado/${chamado.id}`}>
                <button className="btn btn-primary">Comentar</button>
              </Link>
              <Link to={`/detalhes-chamado/${chamado.id}`}>
                <button className="btn btn-secondary">Ver detalhes</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
