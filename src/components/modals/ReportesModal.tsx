import React, { useState } from 'react';
import Modal from './Modal';
import { 
  ChartBarIcon, 
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  AcademicCapIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

interface ReportesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportesModal: React.FC<ReportesModalProps> = ({ isOpen, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  // Datos simulados para los reportes
  const estadisticas = {
    totalClases: 24,
    totalEstudiantes: 45,
    horasEnsenadas: 72,
    promedioAsistencia: 85,
    ingresosMes: 2400000,
    crecimientoEstudiantes: 12,
    satisfaccionPromedio: 4.7
  };

  const asistenciaPorDia = [
    { dia: 'Lun', asistencia: 90 },
    { dia: 'Mar', asistencia: 85 },
    { dia: 'Mié', asistencia: 92 },
    { dia: 'Jue', asistencia: 78 },
    { dia: 'Vie', asistencia: 88 },
    { dia: 'Sáb', asistencia: 95 },
    { dia: 'Dom', asistencia: 82 }
  ];

  const progresoNiveles = [
    { nivel: 'Principiante', estudiantes: 20, progreso: 75 },
    { nivel: 'Intermedio', estudiantes: 15, progreso: 68 },
    { nivel: 'Avanzado', estudiantes: 10, progreso: 85 }
  ];

  const handleExportReport = () => {
    alert('Exportando reporte en PDF...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reportes y Estadísticas" size="xl">
      <div className="space-y-6">
        {/* Selector de período */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('semana')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedPeriod === 'semana' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Esta Semana
            </button>
            <button
              onClick={() => setSelectedPeriod('mes')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedPeriod === 'mes' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Este Mes
            </button>
            <button
              onClick={() => setSelectedPeriod('trimestre')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedPeriod === 'trimestre' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Trimestre
            </button>
          </div>

          <button
            onClick={handleExportReport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exportar PDF
          </button>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Clases</p>
                <p className="text-2xl font-bold text-blue-900">{estadisticas.totalClases}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-sm text-green-600">+8% vs mes anterior</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Estudiantes</p>
                <p className="text-2xl font-bold text-green-900">{estadisticas.totalEstudiantes}</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{estadisticas.crecimientoEstudiantes}% crecimiento</span>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Horas Enseñadas</p>
                <p className="text-2xl font-bold text-purple-900">{estadisticas.horasEnsenadas}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+15% vs mes anterior</span>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Asistencia</p>
                <p className="text-2xl font-bold text-yellow-900">{estadisticas.promedioAsistencia}%</p>
              </div>
              <AcademicCapIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex items-center mt-2">
                <svg className="w-5 h-5 text-red-500 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm text-red-600">-3% vs mes anterior</span>
              </div>
          </div>
        </div>

        {/* Gráfico de asistencia por día */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asistencia por Día de la Semana</h3>
          <div className="space-y-3">
            {asistenciaPorDia.map((item) => (
              <div key={item.dia} className="flex items-center">
                <div className="w-12 text-sm font-medium text-gray-600">{item.dia}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${item.asistencia}%` }}
                    >
                      <span className="text-xs text-white font-medium">{item.asistencia}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progreso por niveles */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Progreso por Niveles</h3>
          <div className="space-y-4">
            {progresoNiveles.map((nivel) => (
              <div key={nivel.nivel} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{nivel.nivel}</h4>
                  <span className="text-sm text-gray-600">{nivel.estudiantes} estudiantes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${nivel.progreso}%` }}
                  >
                    <span className="text-xs text-white font-medium">{nivel.progreso}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ingresos del Mes</h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{formatCurrency(estadisticas.ingresosMes)}</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+18% vs mes anterior</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Satisfacción de Estudiantes</h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{estadisticas.satisfaccionPromedio}/5.0</p>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.floor(estadisticas.satisfaccionPromedio)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">Basado en 42 evaluaciones</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportesModal;