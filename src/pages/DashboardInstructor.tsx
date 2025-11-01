import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AuthenticatedNavbar } from '../components';
import MiPerfilModal from '../components/modals/MiPerfilModal';
import MisClasesModal from '../components/modals/MisClasesModal';
import EstudiantesModal from '../components/modals/EstudiantesModal';
import ReportesModal from '../components/modals/ReportesModal';
import NuevaClaseModal from '../components/modals/NuevaClaseModal';
import Notificaciones from './student/Notificaciones';
import { 
  UserIcon, 
  BellIcon,
  ChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  ClockIcon,
  CalendarIcon,
  DocumentTextIcon,
  StarIcon,
  TrophyIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const DashboardInstructor: React.FC = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMiPerfil, setShowMiPerfil] = useState(false);
  const [showMisClases, setShowMisClases] = useState(false);
  const [showEstudiantes, setShowEstudiantes] = useState(false);
  const [showReportes, setShowReportes] = useState(false);
  const [showNuevaClase, setShowNuevaClase] = useState(false);

  // Datos simulados específicos para instructor
  const instructorStats = {
    totalEstudiantes: 32,
    clasesHoy: 4,
    horasSemanales: 28,
    calificacionPromedio: 4.8,
    clasesCompletadas: 156,
    estudiantesActivos: 28,
    ingresosMes: 1850000
  };

  const clasesHoy = [
    {
      id: 1,
      nombre: 'Patinaje Básico - Grupo A',
      hora: '08:00 - 09:30',
      estudiantes: 8,
      nivel: 'Principiante',
      estado: 'programada',
      salon: 'Pista Principal'
    },
    {
      id: 2,
      nombre: 'Técnicas Avanzadas',
      hora: '10:00 - 11:30',
      estudiantes: 6,
      nivel: 'Avanzado',
      estado: 'en-curso',
      salon: 'Pista Secundaria'
    },
    {
      id: 3,
      nombre: 'Patinaje Artístico',
      hora: '15:00 - 16:30',
      estudiantes: 5,
      nivel: 'Intermedio',
      estado: 'programada',
      salon: 'Pista Principal'
    },
    {
      id: 4,
      nombre: 'Entrenamiento Personal',
      hora: '17:00 - 18:00',
      estudiantes: 1,
      nivel: 'Personalizado',
      estado: 'programada',
      salon: 'Área VIP'
    }
  ];

  const estudiantesRecientes = [
    {
      id: 1,
      nombre: 'Ana García',
      nivel: 'Principiante',
      progreso: 85,
      ultimaClase: 'Ayer',
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'Carlos Rodríguez',
      nivel: 'Intermedio',
      progreso: 72,
      ultimaClase: 'Hoy',
      estado: 'activo'
    },
    {
      id: 3,
      nombre: 'María López',
      nivel: 'Avanzado',
      progreso: 94,
      ultimaClase: 'Ayer',
      estado: 'activo'
    },
    {
      id: 4,
      nombre: 'Pedro Martínez',
      nivel: 'Principiante',
      progreso: 45,
      ultimaClase: 'Hace 3 días',
      estado: 'inactivo'
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Nueva Clase',
      description: 'Crear una nueva clase',
      icon: PlusIcon,
      color: 'bg-[#019AA9]',
      action: () => setShowNuevaClase(true)
    },
    {
      id: 2,
      title: 'Mi Perfil',
      description: 'Actualizar información personal',
      icon: UserIcon,
      color: 'bg-blue-500',
      action: () => setShowMiPerfil(true)
    },
    {
      id: 3,
      title: 'Mis Clases',
      description: 'Gestionar horarios y clases',
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      action: () => setShowMisClases(true)
    },
    {
      id: 4,
      title: 'Estudiantes',
      description: 'Ver progreso y gestionar estudiantes',
      icon: UsersIcon,
      color: 'bg-purple-500',
      action: () => setShowEstudiantes(true)
    },
    {
      id: 5,
      title: 'Reportes',
      description: 'Análisis y estadísticas',
      icon: ChartBarIcon,
      color: 'bg-orange-500',
      action: () => setShowReportes(true)
    }
  ];

  const getEstadoClaseColor = (estado: string) => {
    switch (estado) {
      case 'programada': return 'bg-blue-100 text-blue-800';
      case 'en-curso': return 'bg-green-100 text-green-800';
      case 'completada': return 'bg-gray-100 text-gray-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoEstudianteColor = (estado: string) => {
    return estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavbar 
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={3}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header de Bienvenida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-[#019AA9] to-[#018a95] rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  ¡Bienvenido, {user?.nombre}! 👨‍🏫
                </h1>
                <p className="text-cyan-100 text-lg">
                  Panel de Instructor - Gestiona tus clases y estudiantes
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{instructorStats.clasesHoy}</div>
                  <div className="text-sm text-cyan-100">Clases Hoy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{instructorStats.totalEstudiantes}</div>
                  <div className="text-sm text-cyan-100">Estudiantes</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas Principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estudiantes Activos</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.estudiantesActivos}</p>
                <p className="text-sm text-green-600 mt-1">+3 este mes</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Horas Semanales</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.horasSemanales}</p>
                <p className="text-sm text-blue-600 mt-1">85% capacidad</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calificación</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-gray-900">{instructorStats.calificacionPromedio}</p>
                  <StarIcon className="h-6 w-6 text-yellow-500 ml-1" />
                </div>
                <p className="text-sm text-yellow-600 mt-1">Excelente</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrophyIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clases Completadas</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.clasesCompletadas}</p>
                <p className="text-sm text-purple-600 mt-1">Este año</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <AcademicCapIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clases de Hoy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Clases de Hoy</h2>
                <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Nueva Clase
                </button>
              </div>
              
              <div className="space-y-4">
                {clasesHoy.map((clase) => (
                  <motion.div
                    key={clase.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{clase.nombre}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoClaseColor(clase.estado)}`}>
                            {clase.estado.charAt(0).toUpperCase() + clase.estado.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {clase.hora}
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="h-4 w-4 mr-1" />
                            {clase.estudiantes} estudiantes
                          </div>
                          <div className="flex items-center">
                            <AcademicCapIcon className="h-4 w-4 mr-1" />
                            {clase.nivel}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {clase.salon}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {clase.estado === 'programada' && (
                          <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">
                            Iniciar
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Panel Lateral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Acciones Rápidas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all text-center"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Estudiantes Recientes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Estudiantes Recientes</h2>
                <button 
                  onClick={() => setShowEstudiantes(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver todos
                </button>
              </div>
              
              <div className="space-y-3">
                {estudiantesRecientes.map((estudiante) => (
                  <div key={estudiante.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{estudiante.nombre}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoEstudianteColor(estudiante.estado)}`}>
                          {estudiante.estado}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{estudiante.nivel} • {estudiante.ultimaClase}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progreso</span>
                          <span>{estudiante.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${estudiante.progreso}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modales */}
      {showNotifications && (
        <Notificaciones 
          isOpen={showNotifications} 
          onClose={() => setShowNotifications(false)} 
        />
      )}
      
      {showMiPerfil && (
        <MiPerfilModal 
          isOpen={showMiPerfil} 
          onClose={() => setShowMiPerfil(false)} 
        />
      )}
      
      {showMisClases && (
        <MisClasesModal 
          isOpen={showMisClases} 
          onClose={() => setShowMisClases(false)} 
        />
      )}
      
      {showEstudiantes && (
        <EstudiantesModal 
          isOpen={showEstudiantes} 
          onClose={() => setShowEstudiantes(false)} 
        />
      )}
      
      {showReportes && (
        <ReportesModal 
          isOpen={showReportes} 
          onClose={() => setShowReportes(false)} 
        />
      )}
      
      {showNuevaClase && (
        <NuevaClaseModal 
          isOpen={showNuevaClase} 
          onClose={() => setShowNuevaClase(false)} 
        />
      )}
    </div>
  );
};

export default DashboardInstructor;