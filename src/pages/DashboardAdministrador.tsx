import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BellIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const DashboardAdministrador: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Estados para modales
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFinancesModal, setShowFinancesModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Funciones para manejar acciones
  const handleViewUsers = () => {
    setShowUsersModal(true);
  };

  const handleViewInstructors = () => {
    navigate('/instructores');
  };

  const handleViewStudents = () => {
    navigate('/estudiantes');
  };

  const handleViewReports = () => {
    setShowReportsModal(true);
  };

  const handleViewClasses = () => {
    navigate('/clases');
  };

  const handleViewFinances = () => {
    setShowFinancesModal(true);
  };

  const handleViewSettings = () => {
    setShowSettingsModal(true);
  };

  const handleViewAudit = () => {
    setShowAuditModal(true);
  };

  const handleViewSchedule = () => {
    navigate('/horarios');
  };

  const handleViewNotifications = () => {
    navigate('/notificaciones');
  };

  const handleViewProfile = () => {
    navigate('/perfil');
  };

  const handleViewFacilities = () => {
    navigate('/instalaciones');
  };

  // Tarjetas del dashboard para administradores
  const dashboardCards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar todos los usuarios del sistema',
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      action: handleViewUsers,
      show: true
    },
    {
      title: 'Instructores',
      description: 'Gestionar instructores y sus asignaciones',
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      action: handleViewInstructors,
      show: true
    },
    {
      title: 'Estudiantes',
      description: 'Administrar estudiantes y matrículas',
      icon: UserIcon,
      color: 'bg-purple-500',
      action: handleViewStudents,
      show: true
    },
    {
      title: 'Clases y Horarios',
      description: 'Programar y gestionar todas las clases',
      icon: CalendarIcon,
      color: 'bg-orange-500',
      action: handleViewClasses,
      show: true
    },
    {
      title: 'Reportes y Analytics',
      description: 'Ver estadísticas y reportes del sistema',
      icon: ChartBarIcon,
      color: 'bg-red-500',
      action: handleViewReports,
      show: true
    },
    {
      title: 'Finanzas',
      description: 'Gestionar pagos, facturación y finanzas',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
      action: handleViewFinances,
      show: true
    },
    {
      title: 'Configuración del Sistema',
      description: 'Configurar parámetros del sistema',
      icon: CogIcon,
      color: 'bg-gray-500',
      action: handleViewSettings,
      show: true
    },
    {
      title: 'Instalaciones',
      description: 'Gestionar pistas y equipamiento',
      icon: BuildingOfficeIcon,
      color: 'bg-indigo-500',
      action: handleViewFacilities,
      show: true
    },
    {
      title: 'Auditoría y Seguridad',
      description: 'Revisar logs y seguridad del sistema',
      icon: ShieldCheckIcon,
      color: 'bg-pink-500',
      action: handleViewAudit,
      show: true
    },
    {
      title: 'Documentos',
      description: 'Gestionar documentos y políticas',
      icon: DocumentTextIcon,
      color: 'bg-teal-500',
      action: () => navigate('/documentos'),
      show: true
    },
    {
      title: 'Notificaciones',
      description: 'Centro de notificaciones del sistema',
      icon: BellIcon,
      color: 'bg-cyan-500',
      action: handleViewNotifications,
      show: true
    },
    {
      title: 'Mi Perfil',
      description: 'Gestionar información personal',
      icon: UserIcon,
      color: 'bg-emerald-500',
      action: handleViewProfile,
      show: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Sección de bienvenida */}
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white overflow-hidden shadow rounded-lg mb-6"
          >
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ¡Bienvenido, {user?.nombre}!
              </h1>
              <p className="text-gray-600">
                Panel de administración - Gestiona todos los aspectos del sistema RollerSpeed
              </p>
            </div>
          </motion.div>

          {/* Estadísticas rápidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Usuarios
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        156
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Clases Activas
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        24
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Ingresos del Mes
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        $45,230
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Ocupación
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        87%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tarjetas del dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardCards
              .filter(card => card.show !== false)
              .map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={card.action}
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 ${card.color} rounded-md p-3`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </main>

      {/* Modales */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Funcionalidad de gestión de usuarios en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Reportes y Analytics</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Sistema de reportes y analytics en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowReportsModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Configuración del Sistema</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Panel de configuración del sistema en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFinancesModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Gestión Financiera</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Sistema de gestión financiera en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowFinancesModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAuditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Auditoría y Seguridad</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Sistema de auditoría y seguridad en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DashboardAdministrador;