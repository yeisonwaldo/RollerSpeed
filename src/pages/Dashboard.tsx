import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardEstudiante from './DashboardEstudiante';
import DashboardInstructor from './DashboardInstructor';
import DashboardAdministrador from './DashboardAdministrador';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  // Redirigir al dashboard específico según el rol del usuario
  const renderDashboardByRole = () => {
    switch (user.role) {
      case 'estudiante':
        return <DashboardEstudiante />;
      case 'instructor':
        return <DashboardInstructor />;
      case 'administrador':
        return <DashboardAdministrador />;
      default:
        return <DashboardEstudiante />; // Dashboard por defecto
    }
  };

  return renderDashboardByRole();
};

export default Dashboard;