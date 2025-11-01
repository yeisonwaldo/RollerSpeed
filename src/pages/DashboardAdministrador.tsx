import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BellIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const DashboardAdministrador: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Estados para modales
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFinancesModal, setShowFinancesModal] = useState(false);

  // Datos simulados para estadísticas
  const stats = {
    totalUsers: 1247,
    activeClasses: 34,
    monthlyRevenue: 125430,
    occupancyRate: 87,
    newRegistrations: 23,
    pendingPayments: 8,
    systemAlerts: 3,
    completedClasses: 156
  };

  const recentActivity = [
    { id: 1, action: 'Nuevo estudiante registrado', user: 'María González', time: '2 min ago', type: 'success' },
    { id: 2, action: 'Pago completado', user: 'Carlos Ruiz', time: '5 min ago', type: 'success' },
    { id: 3, action: 'Clase cancelada', user: 'Ana López', time: '10 min ago', type: 'warning' },
    { id: 4, action: 'Nuevo instructor agregado', user: 'Pedro Martín', time: '15 min ago', type: 'info' },
    { id: 5, action: 'Mantenimiento programado', user: 'Sistema', time: '1 hora ago', type: 'warning' }
  ];

  const monthlyData = [
    { month: 'Ene', students: 45, revenue: 12500, classes: 120 },
    { month: 'Feb', students: 52, revenue: 14200, classes: 135 },
    { month: 'Mar', students: 48, revenue: 13800, classes: 128 },
    { month: 'Abr', students: 61, revenue: 16500, classes: 145 },
    { month: 'May', students: 58, revenue: 15900, classes: 142 },
    { month: 'Jun', students: 67, revenue: 18200, classes: 156 }
  ];

  const quickActions = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar estudiantes e instructores',
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      action: () => setShowUsersModal(true),
      count: stats.totalUsers
    },
    {
      title: 'Clases Activas',
      description: 'Monitorear clases en curso',
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      action: () => navigate('/clases'),
      count: stats.activeClasses
    },
    {
      title: 'Reportes Financieros',
      description: 'Análisis de ingresos y gastos',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
      action: () => setShowFinancesModal(true),
      count: `$${stats.monthlyRevenue.toLocaleString()}`
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: CogIcon,
      color: 'bg-purple-500',
      action: () => setShowSettingsModal(true),
      count: stats.systemAlerts
    }
  ];

  const ProgressBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className={`flex items-center mt-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span>{change}</span>
          </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </motion.div>
  );

  const ChartBar = ({ data, height = 100 }: { data: number[]; height?: number }) => {
    const max = Math.max(...data);
    return (
      <div className="flex items-end space-x-2" style={{ height }}>
        {data.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 rounded-t flex-1 transition-all duration-500 hover:bg-blue-600"
            style={{ height: `${(value / max) * 100}%` }}
            title={`${value}`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Bienvenido, {user?.nombre}. Aquí tienes un resumen completo del sistema RollerSpeed.
            </p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Usuarios"
              value={stats.totalUsers.toLocaleString()}
              change="+12% vs mes anterior"
              icon={UserGroupIcon}
              trend="up"
            />
            <StatCard
              title="Clases Activas"
              value={stats.activeClasses}
              change="+8% vs mes anterior"
              icon={AcademicCapIcon}
              trend="up"
            />
            <StatCard
              title="Ingresos Mensuales"
              value={`$${stats.monthlyRevenue.toLocaleString()}`}
              change="+15% vs mes anterior"
              icon={CurrencyDollarIcon}
              trend="up"
            />
            <StatCard
              title="Ocupación"
              value={`${stats.occupancyRate}%`}
              change="-3% vs mes anterior"
              icon={ChartBarIcon}
              trend="down"
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Ingresos Mensuales</h3>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>Últimos 6 meses</option>
                  <option>Último año</option>
                </select>
              </div>
              <div className="space-y-4">
                {monthlyData.map((month, index) => (
                  <div key={month.month} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{month.month}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ingresos</span>
                        <span>${month.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${(month.revenue / 20000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Métricas Rápidas</h3>
              <div className="space-y-6">
                <ProgressBar 
                  label="Capacidad de Clases" 
                  value={stats.activeClasses} 
                  max={40} 
                  color="bg-blue-500" 
                />
                <ProgressBar 
                  label="Ocupación de Pistas" 
                  value={stats.occupancyRate} 
                  max={100} 
                  color="bg-green-500" 
                />
                <ProgressBar 
                  label="Pagos Pendientes" 
                  value={stats.pendingPayments} 
                  max={20} 
                  color="bg-yellow-500" 
                />
                <ProgressBar 
                  label="Alertas del Sistema" 
                  value={stats.systemAlerts} 
                  max={10} 
                  color="bg-red-500" 
                />
              </div>
            </motion.div>
          </div>

          {/* Activity and Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todo
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                    </div>
                    <div className="flex-shrink-0 text-xs text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={action.action}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{action.description}</p>
                    <p className="text-lg font-bold text-gray-900">{action.count}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Servidor Principal</p>
                  <p className="text-sm text-gray-500">Operativo</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Base de Datos</p>
                  <p className="text-sm text-gray-500">Conectada</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-900">Respaldos</p>
                  <p className="text-sm text-gray-500">Programado en 2h</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Modales simplificados */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Funcionalidad de gestión de usuarios en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFinancesModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Reportes Financieros</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Sistema de reportes financieros en desarrollo.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowFinancesModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DashboardAdministrador;