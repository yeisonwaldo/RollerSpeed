import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface NuevaClaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (claseData: any) => void;
}

const NuevaClaseModal: React.FC<NuevaClaseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    nivel: 'Principiante',
    dia: '',
    horaInicio: '',
    horaFin: '',
    maxEstudiantes: '',
    precio: '',
    salon: 'Pista Principal',
    modalidad: 'Grupal'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const niveles = ['Principiante', 'Intermedio', 'Avanzado'];
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const salones = ['Pista Principal', 'Pista Secundaria', 'Área VIP', 'Salón de Entrenamiento'];
  const modalidades = ['Grupal', 'Individual', 'Semi-privada'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre de la clase es requerido';
    if (!formData.dia) newErrors.dia = 'Selecciona un día';
    if (!formData.horaInicio) newErrors.horaInicio = 'La hora de inicio es requerida';
    if (!formData.horaFin) newErrors.horaFin = 'La hora de fin es requerida';
    if (!formData.maxEstudiantes) newErrors.maxEstudiantes = 'El número máximo de estudiantes es requerido';
    if (!formData.precio) newErrors.precio = 'El precio es requerido';

    // Validar que la hora de fin sea después de la hora de inicio
    if (formData.horaInicio && formData.horaFin && formData.horaInicio >= formData.horaFin) {
      newErrors.horaFin = 'La hora de fin debe ser posterior a la hora de inicio';
    }

    // Validar números positivos
    if (formData.maxEstudiantes && parseInt(formData.maxEstudiantes) <= 0) {
      newErrors.maxEstudiantes = 'Debe ser un número mayor a 0';
    }

    if (formData.precio && parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'Debe ser un precio válido mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const claseData = {
        ...formData,
        id: Date.now(), // ID temporal
        maxEstudiantes: parseInt(formData.maxEstudiantes),
        precio: parseFloat(formData.precio),
        estado: 'programada',
        estudiantesInscritos: 0,
        fechaCreacion: new Date().toISOString()
      };

      if (onSave) {
        onSave(claseData);
      }

      // Resetear formulario
      setFormData({
        nombre: '',
        descripcion: '',
        nivel: 'Principiante',
        dia: '',
        horaInicio: '',
        horaFin: '',
        maxEstudiantes: '',
        precio: '',
        salon: 'Pista Principal',
        modalidad: 'Grupal'
      });
      
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#019AA9] to-[#018a95] px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <CalendarIcon className="h-6 w-6 mr-2" />
              Nueva Clase
            </h3>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <AcademicCapIcon className="h-4 w-4 inline mr-1" />
                Nombre de la Clase *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9] ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Patinaje Básico Infantil"
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel *
              </label>
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                {niveles.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modalidad
              </label>
              <select
                name="modalidad"
                value={formData.modalidad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                {modalidades.map(modalidad => (
                  <option key={modalidad} value={modalidad}>{modalidad}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Horario */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Día *
              </label>
              <select
                name="dia"
                value={formData.dia}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9] ${
                  errors.dia ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar día</option>
                {dias.map(dia => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </select>
              {errors.dia && <p className="text-red-500 text-sm mt-1">{errors.dia}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ClockIcon className="h-4 w-4 inline mr-1" />
                Hora Inicio *
              </label>
              <input
                type="time"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9] ${
                  errors.horaInicio ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.horaInicio && <p className="text-red-500 text-sm mt-1">{errors.horaInicio}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ClockIcon className="h-4 w-4 inline mr-1" />
                Hora Fin *
              </label>
              <input
                type="time"
                name="horaFin"
                value={formData.horaFin}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9] ${
                  errors.horaFin ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.horaFin && <p className="text-red-500 text-sm mt-1">{errors.horaFin}</p>}
            </div>
          </div>

          {/* Capacidad y Ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="h-4 w-4 inline mr-1" />
                Máx. Estudiantes *
              </label>
              <input
                type="number"
                name="maxEstudiantes"
                value={formData.maxEstudiantes}
                onChange={handleInputChange}
                min="1"
                max="50"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9] ${
                  errors.maxEstudiantes ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 15"
              />
              {errors.maxEstudiantes && <p className="text-red-500 text-sm mt-1">{errors.maxEstudiantes}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CurrencyDollarIcon className="h-4 w-4 inline mr-1" />
                Precio *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9] ${
                  errors.precio ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 25000"
              />
              {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="h-4 w-4 inline mr-1" />
                Salón
              </label>
              <select
                name="salon"
                value={formData.salon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              >
                {salones.map(salon => (
                  <option key={salon} value={salon}>{salon}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DocumentTextIcon className="h-4 w-4 inline mr-1" />
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#019AA9]"
              placeholder="Descripción opcional de la clase..."
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#019AA9] rounded-md hover:bg-[#018a95] transition-colors"
            >
              Crear Clase
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NuevaClaseModal;