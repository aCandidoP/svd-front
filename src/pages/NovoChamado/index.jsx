import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function NovoChamado() {
  const tiposServico = [
    'Manutenção',
    'Dúvida',
    'Solicitação',
    'Reclamação',
    'Sugestão',
    'Outros',
  ];

  const [titulo, setTitulo] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [tipoChamado, setTipoChamado] = useState('');
  const [descricao, setDescricao] = useState('');

  const [user, setUser] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    async function getGetCategorias() {
      try {
        const response = await fetch('http://localhost:3001/categorias');
        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function getUser() {
      console.log(token);
      if (!token) {
        throw new Error('Token não disponível, não buscando usuário');
      }
      try {
        const response = await fetch(`http://localhost:3001/usuarios/${token}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }
        const data = await response.json();
        setUser({ id: data.id, nome: data.nome, email: data.email });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
    getGetCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(tipoChamado);
    const novoChamado = {
      titulo: titulo,
      tipo: tipoChamado,
      categoria: categoria,
      status: 'Aberto',
      descricao: descricao,
      data_criacao: new Date(),
      usuario_id: user.id,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
    try {
      const response = await fetch('http://localhost:3001/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
              {tiposServico.map((servico, index) => (
                <option key={index} value={servico}>
                  {servico}
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
