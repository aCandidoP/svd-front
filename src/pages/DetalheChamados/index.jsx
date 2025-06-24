import { useParams } from 'react-router-dom';

export default function DetalheChamados() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h2>Detalhes do chamado</h2>
      <p>{params.id}</p>
    </div>
  );
}
