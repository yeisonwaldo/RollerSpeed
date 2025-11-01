import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AuthenticatedNavbar } from '../components';
import MiPerfilModal from '../components/modals/MiPerfilModal';
import MisClasesModal from '../components/modals/MisClasesModal';
import EstudiantesModal from '../components/modals/EstudiantesModal';
import ReportesModal from '../components/modals/ReportesModal';
import Notificaciones from './student/Notificaciones';
import { 
  UserIcon, 
  BellIcon,
  ChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  ClockIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const DashboardInstructor: React.FC = () => {
  const { user } = useAuth();
  
  // Estados para controlar los modales
  const [showNotificaciones, setShowNotificaciones] = useState(false);
  const [showMiPerfilModal, setShowMiPerfilModal] = useState(false);
  const [showMisClasesModal, setShowMisClasesModal] = useState(false);
  const [showEstudiantesModal, setShowEstudiantesModal] = useState(false);
  const [showReportesModal, setShowReportesModal] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  const handleMiPerfil = () => {
    setShowMiPerfilModal(true);
  };

  const handleMisClases = () => {
    setShowMisClasesModal(true);
  };

  const handleEstudiantes = () => {
    setShowEstudiantesModal(true);
  };

  const handleReportes = () => {
    setShowReportesModal(true);
  };

  const instructorCards = [
    {
      title: 'Mi Perfil',
      description: 'Ver y editar información personal',
      icon: UserIcon,
      color: 'bg-blue-500',
      action: handleMiPerfil
    },
    {
      title: 'Mis Clases',
      description: 'Gestionar clases y horarios',
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      action: handleMisClases
    },
    {
      title: 'Estudiantes',
      description: 'Gestionar estudiantes asignados',
      icon: UsersIcon,
      color: 'bg-yellow-500',
      action: handleEstudiantes
    },
    {
      title: 'Reportes',
      description: 'Ver estadísticas y reportes',
      icon: ChartBarIcon,
      color: 'bg-red-500',
      action: handleReportes
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Authenticated Navbar */}
      <AuthenticatedNavbar 
        onNotificationsClick={() => setShowNotificaciones(true)}
        notificationCount={5}
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
              ¡Bienvenido, Instructor {user.nombre}! 🎓
            </h2>
            <p className="text-gray-600">
              Panel de control para instructores. Gestiona tus clases, estudiantes y revisa el progreso de tu trabajo.
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Instructor
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Especialidad: {user.especialidad || 'Patinaje General'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <UsersIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Estudiantes Activos</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500 text-white">
                <AcademicCapIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Clases Esta Semana</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-500 text-white">
                <ClockIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas Enseñadas</p>
                <p className="text-2xl font-bold text-gray-900">120</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Calificación Promedio</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Próximas Clases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
            Próximas Clases Hoy
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Patinaje Básico - Grupo A</p>
                <p className="text-sm text-gray-600">10:00 AM - 11:00 AM</p>
              </div>
              <div className="text-sm text-blue-600 font-medium">8 estudiantes</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Patinaje Intermedio - Grupo B</p>
                <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
              </div>
              <div className="text-sm text-blue-600 font-medium">12 estudiantes</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Patinaje Avanzado</p>
                <p className="text-sm text-gray-600">4:00 PM - 5:30 PM</p>
              </div>
              <div className="text-sm text-blue-600 font-medium">6 estudiantes</div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {instructorCards.map((card, index) => {
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

      {/* Notificaciones Modal */}
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

      {/* Modales Específicos */}
      <MiPerfilModal 
        isOpen={showMiPerfilModal} 
        onClose={() => setShowMiPerfilModal(false)} 
      />

      <MisClasesModal 
        isOpen={showMisClasesModal} 
        onClose={() => setShowMisClasesModal(false)} 
      />

      <EstudiantesModal 
        isOpen={showEstudiantesModal} 
        onClose={() => setShowEstudiantesModal(false)} 
      />

      <ReportesModal 
        isOpen={showReportesModal} 
        onClose={() => setShowReportesModal(false)} 
      />
    </div>
  );
};

export default DashboardInstructor;