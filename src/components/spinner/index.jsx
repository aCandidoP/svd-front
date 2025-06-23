export default function Spinner() {
  return (
    <div className="d-flex gap-2 align-items-center justify-content-center">
      <div className="spinner-border" role="status"></div>
      <span>Carregando...</span>
    </div>
  );
}
