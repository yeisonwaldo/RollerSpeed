import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface Class {
  id: string;
  name: string;
  instructor: string;
  time: string;
  location: string;
  status: 'programada' | 'en-curso' | 'completada' | 'cancelada';
  date: string;
  level: string;
  duration: string;
}

interface MiHorarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiHorarioModal: React.FC<MiHorarioModalProps> = ({ isOpen, onClose }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // Datos de ejemplo
  const classes: Class[] = [
    {
      id: '1',
      name: 'Patinaje Básico',
      instructor: 'Carlos Rodríguez',
      time: '10:00 - 11:30',
      location: 'Pista Principal',
      status: 'programada',
      date: '2024-01-15',
      level: 'Principiante',
      duration: '90 minutos'
    },
    {
      id: '2',
      name: 'Técnicas Avanzadas',
      instructor: 'María González',
      time: '16:00 - 17:30',
      location: 'Pista Secundaria',
      status: 'completada',
      date: '2024-01-12',
      level: 'Avanzado',
      duration: '90 minutos'
    },
    {
      id: '3',
      name: 'Patinaje Artístico',
      instructor: 'Ana López',
      time: '14:00 - 15:30',
      location: 'Pista Principal',
      status: 'en-curso',
      date: '2024-01-14',
      level: 'Intermedio',
      duration: '90 minutos'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'programada': return 'bg-blue-100 text-blue-800';
      case 'en-curso': return 'bg-green-100 text-green-800';
      case 'completada': return 'bg-gray-100 text-gray-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'programada': return 'Programada';
      case 'en-curso': return 'En Curso';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-500 bg-opacity-75"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <CalendarIcon className="h-6 w-6 text-primary-blue mr-2" />
                  Mi Horario
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-blue transition-colors"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Semana Anterior
                </button>
                
                <h4 className="text-lg font-semibold text-gray-900">
                  Semana del 15 - 21 Enero 2024
                </h4>
                
                <button
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-blue transition-colors"
                >
                  Semana Siguiente
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>

              {/* Classes Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classItem) => (
                  <motion.div
                    key={classItem.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedClass(classItem)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="font-semibold text-gray-900">{classItem.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}>
                        {getStatusText(classItem.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        {classItem.instructor}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        {classItem.time}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {classItem.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {classes.length === 0 && (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases programadas</h3>
                  <p className="text-gray-600">No tienes clases asignadas para esta semana.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>

      {/* Class Detail Modal */}
      <AnimatePresence>
        {selectedClass && (
          <div className="fixed inset-0 z-[10000] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setSelectedClass(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white px-6 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Detalles de la Clase</h3>
                    <button
                      onClick={() => setSelectedClass(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{selectedClass.name}</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedClass.status)}`}>
                        {getStatusText(selectedClass.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Instructor:</span>
                        <p className="text-gray-600">{selectedClass.instructor}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Nivel:</span>
                        <p className="text-gray-600">{selectedClass.level}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Horario:</span>
                        <p className="text-gray-600">{selectedClass.time}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Duración:</span>
                        <p className="text-gray-600">{selectedClass.duration}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">Ubicación:</span>
                        <p className="text-gray-600">{selectedClass.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedClass(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiHorarioModal;