import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  CreditCardIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Payment {
  id: string;
  concept: string;
  amount: number;
  dueDate: string;
  status: 'pagado' | 'pendiente' | 'vencido';
  paymentDate?: string;
  method?: string;
}

interface PaymentMethod {
  id: string;
  type: 'tarjeta' | 'transferencia';
  name: string;
  details: string;
  isDefault: boolean;
}

interface PagosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PagosModal: React.FC<PagosModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'methods'>('payments');
  const [showAddMethod, setShowAddMethod] = useState(false);

  // Datos de ejemplo
  const payments: Payment[] = [
    {
      id: '1',
      concept: 'Mensualidad Enero 2024',
      amount: 150000,
      dueDate: '2024-01-31',
      status: 'pagado',
      paymentDate: '2024-01-15',
      method: 'Tarjeta **** 1234'
    },
    {
      id: '2',
      concept: 'Mensualidad Febrero 2024',
      amount: 150000,
      dueDate: '2024-02-28',
      status: 'pendiente'
    },
    {
      id: '3',
      concept: 'Clase Especial - Patinaje Artístico',
      amount: 75000,
      dueDate: '2024-01-10',
      status: 'vencido'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'tarjeta',
      name: 'Visa',
      details: '**** **** **** 1234',
      isDefault: true
    },
    {
      id: '2',
      type: 'tarjeta',
      name: 'Mastercard',
      details: '**** **** **** 5678',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pagado': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pagado': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'pendiente': return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'vencido': return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
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
                  <CreditCardIcon className="h-6 w-6 text-primary-blue mr-2" />
                  Gestión de Pagos
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="mt-4">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'payments'
                        ? 'border-primary-blue text-primary-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Historial de Pagos
                  </button>
                  <button
                    onClick={() => setActiveTab('methods')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'methods'
                        ? 'border-primary-blue text-primary-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Métodos de Pago
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white px-6 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <motion.div
                      key={payment.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {getStatusIcon(payment.status)}
                            <h4 className="font-semibold text-gray-900 ml-2">{payment.concept}</h4>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Monto:</span>
                              <p className="text-lg font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                            </div>
                            <div>
                              <span className="font-medium">Fecha de vencimiento:</span>
                              <p className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {formatDate(payment.dueDate)}
                              </p>
                            </div>
                            {payment.paymentDate && (
                              <div>
                                <span className="font-medium">Fecha de pago:</span>
                                <p>{formatDate(payment.paymentDate)}</p>
                              </div>
                            )}
                            {payment.method && (
                              <div>
                                <span className="font-medium">Método:</span>
                                <p>{payment.method}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                          {payment.status === 'pendiente' && (
                            <button className="block mt-2 px-3 py-1 bg-primary-blue text-white text-xs rounded hover:bg-blue-700 transition-colors">
                              Pagar Ahora
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'methods' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Métodos de Pago</h4>
                    <button
                      onClick={() => setShowAddMethod(true)}
                      className="flex items-center px-4 py-2 bg-primary-blue text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Agregar Método
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <CreditCardIcon className="h-8 w-8 text-gray-400" />
                            <div className="ml-3">
                              <h5 className="font-medium text-gray-900">{method.name}</h5>
                              <p className="text-sm text-gray-600">{method.details}</p>
                              {method.isDefault && (
                                <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Predeterminado
                                </span>
                              )}
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Method Form */}
                  <AnimatePresence>
                    {showAddMethod && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h5 className="font-medium text-gray-900 mb-4">Agregar Nueva Tarjeta</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Número de Tarjeta
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre en la Tarjeta
                            </label>
                            <input
                              type="text"
                              placeholder="Juan Pérez"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha de Expiración
                            </label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                          <button
                            onClick={() => setShowAddMethod(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => setShowAddMethod(false)}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Guardar Tarjeta
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
  );
};

export default PagosModal;