import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  UserIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon, 
  AcademicCapIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface EstudiantesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
  nivel: string;
  clase: string;
  progreso: number;
  ultimaAsistencia: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  telefono: string;
  email: string;
  fechaInscripcion: string;
  asistencias: number;
  totalClases: number;
  calificacion: number;
  pagosAlDia: boolean;
  observaciones?: string;
  direccion?: string;
  contactoEmergencia?: string;
}

const EstudiantesModal: React.FC<EstudiantesModalProps> = ({ isOpen, onClose }) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    {
      id: 1,
      nombre: 'Ana Sofía Martínez',
      edad: 12,
      nivel: 'Principiante',
      clase: 'Patinaje Básico Infantil',
      progreso: 75,
      ultimaAsistencia: '2024-01-15',
      estado: 'activo',
      telefono: '+57 300 111 2222',
      email: 'ana.martinez@email.com',
      fechaInscripcion: '2023-11-01',
      asistencias: 28,
      totalClases: 32,
      calificacion: 4.5,
      pagosAlDia: true,
      observaciones: 'Estudiante muy dedicada, muestra gran progreso',
      direccion: 'Calle 123 #45-67, Bogotá',
      contactoEmergencia: 'María Martínez - +57 300 999 8888'
    },
    {
      id: 2,
      nombre: 'Carlos Andrés López',
      edad: 15,
      nivel: 'Intermedio',
      clase: 'Patinaje Artístico Intermedio',
      progreso: 60,
      ultimaAsistencia: '2024-01-14',
      estado: 'activo',
      telefono: '+57 300 333 4444',
      email: 'carlos.lopez@email.com',
      fechaInscripcion: '2023-09-15',
      asistencias: 45,
      totalClases: 52,
      calificacion: 4.2,
      pagosAlDia: true,
      observaciones: 'Buen rendimiento, necesita trabajar en equilibrio',
      direccion: 'Carrera 78 #12-34, Medellín',
      contactoEmergencia: 'Pedro López - +57 300 777 6666'
    },
    {
      id: 3,
      nombre: 'María Fernanda Ruiz',
      edad: 18,
      nivel: 'Avanzado',
      clase: 'Patinaje Velocidad Avanzado',
      progreso: 90,
      ultimaAsistencia: '2024-01-13',
      estado: 'activo',
      telefono: '+57 300 555 6666',
      email: 'maria.ruiz@email.com',
      fechaInscripcion: '2023-06-01',
      asistencias: 68,
      totalClases: 72,
      calificacion: 4.8,
      pagosAlDia: true,
      observaciones: 'Excelente estudiante, candidata para competencias',
      direccion: 'Avenida 80 #56-78, Cali',
      contactoEmergencia: 'Carmen Ruiz - +57 300 444 3333'
    },
    {
      id: 4,
      nombre: 'Diego Alejandro Pérez',
      edad: 14,
      nivel: 'Principiante',
      clase: 'Patinaje Básico Infantil',
      progreso: 30,
      ultimaAsistencia: '2024-01-10',
      estado: 'inactivo',
      telefono: '+57 300 777 8888',
      email: 'diego.perez@email.com',
      fechaInscripcion: '2023-12-01',
      asistencias: 8,
      totalClases: 16,
      calificacion: 3.5,
      pagosAlDia: false,
      observaciones: 'Necesita más práctica, faltas frecuentes',
      direccion: 'Calle 45 #23-12, Barranquilla',
      contactoEmergencia: 'Ana Pérez - +57 300 222 1111'
    },
    {
      id: 5,
      nombre: 'Valentina Gómez',
      edad: 16,
      nivel: 'Intermedio',
      clase: 'Patinaje Artístico Intermedio',
      progreso: 85,
      ultimaAsistencia: '2024-01-16',
      estado: 'activo',
      telefono: '+57 300 888 9999',
      email: 'valentina.gomez@email.com',
      fechaInscripcion: '2023-08-20',
      asistencias: 42,
      totalClases: 48,
      calificacion: 4.6,
      pagosAlDia: true,
      observaciones: 'Muy talentosa, excelente técnica',
      direccion: 'Carrera 15 #67-89, Bucaramanga',
      contactoEmergencia: 'Luis Gómez - +57 300 555 4444'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterNivel, setFilterNivel] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingEstudiante, setEditingEstudiante] = useState<Estudiante | null>(null);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspendido':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'activo':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'inactivo':
        return <ClockIcon className="h-4 w-4 text-gray-600" />;
      case 'suspendido':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'bg-green-500';
    if (progreso >= 60) return 'bg-yellow-500';
    if (progreso >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCalificacionStars = (calificacion: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(calificacion) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredEstudiantes = estudiantes.filter(estudiante => {
    const matchesSearch = estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estudiante.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estudiante.clase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNivel = filterNivel === 'todos' || estudiante.nivel === filterNivel;
    const matchesEstado = filterEstado === 'todos' || estudiante.estado === filterEstado;
    return matchesSearch && matchesNivel && matchesEstado;
  });

  const estadisticas = {
    total: estudiantes.length,
    activos: estudiantes.filter(e => e.estado === 'activo').length,
    inactivos: estudiantes.filter(e => e.estado === 'inactivo').length,
    progresoPromedio: Math.round(estudiantes.reduce((sum, e) => sum + e.progreso, 0) / estudiantes.length),
    asistenciaPromedio: Math.round(
      estudiantes.reduce((sum, e) => sum + (e.asistencias / e.totalClases * 100), 0) / estudiantes.length
    ),
    calificacionPromedio: (estudiantes.reduce((sum, e) => sum + e.calificacion, 0) / estudiantes.length).toFixed(1),
    pagosAlDia: estudiantes.filter(e => e.pagosAlDia).length
  };

  const handleViewStudent = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante);
  };

  const handleEditStudent = (estudiante: Estudiante) => {
    setEditingEstudiante(estudiante);
    setShowEditForm(true);
  };

  const handleDeleteStudent = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      setEstudiantes(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleToggleEstado = (id: number) => {
    setEstudiantes(prev => prev.map(estudiante => {
      if (estudiante.id === id) {
        const newEstado = estudiante.estado === 'activo' ? 'inactivo' : 'activo';
        return { ...estudiante, estado: newEstado };
      }
      return estudiante;
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#019AA9] to-[#018a95] px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <UserIcon className="h-6 w-6 mr-2" />
              Gestión de Estudiantes
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">Total</p>
                  <p className="text-2xl font-bold text-blue-900">{estadisticas.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Activos</p>
                  <p className="text-2xl font-bold text-green-900">{estadisticas.activos}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-600">Progreso Prom.</p>
                  <p className="text-2xl font-bold text-yellow-900">{estadisticas.progresoPromedio}%</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-600">Asistencia Prom.</p>
                  <p className="text-2xl font-bold text-purple-900">{estadisticas.asistenciaPromedio}%</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center">
                <StarIcon className="h-8 w-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-orange-600">Calificación</p>
                  <p className="text-2xl font-bold text-orange-900">{estadisticas.calificacionPromedio}</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-emerald-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-emerald-600">Pagos al Día</p>
                  <p className="text-2xl font-bold text-emerald-900">{estadisticas.pagosAlDia}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar estudiantes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={filterNivel}
                onChange={(e) => setFilterNivel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                <option value="todos">Todos los niveles</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>

              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                <option value="todos">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="suspendido">Suspendido</option>
              </select>

              <button className="inline-flex items-center px-4 py-2 bg-[#019AA9] text-white rounded-md hover:bg-[#018a95] transition-colors">
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Nuevo Estudiante
              </button>
            </div>
          </div>

          {/* Lista de estudiantes */}
          <div className="space-y-4">
            {filteredEstudiantes.length === 0 ? (
              <div className="text-center py-8">
                <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron estudiantes</p>
              </div>
            ) : (
              filteredEstudiantes.map((estudiante) => (
                <motion.div
                  key={estudiante.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{estudiante.nombre}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(estudiante.estado)}`}>
                            {getEstadoIcon(estudiante.estado)}
                            <span className="ml-1">{estudiante.estado.charAt(0).toUpperCase() + estudiante.estado.slice(1)}</span>
                          </span>
                          {!estudiante.pagosAlDia && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                              <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                              Pagos pendientes
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{estudiante.edad} años</span>
                        </div>
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{estudiante.nivel}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{estudiante.clase}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{formatDate(estudiante.ultimaAsistencia)}</span>
                        </div>
                        <div className="flex items-center">
                          <ChartBarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{estudiante.asistencias}/{estudiante.totalClases} clases</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        {/* Progreso */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progreso</span>
                            <span>{estudiante.progreso}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgresoColor(estudiante.progreso)}`}
                              style={{ width: `${estudiante.progreso}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Asistencia */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Asistencia</span>
                            <span>{Math.round((estudiante.asistencias / estudiante.totalClases) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${(estudiante.asistencias / estudiante.totalClases) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Calificación */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Calificación</span>
                            <span>{estudiante.calificacion}/5.0</span>
                          </div>
                          <div className="flex items-center">
                            {getCalificacionStars(estudiante.calificacion)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{estudiante.telefono}</span>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{estudiante.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleViewStudent(estudiante)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="Ver detalles"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditStudent(estudiante)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                        title="Editar estudiante"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleEstado(estudiante.id)}
                        className={`p-2 rounded-md transition-colors ${
                          estudiante.estado === 'activo' 
                            ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-50' 
                            : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                        }`}
                        title={estudiante.estado === 'activo' ? 'Desactivar estudiante' : 'Activar estudiante'}
                      >
                        {estudiante.estado === 'activo' ? (
                          <ClockIcon className="h-4 w-4" />
                        ) : (
                          <CheckCircleIcon className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(estudiante.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="Eliminar estudiante"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal de detalles del estudiante */}
      <AnimatePresence>
        {selectedEstudiante && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-[#019AA9] to-[#018a95] px-6 py-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Perfil del Estudiante</h3>
                  <button
                    onClick={() => setSelectedEstudiante(null)}
                    className="text-white hover:text-gray-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedEstudiante.nombre}</h4>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(selectedEstudiante.estado)}`}>
                        {getEstadoIcon(selectedEstudiante.estado)}
                        <span className="ml-1">{selectedEstudiante.estado.charAt(0).toUpperCase() + selectedEstudiante.estado.slice(1)}</span>
                      </span>
                      <div className="flex items-center">
                        {getCalificacionStars(selectedEstudiante.calificacion)}
                        <span className="ml-2 text-sm text-gray-600">({selectedEstudiante.calificacion}/5.0)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Inscrito desde</p>
                    <p className="font-semibold">{formatDate(selectedEstudiante.fechaInscripcion)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-900 border-b pb-2">Información Personal</h5>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Edad</label>
                      <p className="text-gray-900">{selectedEstudiante.edad} años</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                      <p className="text-gray-900">{selectedEstudiante.telefono}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedEstudiante.email}</p>
                    </div>
                    
                    {selectedEstudiante.direccion && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Dirección</label>
                        <p className="text-gray-900">{selectedEstudiante.direccion}</p>
                      </div>
                    )}
                    
                    {selectedEstudiante.contactoEmergencia && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contacto de Emergencia</label>
                        <p className="text-gray-900">{selectedEstudiante.contactoEmergencia}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-900 border-b pb-2">Información Académica</h5>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nivel</label>
                      <p className="text-gray-900">{selectedEstudiante.nivel}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Clase Actual</label>
                      <p className="text-gray-900">{selectedEstudiante.clase}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Progreso</label>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                          <div
                            className={`h-3 rounded-full ${getProgresoColor(selectedEstudiante.progreso)}`}
                            style={{ width: `${selectedEstudiante.progreso}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{selectedEstudiante.progreso}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Asistencia</label>
                      <p className="text-gray-900">{selectedEstudiante.asistencias} de {selectedEstudiante.totalClases} clases</p>
                      <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                          <div
                            className="h-3 rounded-full bg-blue-500"
                            style={{ width: `${(selectedEstudiante.asistencias / selectedEstudiante.totalClases) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round((selectedEstudiante.asistencias / selectedEstudiante.totalClases) * 100)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Última Asistencia</label>
                      <p className="text-gray-900">{formatDate(selectedEstudiante.ultimaAsistencia)}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estado de Pagos</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedEstudiante.pagosAlDia 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedEstudiante.pagosAlDia ? 'Al día' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedEstudiante.observaciones && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{selectedEstudiante.observaciones}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EstudiantesModal;