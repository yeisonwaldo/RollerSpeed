import React, { useState } from 'react';
import Modal from './Modal';
import { ClockIcon, UserGroupIcon, CalendarIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface MisClasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Clase {
  id: number;
  nombre: string;
  horario: string;
  dia: string;
  estudiantes: number;
  nivel: string;
  estado: 'activa' | 'cancelada' | 'programada';
}

const MisClasesModal: React.FC<MisClasesModalProps> = ({ isOpen, onClose }) => {
  const [clases] = useState<Clase[]>([
    {
      id: 1,
      nombre: 'Patinaje Básico Infantil',
      horario: '09:00 - 10:30',
      dia: 'Lunes',
      estudiantes: 12,
      nivel: 'Principiante',
      estado: 'activa'
    },
    {
      id: 2,
      nombre: 'Patinaje Artístico Intermedio',
      horario: '15:00 - 16:30',
      dia: 'Miércoles',
      estudiantes: 8,
      nivel: 'Intermedio',
      estado: 'activa'
    },
    {
      id: 3,
      nombre: 'Patinaje Velocidad Avanzado',
      horario: '17:00 - 18:30',
      dia: 'Viernes',
      estudiantes: 6,
      nivel: 'Avanzado',
      estado: 'programada'
    },
    {
      id: 4,
      nombre: 'Clase Especial Sábado',
      horario: '10:00 - 11:30',
      dia: 'Sábado',
      estudiantes: 0,
      nivel: 'Todos',
      estado: 'cancelada'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa':
        return 'bg-green-100 text-green-800';
      case 'programada':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddClase = () => {
    setShowAddForm(true);
  };

  const handleEditClase = (id: number) => {
    alert(`Editando clase con ID: ${id}`);
  };

  const handleDeleteClase = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta clase?')) {
      alert(`Clase con ID: ${id} eliminada`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mis Clases" size="xl">
      <div className="space-y-6">
        {/* Header con estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Clases Activas</p>
                <p className="text-2xl font-bold text-green-900">
                  {clases.filter(c => c.estado === 'activa').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total Estudiantes</p>
                <p className="text-2xl font-bold text-blue-900">
                  {clases.reduce((total, clase) => total + clase.estudiantes, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Esta Semana</p>
                <p className="text-2xl font-bold text-purple-900">
                  {clases.filter(c => c.estado !== 'cancelada').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón para agregar nueva clase */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Lista de Clases</h3>
          <button
            onClick={handleAddClase}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Nueva Clase
          </button>
        </div>

        {/* Lista de clases */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {clases.map((clase) => (
              <li key={clase.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">{clase.nombre}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(clase.estado)}`}>
                        {clase.estado.charAt(0).toUpperCase() + clase.estado.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {clase.dia}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {clase.horario}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {clase.estudiantes} estudiantes
                      </div>
                      <div>
                        <span className="font-medium">Nivel:</span> {clase.nivel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditClase(clase.id)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="Editar clase"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClase(clase.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Eliminar clase"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario para agregar nueva clase */}
        {showAddForm && (
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Agregar Nueva Clase</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre de la clase"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Seleccionar día</option>
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miércoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
                <option>Sábado</option>
                <option>Domingo</option>
              </select>
              <input
                type="time"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Nivel</option>
                <option>Principiante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Nueva clase agregada');
                  setShowAddForm(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Agregar Clase
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MisClasesModal;