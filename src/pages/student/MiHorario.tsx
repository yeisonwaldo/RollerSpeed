import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { 
  CalendarIcon, 
  ClockIcon,
  MapPinIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Clase {
  id: string;
  nombre: string;
  instructor: string;
  horario: string;
  duracion: string;
  ubicacion: string;
  nivel: string;
  cuposDisponibles: number;
  cuposTotal: number;
  estado: 'programada' | 'en_curso' | 'completada' | 'cancelada';
  fecha: string;
  descripcion: string;
}

const MiHorario: React.FC = () => {
  const { user } = useAuth();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedClass, setSelectedClass] = useState<Clase | null>(null);

  // Datos de ejemplo de clases
  const clasesEjemplo: Clase[] = [
    {
      id: '1',
      nombre: 'Patinaje Básico',
      instructor: 'Carlos Rodríguez',
      horario: '09:00 - 10:30',
      duracion: '1.5 horas',
      ubicacion: 'Pista Principal',
      nivel: 'Principiante',
      cuposDisponibles: 3,
      cuposTotal: 15,
      estado: 'programada',
      fecha: '2024-01-15',
      descripcion: 'Clase introductoria de patinaje sobre ruedas, enfocada en equilibrio y técnicas básicas.'
    },
    {
      id: '2',
      nombre: 'Técnicas Avanzadas',
      instructor: 'María González',
      horario: '16:00 - 17:30',
      duracion: '1.5 horas',
      ubicacion: 'Pista Secundaria',
      nivel: 'Avanzado',
      cuposDisponibles: 0,
      cuposTotal: 12,
      estado: 'programada',
      fecha: '2024-01-16',
      descripcion: 'Perfeccionamiento de técnicas avanzadas de patinaje y maniobras complejas.'
    },
    {
      id: '3',
      nombre: 'Patinaje Recreativo',
      instructor: 'Ana Martínez',
      horario: '14:00 - 15:00',
      duracion: '1 hora',
      ubicacion: 'Pista Principal',
      nivel: 'Intermedio',
      cuposDisponibles: 8,
      cuposTotal: 20,
      estado: 'completada',
      fecha: '2024-01-12',
      descripcion: 'Sesión de patinaje libre con supervisión y consejos del instructor.'
    },
    {
      id: '4',
      nombre: 'Entrenamiento de Velocidad',
      instructor: 'Luis Pérez',
      horario: '18:00 - 19:30',
      duracion: '1.5 horas',
      ubicacion: 'Pista de Velocidad',
      nivel: 'Intermedio',
      cuposDisponibles: 5,
      cuposTotal: 10,
      estado: 'programada',
      fecha: '2024-01-17',
      descripcion: 'Entrenamiento especializado en técnicas de velocidad y resistencia.'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'programada': return 'bg-blue-100 text-blue-800';
      case 'en_curso': return 'bg-green-100 text-green-800';
      case 'completada': return 'bg-gray-100 text-gray-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'programada': return 'Programada';
      case 'en_curso': return 'En Curso';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Principiante': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() + (selectedWeek * 7));
    
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getCurrentWeekDates();
  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#B3E5E8] to-[#019AA9]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#F8B305] p-2 rounded-full">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Horario</h1>
            </div>
            
            {/* Week Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setSelectedWeek(selectedWeek - 1)}
                variant="outline"
                className="p-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-sm text-gray-500">Semana del</div>
                <div className="font-semibold">
                  {weekStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - {weekEnd.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              
              <Button
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                variant="outline"
                className="p-2"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Clases de la Semana
                </h2>
                
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, index) => (
                    <div key={day} className="text-center py-2">
                      <div className="text-sm font-medium text-gray-500">{day}</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {weekDates[index].getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Classes List */}
                <div className="space-y-4">
                  {clasesEjemplo.map((clase) => (
                    <motion.div
                      key={clase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedClass(clase)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{clase.nombre}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(clase.estado)}`}>
                              {getEstadoTexto(clase.estado)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNivelColor(clase.nivel)}`}>
                              {clase.nivel}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {clase.horario}
                            </div>
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-1" />
                              {clase.instructor}
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {clase.ubicacion}
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs">
                                {clase.cuposDisponibles}/{clase.cuposTotal} cupos
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          className="ml-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClass(clase);
                          }}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Class Details Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedClass ? 'Detalles de la Clase' : 'Resumen Semanal'}
                </h2>
                
                {selectedClass ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {selectedClass.nombre}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {selectedClass.descripcion}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Instructor:</span>
                        <span className="font-medium">{selectedClass.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Horario:</span>
                        <span className="font-medium">{selectedClass.horario}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duración:</span>
                        <span className="font-medium">{selectedClass.duracion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ubicación:</span>
                        <span className="font-medium">{selectedClass.ubicacion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nivel:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNivelColor(selectedClass.nivel)}`}>
                          {selectedClass.nivel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cupos:</span>
                        <span className="font-medium">
                          {selectedClass.cuposDisponibles}/{selectedClass.cuposTotal}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button
                        className="w-full bg-[#019AA9] hover:bg-[#017A87] text-white"
                        disabled={selectedClass.cuposDisponibles === 0 || selectedClass.estado === 'completada'}
                      >
                        {selectedClass.estado === 'completada' ? 'Clase Completada' :
                         selectedClass.cuposDisponibles === 0 ? 'Sin Cupos' : 'Unirse a la Clase'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Selecciona una clase para ver los detalles
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">4</div>
                        <div className="text-sm text-blue-800">Clases esta semana</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">6 hrs</div>
                        <div className="text-sm text-green-800">Tiempo total</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-yellow-600">1</div>
                        <div className="text-sm text-yellow-800">Clase completada</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiHorario;