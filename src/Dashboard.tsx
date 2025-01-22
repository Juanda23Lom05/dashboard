import React, { useState } from 'react';
import '../src/css/Dashboard.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // Estado para manejar el dropdown

  const progressData = {
    equipos: 70,
    proyectos: 50,
    empresa: 90,
  };

  const graphData = [
    { name: 'Lunes', progreso: 10 },
    { name: 'Martes', progreso: 20 },
    { name: 'Miércoles', progreso: 35 },
    { name: 'Jueves', progreso: 50 },
    { name: 'Viernes', progreso: 70 },
    { name: 'Sábado', progreso: 90 },
    { name: 'Domingo', progreso: 100 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>📊 Dashboard</h1>
        <ul>
          <li>
            <span className="icon"></span>
            <span>Proyectos</span>
          </li>
          <li>
            <span className="icon">😊</span>
            <span>Equipos</span>
          </li>
          <li
            className="dropdown"
            onClick={() => setIsSubmenuOpen(!isSubmenuOpen)} // Alterna la visibilidad del submenú
          >
            <span className="icon">📖</span>
            <span>G. de Recursos</span>
            <span className="arrow">{isSubmenuOpen ? '▲' : '▼'}</span>
          </li>
          {isSubmenuOpen && ( // Renderiza el submenú si está abierto
            <ul className="submenu">
              <li>Humano</li>
              <li>Materiales</li>
            </ul>
          )}
        </ul>
        <button className="logout-btn">Cerrar Sesión</button>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <h2></h2>
        <div className="cards">
          <div className="card">
            <h3>Equipos</h3>
            <CircularProgressbar
              value={progressData.equipos}
              text={`${progressData.equipos}%`}
              styles={buildStyles({
                textColor: 'black',
                pathColor: '#FFD700',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <div className="card">
            <h3>Proyectos</h3>
            <CircularProgressbar
              value={progressData.proyectos}
              text={`${progressData.proyectos}%`}
              styles={buildStyles({
                textColor: 'black',
                pathColor: '#00bfff',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <div className="card">
            <h3>Empresa</h3>
            <CircularProgressbar
              value={progressData.empresa}
              text={`${progressData.empresa}%`}
              styles={buildStyles({
                textColor: 'black',
                pathColor: '#32CD32',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
        </div>
        <div className="graph">
          <h3>Progreso semanal</h3>
          <div className="graph-content">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progreso" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
