import { useCallback, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserIdJwt, validTokenDecoded } from '../../helpers/decode';

export default function NovoChamado() {
  const [titulo, setTitulo] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [tiposChamado, setTiposChamado] = useState([]);
  const [tipoChamado, setTipoChamado] = useState('');
  const [descricao, setDescricao] = useState('');

  const [user, setUser] = useState();

  const { token } = useAuth();

  // Retirado a possibilidade de recriação da função desnecessariamente
  const getCategorias = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/categorias', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias');
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const getTipos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/tipos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar tipos');
      }
      const data = await response.json();
      console.log(data);
      setTiposChamado(data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  // Retirado a possibilidade de recriação da função desnecessariamente
  const getUser = useCallback(async () => {
    if (!validTokenDecoded(token)) {
      throw new Error('Token inválido');
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
      // por enquanto até andre arrumar essa resposta bizarra
      const teste = JSON.parse(data.replace(/'/g, '"'));
      setUser({ id: teste[0].id, nome: teste[0].nome, email: teste[0].email });
      console.log(teste[0]);
    } catch (error) {
      console.error(error);
    }
    // adicionado a dependência
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (isMounted) {
        await getUser();
        await getCategorias();
        await getTipos();
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [getUser, getCategorias, getTipos]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const novoChamado = {
        titulo: titulo,
        tipo_id: 1,
        categoria_id: 1,
        descricao: descricao,
        usuario_id: user.id,
      };
      const response = await fetch('http://localhost:5000/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novoChamado),
      });
      if (!response.ok) throw Error('Erro ao criar o novo chamado');
      alert(`Chamado ${novoChamado.id} criado com sucesso!`);
      redirect('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="container">
        <h2>Criar chamado</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              required
              id="titulo"
              placeholder="Digite o título do chamado"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">
              Tipo de chamado
            </label>
            <select
              className="form-select"
              required
              id="tipoChamado"
              onChange={(e) => setTipoChamado(e.target.value)}
            >
              {tiposChamado.map((tipo) => (
                <option key={tipo.id} value={tipo.desc_tipo}>
                  {tipo.desc_tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="categorias" className="form-label">
              Categoria do chamado
            </label>
            <select
              className="form-select"
              id="tipoServico"
              required
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">
              Descrição
            </label>
            <textarea
              className="form-control"
              id="descricao"
              rows="3"
              required
              placeholder="Digite a descrição do chamado"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Criar Chamado
          </button>
        </form>
      </div>
    </div>
  );
}
