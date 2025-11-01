import React, { useState } from 'react';
import Modal from './Modal';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface MiPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiPerfilModal: React.FC<MiPerfilModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: 'María González',
    email: 'maria.gonzalez@rollerspeed.com',
    telefono: '+57 300 123 4567',
    direccion: 'Calle 123 #45-67, Bogotá',
    especialidad: 'Patinaje Artístico',
    experiencia: '8 años',
    certificaciones: 'Instructor Certificado FIRS, Entrenador Nivel 2'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar los cambios
    alert('Perfil actualizado exitosamente');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mi Perfil" size="lg">
      <div className="space-y-6">
        {/* Foto de perfil */}
        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
              <UserIcon className="h-12 w-12 text-gray-600" />
            </div>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              Cambiar foto
            </button>
            <p className="text-sm text-gray-500 mt-1">JPG, GIF o PNG. Máximo 1MB.</p>
          </div>
        </div>

        {/* Información personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="h-4 w-4 inline mr-1" />
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <EnvelopeIcon className="h-4 w-4 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <PhoneIcon className="h-4 w-4 inline mr-1" />
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-1" />
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Información profesional */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Información Profesional</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especialidad
              </label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Años de experiencia
              </label>
              <input
                type="text"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificaciones
            </label>
            <textarea
              name="certificaciones"
              value={formData.certificaciones}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MiPerfilModal;