import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { 
  BellIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CreditCardIcon,
  AcademicCapIcon,
  MegaphoneIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'warning' | 'success' | 'error' | 'reminder' | 'announcement';
  categoria: 'clase' | 'pago' | 'general' | 'sistema';
  fecha: string;
  leida: boolean;
  importante: boolean;
  accion?: {
    texto: string;
    url: string;
  };
}

const Notificaciones: React.FC = () => {
  const { user } = useAuth();
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroLeidas, setFiltroLeidas] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<Notificacion | null>(null);

  // Datos de ejemplo de notificaciones
  const notificacionesEjemplo: Notificacion[] = [
    {
      id: '1',
      titulo: 'Pago Pendiente - Mensualidad Enero',
      mensaje: 'Tu mensualidad de enero vence el 31 de enero. Realiza tu pago para evitar la suspensión del servicio.',
      tipo: 'warning',
      categoria: 'pago',
      fecha: '2024-01-25T10:30:00Z',
      leida: false,
      importante: true,
      accion: {
        texto: 'Pagar Ahora',
        url: '/dashboard/pagos'
      }
    },
    {
      id: '2',
      titulo: 'Nueva Clase Disponible',
      mensaje: 'Se ha agregado una nueva clase de "Técnicas Avanzadas" para el próximo martes a las 4:00 PM.',
      tipo: 'info',
      categoria: 'clase',
      fecha: '2024-01-24T14:15:00Z',
      leida: false,
      importante: false,
      accion: {
        texto: 'Ver Horario',
        url: '/dashboard/horario'
      }
    },
    {
      id: '3',
      titulo: 'Clase Cancelada',
      mensaje: 'La clase de "Patinaje Básico" del viernes 26 de enero ha sido cancelada debido a mantenimiento de la pista.',
      tipo: 'error',
      categoria: 'clase',
      fecha: '2024-01-23T16:45:00Z',
      leida: true,
      importante: true
    },
    {
      id: '4',
      titulo: 'Perfil Actualizado',
      mensaje: 'Tu información de perfil ha sido actualizada exitosamente.',
      tipo: 'success',
      categoria: 'sistema',
      fecha: '2024-01-22T09:20:00Z',
      leida: true,
      importante: false
    },
    {
      id: '5',
      titulo: 'Recordatorio: Clase Mañana',
      mensaje: 'Tienes una clase de "Patinaje Recreativo" mañana a las 2:00 PM. No olvides traer tu equipo de protección.',
      tipo: 'reminder',
      categoria: 'clase',
      fecha: '2024-01-21T18:00:00Z',
      leida: false,
      importante: false
    },
    {
      id: '6',
      titulo: 'Nuevo Horario de Atención',
      mensaje: 'A partir del 1 de febrero, nuestro horario de atención será de lunes a sábado de 8:00 AM a 8:00 PM.',
      tipo: 'announcement',
      categoria: 'general',
      fecha: '2024-01-20T12:00:00Z',
      leida: true,
      importante: false
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'info': return <InformationCircleIcon className="h-5 w-5 text-blue-600" />;
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'error': return <XMarkIcon className="h-5 w-5 text-red-600" />;
      case 'reminder': return <ClockIcon className="h-5 w-5 text-purple-600" />;
      case 'announcement': return <MegaphoneIcon className="h-5 w-5 text-indigo-600" />;
      default: return <BellIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'reminder': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'announcement': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'clase': return <AcademicCapIcon className="h-4 w-4" />;
      case 'pago': return <CreditCardIcon className="h-4 w-4" />;
      case 'general': return <InformationCircleIcon className="h-4 w-4" />;
      case 'sistema': return <UserIcon className="h-4 w-4" />;
      default: return <BellIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Hace 1 día';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const notificacionesFiltradas = notificacionesEjemplo.filter(notif => {
    const categoriaMatch = filtroCategoria === 'todas' || notif.categoria === filtroCategoria;
    const leidaMatch = !filtroLeidas || !notif.leida;
    return categoriaMatch && leidaMatch;
  });

  const notificacionesNoLeidas = notificacionesEjemplo.filter(n => !n.leida).length;

  const marcarComoLeida = (id: string) => {
    // Aquí iría la lógica para marcar como leída
    console.log('Marcar como leída:', id);
  };

  const eliminarNotificacion = (id: string) => {
    // Aquí iría la lógica para eliminar
    console.log('Eliminar notificación:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#B3E5E8] to-[#019AA9]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#F8B305] p-2 rounded-full relative">
                <BellIcon className="h-6 w-6 text-white" />
                {notificacionesNoLeidas > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificacionesNoLeidas}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">No Leídas</div>
                <div className="text-xl font-bold text-red-600">
                  {notificacionesNoLeidas}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-semibold text-gray-900">
                  {notificacionesEjemplo.length}
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex space-x-4">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                <option value="todas">Todas las categorías</option>
                <option value="clase">Clases</option>
                <option value="pago">Pagos</option>
                <option value="general">General</option>
                <option value="sistema">Sistema</option>
              </select>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filtroLeidas}
                  onChange={(e) => setFiltroLeidas(e.target.checked)}
                  className="rounded border-gray-300 text-[#019AA9] focus:ring-[#019AA9]"
                />
                <span className="text-sm text-gray-700">Solo no leídas</span>
              </label>
            </div>
            
            <Button
              variant="outline"
              onClick={() => {
                // Marcar todas como leídas
                console.log('Marcar todas como leídas');
              }}
            >
              Marcar todas como leídas
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Todas las Notificaciones
                </h2>
                
                <div className="space-y-4">
                  {notificacionesFiltradas.map((notificacion) => (
                    <motion.div
                      key={notificacion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                        !notificacion.leida ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                      } ${notificacion.importante ? 'ring-2 ring-yellow-200' : ''}`}
                      onClick={() => {
                        setSelectedNotification(notificacion);
                        if (!notificacion.leida) {
                          marcarComoLeida(notificacion.id);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getTipoIcon(notificacion.tipo)}
                            <h3 className={`font-semibold ${!notificacion.leida ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notificacion.titulo}
                            </h3>
                            {notificacion.importante && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                Importante
                              </span>
                            )}
                            {!notificacion.leida && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                Nueva
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {notificacion.mensaje}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              {getCategoriaIcon(notificacion.categoria)}
                              <span className="capitalize">{notificacion.categoria}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{formatDate(notificacion.fecha)}</span>
                            </div>
                          </div>
                          
                          {notificacion.accion && (
                            <div className="mt-3">
                              <Button
                                className="bg-[#019AA9] hover:bg-[#017A87] text-white text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Navegar a la URL de la acción
                                  console.log('Navegar a:', notificacion.accion?.url);
                                }}
                              >
                                {notificacion.accion.texto}
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            className="p-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedNotification(notificacion);
                            }}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="p-2 text-red-600 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              eliminarNotificacion(notificacion.id);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {notificacionesFiltradas.length === 0 && (
                    <div className="text-center py-12">
                      <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay notificaciones que mostrar</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Notification Details Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedNotification ? 'Detalles' : 'Resumen'}
                </h2>
                
                {selectedNotification ? (
                  <div className="space-y-4">
                    <div className={`border rounded-lg p-4 ${getTipoColor(selectedNotification.tipo)}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTipoIcon(selectedNotification.tipo)}
                        <span className="font-medium text-sm">
                          {selectedNotification.tipo.charAt(0).toUpperCase() + selectedNotification.tipo.slice(1)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {selectedNotification.titulo}
                      </h3>
                      <p className="text-sm">
                        {selectedNotification.mensaje}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Categoría:</span>
                        <span className="font-medium capitalize">{selectedNotification.categoria}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fecha:</span>
                        <span className="font-medium">{formatDate(selectedNotification.fecha)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedNotification.leida ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedNotification.leida ? 'Leída' : 'No leída'}
                        </span>
                      </div>
                      {selectedNotification.importante && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Prioridad:</span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Importante
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {selectedNotification.accion && (
                      <div className="pt-4 border-t">
                        <Button
                          className="w-full bg-[#019AA9] hover:bg-[#017A87] text-white"
                          onClick={() => {
                            console.log('Navegar a:', selectedNotification.accion?.url);
                          }}
                        >
                          {selectedNotification.accion.texto}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Selecciona una notificación para ver los detalles
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">
                          {notificacionesEjemplo.filter(n => n.categoria === 'clase').length}
                        </div>
                        <div className="text-sm text-blue-800">Notificaciones de clases</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-yellow-600">
                          {notificacionesEjemplo.filter(n => n.categoria === 'pago').length}
                        </div>
                        <div className="text-sm text-yellow-800">Notificaciones de pagos</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">
                          {notificacionesEjemplo.filter(n => n.importante).length}
                        </div>
                        <div className="text-sm text-green-800">Notificaciones importantes</div>
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

export default Notificaciones;