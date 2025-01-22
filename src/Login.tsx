import { Link, useNavigate } from 'react-router-dom';
import '../src/css/Formulario.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar que la página se recargue
    navigate('/dashboard'); // Redirigir al Dashboard
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">INICIO DE SESION</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="email" placeholder="Introduce el correo" className="input" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Introduce la contraseña" className="input" />
          </div>
          <button type="submit" className="btn">Iniciar Sesion</button>
        </form>
        <p className="text">
          ¿No tienes una cuenta? <Link to="/" className="link">Crea una</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
