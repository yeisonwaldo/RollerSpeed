import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthenticatedNavbar } from '../components';
import { MiHorarioModal, PagosModal } from '../components/modals';
import Notificaciones from './student/Notificaciones';
import { 
  UserIcon, 
  CalendarIcon, 
  CreditCardIcon, 
  BellIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const DashboardEstudiante: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Estados para controlar los modales
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [showPagosModal, setShowPagosModal] = useState(false);
  const [showNotificaciones, setShowNotificaciones] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  const studentCards = [
    {
      title: 'Mi Perfil',
      description: 'Gestiona tu información personal',
      icon: UserIcon,
      color: 'bg-blue-500',
      action: () => navigate('/mi-perfil')
    },
    {
      title: 'Mi Horario',
      description: 'Consulta tus clases asignadas',
      icon: CalendarIcon,
      color: 'bg-green-500',
      action: () => setShowHorarioModal(true)
    },
    {
      title: 'Pagos',
      description: 'Estado y métodos de pago',
      icon: CreditCardIcon,
      color: 'bg-purple-500',
      action: () => setShowPagosModal(true)
    },
    {
      title: 'Mi Progreso',
      description: 'Revisa tu avance y logros',
      icon: TrophyIcon,
      color: 'bg-yellow-500',
      action: () => console.log('Ver progreso')
    },
    {
      title: 'Mis Clases',
      description: 'Historial de clases tomadas',
      icon: AcademicCapIcon,
      color: 'bg-indigo-500',
      action: () => console.log('Ver historial de clases')
    },
    {
      title: 'Estadísticas',
      description: 'Tu rendimiento y estadísticas',
      icon: ChartBarIcon,
      color: 'bg-red-500',
      action: () => console.log('Ver estadísticas')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Authenticated Navbar */}
      <AuthenticatedNavbar 
        onNotificationsClick={() => setShowNotificaciones(true)}
        notificationCount={3}
      />

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Hola, {user.nombre}! 👋
            </h2>
            <p className="text-gray-600">
              Bienvenido a tu panel de estudiante. Aquí puedes gestionar tus clases, revisar tu progreso y más.
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Estudiante
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Nivel: {user.nivelExperiencia || 'Principiante'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <ClockIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas de Práctica</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500 text-white">
                <AcademicCapIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Clases Completadas</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-500 text-white">
                <TrophyIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Logros Obtenidos</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {studentCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={card.action}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.color} text-white group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Modales */}
      {showHorarioModal && (
        <MiHorarioModal 
          isOpen={showHorarioModal}
          onClose={() => setShowHorarioModal(false)}
        />
      )}

      {showPagosModal && (
        <PagosModal 
          isOpen={showPagosModal}
          onClose={() => setShowPagosModal(false)}
        />
      )}

      {showNotificaciones && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Notificaciones</h2>
              <button
                onClick={() => setShowNotificaciones(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <Notificaciones />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardEstudiante;