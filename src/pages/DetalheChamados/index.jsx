import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserIdJwt, validTokenDecoded } from '../../helpers/decode';

export default function DetalheChamados() {
  const [loading, setLoading] = useState(false);
  const [chamado, setChamado] = useState({});
  const [comentario, setComentario] = useState('');
  const [user, setUser] = useState({});
  const { token } = useAuth();

  const params = useParams();

  const getChamado = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/chamados/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setChamado(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do chamado:', error);
    } finally {
      setLoading(false);
    }
  }, [token, params]);

  const getUser = useCallback(async () => {
    if (!validTokenDecoded(token)) {
      return;
      // throw new Error('Token inválido');
    }
    try {
      const userId = getUserIdJwt(token);
      const response = await fetch(`http://localhost:5000/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
    // adicionado a dependência
  }, [token]);

  useEffect(() => {
    getChamado();
    getUser();
    return () => {
      setLoading(false);
    };
  }, [getChamado, getUser]);

  async function handleCommentSubmit() {
    const novoComentario = {
      chamado_id: chamado.id,
      comentario: comentario,
      usuario_id: user.id,
    };
    console.log(novoComentario);
    try {
      const response = await fetch(`http://localhost:5000/acompanhamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novoComentario),
      });
      if (response.ok) {
        const data = await response.json();

        // Atualiza o estado do chamado com o novo comentário
        setChamado((prevChamado) => ({
          ...prevChamado,
          acompanhamentos: [
            ...(prevChamado.acompanhamentos || []),
            {
              ...data.acompanhamento, // assumindo que o backend retorna o comentário criado
              usuario_nome: user.nome,
            },
          ],
        }));

        // Limpa o campo de comentário
        setComentario('');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  }

  function handleCancel() {
    setComentario('');
  }

  async function handleChangeStatus() {
    try {
      const novoStatus =
        chamado.status === 'NOVO'
          ? 'EM_ATENDIMENTO'
          : chamado.status === 'EM_ATENDIMENTO'
          ? 'FECHADO'
          : 'EM_ATENDIMENTO';
      const response = await fetch(
        `http://localhost:5000/chamados/${chamado.id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: novoStatus,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('Erro ao alterar status do chamado');
      }
      const data = await response.json();
      setChamado((prevChamado) => ({
        ...prevChamado,
        status: novoStatus,
      }));
    } catch (error) {
      console.error('Erro ao alterar status do chamado:', error);
    }
  }

  return (
    <div className="container mt-3 border p-3">
      {/* titulo e status */}
      <span className="">Id do Chamado: {chamado.id}</span>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-1 align-items-center">
          <h3>{chamado.titulo}</h3>
          <i className="bi bi-clock me-2"></i>
        </div>
        <span>{chamado.status}</span>
      </div>

      {/* id chamado e descricao do tipo */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-secondary">
          <span>{chamado.tipo?.desc_tipo}</span>
          <span> | {chamado.categoria?.nome}</span>
        </div>
        {user.perfil_id === 1 && (
          <div>
            {chamado.status === 'NOVO' ? (
              <button
                className="btn btn-primary"
                onClick={() => handleChangeStatus()}
              >
                Iniciar atendimento
              </button>
            ) : chamado.status === 'EM ATENDIMENTO' ? (
              <button
                className="btn btn-danger"
                onClick={() => handleChangeStatus()}
              >
                Finalizar atendimento
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => handleChangeStatus()}
              >
                Reabrir chamado
              </button>
            )}
          </div>
        )}
      </div>

      {/* descricao do chamado */}
      <div>
        <h4>Descrição</h4>
        <p className="text-secondary">{chamado.descricao}</p>
      </div>

      {/* users e datas */}
      <div className="d-flex justify-content-between">
        <div>
          <div className="mb-2">
            <span className="fw-bold">Solicitante: </span>
            <div>{chamado.requerente?.nome}</div>
          </div>
          <div>
            <span className="fw-bold">Responsável: </span>
            <div>{chamado.responsavel?.nome || 'Não atribuído'}</div>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <span className="fw-bold">Data de Abertura</span>
            <div>{chamado.data_criacao}</div>
          </div>
          <div>
            <span className="fw-bold">Ultima atualização</span>
            <div>{chamado.ultima_atualizacao}</div>
          </div>
        </div>
      </div>
      {/* <div>ANEXOS</div> */}
      {/* comentarios */}
      <div className="mt-3">
        <div className="d-flex gap-2 align-items-center mb-2">
          <i className="bi bi-chat-left"></i>
          <span>Comentários</span>
        </div>
        {chamado.acompanhamentos?.map((comentario) => (
          <div key={comentario.id} className="mb-3 border p-2">
            <div className="d-flex gap-2 justify-content-between">
              <span>{comentario.usuario_nome}</span>
              <span>{comentario.data_criacao}</span>
            </div>
            <p>{comentario.comentario}</p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h4>Adicionar comentário</h4>
        <textarea
          name=""
          id=""
          className="form-control"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          disabled={chamado.status === 'FECHADO'}
        ></textarea>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-light" onClick={() => handleCancel()}>
          Cancelar
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleCommentSubmit()}
        >
          Comentar
        </button>
      </div>
    </div>
  );
}
