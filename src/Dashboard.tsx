import { useState } from 'react';
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

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const Dashboard = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [progressData, setProgressData] = useState(
    daysOfWeek.map(() => ({
      equipos: 50,
      proyectos: 50,
      empresa: 50,
    }))
  );

  const [graphData, setGraphData] = useState(
    daysOfWeek.map((day) => ({ name: day, progreso: 0 }))
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSliderChange = (key: string, value: number) => {
    setProgressData((prev) =>
      prev.map((data, index) =>
        index === currentDay ? { ...data, [key]: value } : data
      )
    );
  };

  const handleConfirmDay = () => {
    const { equipos, proyectos, empresa } = progressData[currentDay];
    const averageProgress = (equipos + proyectos + empresa) / 3;

    setGraphData((prev) =>
      prev.map((data, index) =>
        index === currentDay ? { ...data, progreso: averageProgress } : data
      )
    );

    if (currentDay < daysOfWeek.length - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectDay = (index: number) => {
    setCurrentDay(index);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          <li>
            <span className="icon"></span>
            <h3><span>Proyectos</span></h3>
          </li>
          <li>
            <span className="icon"></span>
            <h3><span>Equipos</span></h3>
          </li>
          <li className="dropdown">
            <span className="icon"></span>
            <h3><span>Empresa</span></h3>
            <span className="arrow"></span>
          </li>
          <li className="dropdown">
            <span className="icon"></span>
            <h3 onClick={toggleDropdown}><span>Semana</span></h3>
            {isDropdownOpen && (
              <ul className="dropdown-list">
                {daysOfWeek.map((day, index) => (
                  <li key={index} onClick={() => selectDay(index)}>
                    {day}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <button className="logout-btn">Cerrar Sesión</button>
      </div>

      <div className="main-content">
        <h2>Progreso del día: {daysOfWeek[currentDay]}</h2>

        <div className="cards">
          <div className="card">
            <h3>Equipos</h3>
            <CircularProgressbar
              value={progressData[currentDay].equipos}
              text={`${progressData[currentDay].equipos}%`}
              styles={buildStyles({
                textColor: 'black',
                pathColor: 'black',
                trailColor: '#e0e0e0',
                strokeWidth: 8,
              })}
            />
          </div>
          <div className="card">
            <h3>Proyectos</h3>
            <CircularProgressbar
              value={progressData[currentDay].proyectos}
              text={`${progressData[currentDay].proyectos}%`}
              styles={buildStyles({
                textColor: 'black',
                pathColor: 'black',
                trailColor: '#e0e0e0',
                strokeWidth: 8,
              })}
            />
          </div>
          <div className="card">
            <h3>Empresa</h3>
            <CircularProgressbar
              value={progressData[currentDay].empresa}
              text={`${progressData[currentDay].empresa}%`}
              styles={buildStyles({
                textColor: 'black',
                pathColor: 'black',
                trailColor: '#e0e0e0',
                strokeWidth: 8,
              })}
            />
          </div>
        </div>

        <div className="controls">
          <div className="control">
            <label>Equipos</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progressData[currentDay].equipos}
              onChange={(e) =>
                handleSliderChange('equipos', Number(e.target.value))
              }
            />
          </div>
          <div className="control">
            <label>Proyectos</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progressData[currentDay].proyectos}
              onChange={(e) =>
                handleSliderChange('proyectos', Number(e.target.value))
              }
            />
          </div>
          <div className="control">
            <label>Empresa</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progressData[currentDay].empresa}
              onChange={(e) =>
                handleSliderChange('empresa', Number(e.target.value))
              }
            />
          </div>
          <button className="confirm-btn" onClick={handleConfirmDay}>
            Confirmar día
          </button>
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
                <Line type="monotone" dataKey="progreso" stroke="black" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
