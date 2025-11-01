import React, { useState } from 'react';
import Modal from './Modal';
import { UserIcon, MagnifyingGlassIcon, FunnelIcon, EyeIcon, PencilIcon, TrashIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

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
}

const EstudiantesModal: React.FC<EstudiantesModalProps> = ({ isOpen, onClose }) => {
  const [estudiantes] = useState<Estudiante[]>([
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
      email: 'ana.martinez@email.com'
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
      email: 'carlos.lopez@email.com'
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
      email: 'maria.ruiz@email.com'
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
      email: 'diego.perez@email.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterNivel, setFilterNivel] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');

  const filteredEstudiantes = estudiantes.filter(estudiante => {
    const matchesSearch = estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNivel = filterNivel === 'todos' || estudiante.nivel === filterNivel;
    const matchesEstado = filterEstado === 'todos' || estudiante.estado === filterEstado;
    return matchesSearch && matchesNivel && matchesEstado;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspendido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'bg-green-500';
    if (progreso >= 60) return 'bg-yellow-500';
    if (progreso >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleViewStudent = (id: number) => {
    alert(`Ver detalles del estudiante con ID: ${id}`);
  };

  const handleEditStudent = (id: number) => {
    alert(`Editar estudiante con ID: ${id}`);
  };

  const handleDeleteStudent = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      alert(`Estudiante con ID: ${id} eliminado`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gestión de Estudiantes" size="xl">
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-900">{estudiantes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Activos</p>
                <p className="text-2xl font-bold text-green-900">
                  {estudiantes.filter(e => e.estado === 'activo').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">%</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-600">Progreso Promedio</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {Math.round(estudiantes.reduce((sum, e) => sum + e.progreso, 0) / estudiantes.length)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Nuevos (Este mes)</p>
                <p className="text-2xl font-bold text-purple-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar estudiantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={filterNivel}
              onChange={(e) => setFilterNivel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los niveles</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>

            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>
        </div>

        {/* Lista de estudiantes */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredEstudiantes.map((estudiante) => (
              <li key={estudiante.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{estudiante.nombre}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(estudiante.estado)}`}>
                        {estudiante.estado.charAt(0).toUpperCase() + estudiante.estado.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Edad:</span> {estudiante.edad} años
                      </div>
                      <div>
                        <span className="font-medium">Nivel:</span> {estudiante.nivel}
                      </div>
                      <div>
                        <span className="font-medium">Clase:</span> {estudiante.clase}
                      </div>
                      <div>
                        <span className="font-medium">Última asistencia:</span> {estudiante.ultimaAsistencia}
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="mb-2">
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
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewStudent(estudiante.id)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="Ver detalles"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditStudent(estudiante.id)}
                      className="p-2 text-green-600 hover:text-green-800"
                      title="Editar estudiante"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(estudiante.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Eliminar estudiante"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {filteredEstudiantes.length === 0 && (
          <div className="text-center py-8">
            <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron estudiantes con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EstudiantesModal;