import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { 
  UserIcon, 
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  AcademicCapIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const MiPerfil: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    // Aquí se actualizaría el contexto con los nuevos datos
    console.log('Perfil actualizado:', editedUser);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#B3E5E8] to-[#019AA9]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#F8B305] p-2 rounded-full">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
            </div>
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-[#019AA9] hover:bg-[#017A87] text-white"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckIcon className="h-4 w-4 mr-2" />
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#019AA9] to-[#F8B305] px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="bg-white p-4 rounded-full">
                <span className="text-4xl">{user.avatar || '👤'}</span>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {user.nombre} {user.apellido}
                </h2>
                <p className="text-blue-100">Estudiante de Roller Speed</p>
                <div className="flex items-center mt-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    ID: {user.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Información Personal
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser?.nombre || ''}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019AA9] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser?.apellido || ''}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019AA9] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user.apellido}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  <p className="text-gray-900 py-2 bg-gray-50 px-3 rounded-lg">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    El email no se puede modificar
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <PhoneIcon className="h-4 w-4 inline mr-1" />
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser?.telefono || ''}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019AA9] focus:border-transparent"
                      placeholder="+57 300 123 4567"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user.telefono || 'No especificado'}</p>
                  )}
                </div>
              </div>

              {/* Información Académica */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Información Académica
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    Fecha de Nacimiento
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedUser?.fechaNacimiento || ''}
                      onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019AA9] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {user.fechaNacimiento ? 
                        new Date(user.fechaNacimiento).toLocaleDateString('es-ES') : 
                        'No especificada'
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <AcademicCapIcon className="h-4 w-4 inline mr-1" />
                    Nivel de Experiencia
                  </label>
                  {isEditing ? (
                    <select
                      value={editedUser?.nivelExperiencia || ''}
                      onChange={(e) => handleInputChange('nivelExperiencia', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019AA9] focus:border-transparent"
                    >
                      <option value="">Seleccionar nivel</option>
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                      <option value="Experto">Experto</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 py-2">{user.nivelExperiencia || 'No especificado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol
                  </label>
                  <p className="text-gray-900 py-2 bg-blue-50 px-3 rounded-lg">
                    <span className="capitalize">{user.role}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado de la Cuenta
                  </label>
                  <div className="flex items-center py-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Activa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas del Estudiante */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas de Progreso
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-blue-800">Clases Completadas</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-green-800">Asistencia</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-yellow-800">Meses Activo</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MiPerfil;