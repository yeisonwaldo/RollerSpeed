import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  ClockIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  AcademicCapIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface MisClasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNuevaClase?: () => void;
}

interface Clase {
  id: number;
  nombre: string;
  horario: string;
  dia: string;
  estudiantes: number;
  maxEstudiantes: number;
  nivel: string;
  estado: 'activa' | 'cancelada' | 'programada' | 'completada';
  salon: string;
  precio: number;
  descripcion?: string;
  fechaCreacion: string;
}

const MisClasesModal: React.FC<MisClasesModalProps> = ({ isOpen, onClose, onNuevaClase }) => {
  const [clases, setClases] = useState<Clase[]>([
    {
      id: 1,
      nombre: 'Patinaje Básico Infantil',
      horario: '09:00 - 10:30',
      dia: 'Lunes',
      estudiantes: 12,
      maxEstudiantes: 15,
      nivel: 'Principiante',
      estado: 'activa',
      salon: 'Pista Principal',
      precio: 25000,
      descripcion: 'Clase introductoria para niños de 6-12 años',
      fechaCreacion: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Patinaje Artístico Intermedio',
      horario: '15:00 - 16:30',
      dia: 'Miércoles',
      estudiantes: 8,
      maxEstudiantes: 10,
      nivel: 'Intermedio',
      estado: 'activa',
      salon: 'Pista Secundaria',
      precio: 35000,
      descripcion: 'Técnicas avanzadas de patinaje artístico',
      fechaCreacion: '2024-01-10'
    },
    {
      id: 3,
      nombre: 'Patinaje Velocidad Avanzado',
      horario: '17:00 - 18:30',
      dia: 'Viernes',
      estudiantes: 6,
      maxEstudiantes: 8,
      nivel: 'Avanzado',
      estado: 'programada',
      salon: 'Pista Principal',
      precio: 45000,
      descripcion: 'Entrenamiento de alta intensidad para competencia',
      fechaCreacion: '2024-01-20'
    },
    {
      id: 4,
      nombre: 'Clase Especial Sábado',
      horario: '10:00 - 11:30',
      dia: 'Sábado',
      estudiantes: 0,
      maxEstudiantes: 12,
      nivel: 'Todos',
      estado: 'cancelada',
      salon: 'Área VIP',
      precio: 30000,
      descripcion: 'Clase especial para todos los niveles',
      fechaCreacion: '2024-01-05'
    },
    {
      id: 5,
      nombre: 'Patinaje Recreativo',
      horario: '14:00 - 15:00',
      dia: 'Martes',
      estudiantes: 15,
      maxEstudiantes: 15,
      nivel: 'Principiante',
      estado: 'completada',
      salon: 'Pista Principal',
      precio: 20000,
      descripcion: 'Clase recreativa para principiantes',
      fechaCreacion: '2024-01-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [filterNivel, setFilterNivel] = useState('todos');
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingClase, setEditingClase] = useState<Clase | null>(null);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'programada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completada':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'activa':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'programada':
        return <ClockIcon className="h-4 w-4 text-blue-600" />;
      case 'cancelada':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />;
      case 'completada':
        return <CheckCircleIcon className="h-4 w-4 text-gray-600" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredClases = clases.filter(clase => {
    const matchesSearch = clase.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clase.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clase.dia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || clase.estado === filterEstado;
    const matchesNivel = filterNivel === 'todos' || clase.nivel === filterNivel;
    
    return matchesSearch && matchesEstado && matchesNivel;
  });

  const estadisticas = {
    total: clases.length,
    activas: clases.filter(c => c.estado === 'activa').length,
    programadas: clases.filter(c => c.estado === 'programada').length,
    totalEstudiantes: clases.reduce((total, clase) => total + clase.estudiantes, 0),
    ingresosMensuales: clases
      .filter(c => c.estado === 'activa')
      .reduce((total, clase) => total + (clase.precio * clase.estudiantes), 0)
  };

  const handleEditClase = (clase: Clase) => {
    setEditingClase(clase);
    setShowEditForm(true);
  };

  const handleDeleteClase = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta clase?')) {
      setClases(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleToggleEstado = (id: number) => {
    setClases(prev => prev.map(clase => {
      if (clase.id === id) {
        const newEstado = clase.estado === 'activa' ? 'cancelada' : 'activa';
        return { ...clase, estado: newEstado };
      }
      return clase;
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#019AA9] to-[#018a95] px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <AcademicCapIcon className="h-6 w-6 mr-2" />
              Mis Clases
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">Total Clases</p>
                  <p className="text-2xl font-bold text-blue-900">{estadisticas.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Activas</p>
                  <p className="text-2xl font-bold text-green-900">{estadisticas.activas}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-600">Programadas</p>
                  <p className="text-2xl font-bold text-purple-900">{estadisticas.programadas}</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-orange-600">Estudiantes</p>
                  <p className="text-2xl font-bold text-orange-900">{estadisticas.totalEstudiantes}</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-emerald-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-emerald-600">Ingresos/Mes</p>
                  <p className="text-lg font-bold text-emerald-900">
                    {formatCurrency(estadisticas.ingresosMensuales)}
                  </p>
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
                  placeholder="Buscar clases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                <option value="todos">Todos los estados</option>
                <option value="activa">Activas</option>
                <option value="programada">Programadas</option>
                <option value="completada">Completadas</option>
                <option value="cancelada">Canceladas</option>
              </select>

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

              <button
                onClick={onNuevaClase}
                className="inline-flex items-center px-4 py-2 bg-[#019AA9] text-white rounded-md hover:bg-[#018a95] transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Nueva Clase
              </button>
            </div>
          </div>

          {/* Lista de clases */}
          <div className="space-y-4">
            {filteredClases.length === 0 ? (
              <div className="text-center py-8">
                <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron clases</p>
              </div>
            ) : (
              filteredClases.map((clase) => (
                <motion.div
                  key={clase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{clase.nombre}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(clase.estado)}`}>
                            {getEstadoIcon(clase.estado)}
                            <span className="ml-1">{clase.estado.charAt(0).toUpperCase() + clase.estado.slice(1)}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{clase.dia}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{clase.horario}</span>
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{clase.estudiantes}/{clase.maxEstudiantes}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{clase.salon}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Nivel:</span>
                          <span className="ml-1 text-gray-600">{clase.nivel}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Precio:</span>
                          <span className="ml-1 text-gray-600">{formatCurrency(clase.precio)}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Ingresos:</span>
                          <span className="ml-1 text-green-600 font-medium">
                            {formatCurrency(clase.precio * clase.estudiantes)}
                          </span>
                        </div>
                      </div>

                      {clase.descripcion && (
                        <p className="text-sm text-gray-600 mt-2">{clase.descripcion}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setSelectedClase(clase)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="Ver detalles"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditClase(clase)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                        title="Editar clase"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleEstado(clase.id)}
                        className={`p-2 rounded-md transition-colors ${
                          clase.estado === 'activa' 
                            ? 'text-red-600 hover:text-red-800 hover:bg-red-50' 
                            : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                        }`}
                        title={clase.estado === 'activa' ? 'Cancelar clase' : 'Activar clase'}
                      >
                        {clase.estado === 'activa' ? (
                          <ExclamationTriangleIcon className="h-4 w-4" />
                        ) : (
                          <CheckCircleIcon className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteClase(clase.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="Eliminar clase"
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

      {/* Modal de detalles de clase */}
      <AnimatePresence>
        {selectedClase && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-[#019AA9] to-[#018a95] px-6 py-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Detalles de la Clase</h3>
                  <button
                    onClick={() => setSelectedClase(null)}
                    className="text-white hover:text-gray-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{selectedClase.nombre}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estado</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(selectedClase.estado)}`}>
                        {getEstadoIcon(selectedClase.estado)}
                        <span className="ml-1">{selectedClase.estado.charAt(0).toUpperCase() + selectedClase.estado.slice(1)}</span>
                      </span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Horario</label>
                      <p className="text-gray-900">{selectedClase.dia} - {selectedClase.horario}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nivel</label>
                      <p className="text-gray-900">{selectedClase.nivel}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Salón</label>
                      <p className="text-gray-900">{selectedClase.salon}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estudiantes</label>
                      <p className="text-gray-900">{selectedClase.estudiantes} de {selectedClase.maxEstudiantes}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-[#019AA9] h-2 rounded-full" 
                          style={{ width: `${(selectedClase.estudiantes / selectedClase.maxEstudiantes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Precio por estudiante</label>
                      <p className="text-gray-900">{formatCurrency(selectedClase.precio)}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ingresos totales</label>
                      <p className="text-green-600 font-semibold">{formatCurrency(selectedClase.precio * selectedClase.estudiantes)}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha de creación</label>
                      <p className="text-gray-900">{new Date(selectedClase.fechaCreacion).toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>
                </div>
                
                {selectedClase.descripcion && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{selectedClase.descripcion}</p>
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

export default MisClasesModal;