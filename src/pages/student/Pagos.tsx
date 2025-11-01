import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { 
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Pago {
  id: string;
  concepto: string;
  monto: number;
  fechaVencimiento: string;
  fechaPago?: string;
  estado: 'pendiente' | 'pagado' | 'vencido' | 'procesando';
  metodoPago?: string;
  numeroTransaccion?: string;
  descripcion: string;
}

interface MetodoPago {
  id: string;
  tipo: 'tarjeta' | 'cuenta_bancaria' | 'efectivo';
  nombre: string;
  numero: string;
  vencimiento?: string;
  banco?: string;
  predeterminado: boolean;
}

const Pagos: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pagos' | 'metodos' | 'historial'>('pagos');
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [showAddMethod, setShowAddMethod] = useState(false);

  // Datos de ejemplo de pagos
  const pagosEjemplo: Pago[] = [
    {
      id: '1',
      concepto: 'Mensualidad Enero 2024',
      monto: 150000,
      fechaVencimiento: '2024-01-31',
      estado: 'pendiente',
      descripcion: 'Pago mensual de clases de patinaje - Enero 2024'
    },
    {
      id: '2',
      concepto: 'Mensualidad Diciembre 2023',
      monto: 150000,
      fechaVencimiento: '2023-12-31',
      fechaPago: '2023-12-28',
      estado: 'pagado',
      metodoPago: 'Tarjeta **** 4532',
      numeroTransaccion: 'TXN-2023-12-001',
      descripcion: 'Pago mensual de clases de patinaje - Diciembre 2023'
    },
    {
      id: '3',
      concepto: 'Equipo de Protección',
      monto: 85000,
      fechaVencimiento: '2024-01-15',
      estado: 'vencido',
      descripcion: 'Casco, rodilleras y coderas de seguridad'
    },
    {
      id: '4',
      concepto: 'Clase Particular',
      monto: 50000,
      fechaVencimiento: '2024-01-20',
      estado: 'procesando',
      metodoPago: 'Transferencia Bancaria',
      numeroTransaccion: 'TXN-2024-01-002',
      descripcion: 'Clase particular de técnicas avanzadas'
    }
  ];

  // Datos de ejemplo de métodos de pago
  const metodosEjemplo: MetodoPago[] = [
    {
      id: '1',
      tipo: 'tarjeta',
      nombre: 'Visa Débito',
      numero: '**** **** **** 4532',
      vencimiento: '12/26',
      banco: 'Banco Nacional',
      predeterminado: true
    },
    {
      id: '2',
      tipo: 'cuenta_bancaria',
      nombre: 'Cuenta Ahorros',
      numero: '**** **** 1234',
      banco: 'Banco Popular',
      predeterminado: false
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pagado': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      case 'procesando': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'pagado': return 'Pagado';
      case 'pendiente': return 'Pendiente';
      case 'vencido': return 'Vencido';
      case 'procesando': return 'Procesando';
      default: return estado;
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pagado': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'pendiente': return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'vencido': return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      case 'procesando': return <ClockIcon className="h-5 w-5 text-blue-600" />;
      default: return <XCircleIcon className="h-5 w-5 text-gray-600" />;
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

  const getTipoMetodoIcon = (tipo: string) => {
    switch (tipo) {
      case 'tarjeta': return <CreditCardIcon className="h-5 w-5" />;
      case 'cuenta_bancaria': return <BanknotesIcon className="h-5 w-5" />;
      case 'efectivo': return <BanknotesIcon className="h-5 w-5" />;
      default: return <CreditCardIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#B3E5E8] to-[#019AA9]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#F8B305] p-2 rounded-full">
                <CreditCardIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Pagos</h1>
            </div>
            
            {/* Balance Summary */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Saldo Pendiente</div>
                <div className="text-xl font-bold text-red-600">
                  {formatCurrency(235000)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Próximo Vencimiento</div>
                <div className="text-lg font-semibold text-gray-900">
                  31 Ene 2024
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8">
            {[
              { id: 'pagos', label: 'Pagos Pendientes', icon: ClockIcon },
              { id: 'metodos', label: 'Métodos de Pago', icon: CreditCardIcon },
              { id: 'historial', label: 'Historial', icon: DocumentTextIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#019AA9] text-[#019AA9]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'pagos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payments List */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Estado de Pagos
                  </h2>
                  
                  <div className="space-y-4">
                    {pagosEjemplo.map((pago) => (
                      <motion.div
                        key={pago.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedPago(pago)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getEstadoIcon(pago.estado)}
                              <h3 className="font-semibold text-gray-900">{pago.concepto}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(pago.estado)}`}>
                                {getEstadoTexto(pago.estado)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <BanknotesIcon className="h-4 w-4 mr-1" />
                                {formatCurrency(pago.monto)}
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                Vence: {formatDate(pago.fechaVencimiento)}
                              </div>
                              {pago.fechaPago && (
                                <div className="flex items-center">
                                  <CheckCircleIcon className="h-4 w-4 mr-1 text-green-600" />
                                  Pagado: {formatDate(pago.fechaPago)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPago(pago);
                              }}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            {pago.estado === 'pendiente' && (
                              <Button
                                className="bg-[#019AA9] hover:bg-[#017A87] text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Lógica para pagar
                                }}
                              >
                                Pagar
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Payment Details Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedPago ? 'Detalles del Pago' : 'Resumen de Pagos'}
                  </h2>
                  
                  {selectedPago ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {selectedPago.concepto}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {selectedPago.descripcion}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Monto:</span>
                          <span className="font-bold text-lg">{formatCurrency(selectedPago.monto)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Estado:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(selectedPago.estado)}`}>
                            {getEstadoTexto(selectedPago.estado)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Vencimiento:</span>
                          <span className="font-medium">{formatDate(selectedPago.fechaVencimiento)}</span>
                        </div>
                        {selectedPago.fechaPago && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Fecha de Pago:</span>
                            <span className="font-medium">{formatDate(selectedPago.fechaPago)}</span>
                          </div>
                        )}
                        {selectedPago.metodoPago && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Método:</span>
                            <span className="font-medium">{selectedPago.metodoPago}</span>
                          </div>
                        )}
                        {selectedPago.numeroTransaccion && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Transacción:</span>
                            <span className="font-medium text-xs">{selectedPago.numeroTransaccion}</span>
                          </div>
                        )}
                      </div>
                      
                      {selectedPago.estado === 'pendiente' && (
                        <div className="pt-4 border-t">
                          <Button className="w-full bg-[#019AA9] hover:bg-[#017A87] text-white">
                            Pagar Ahora
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Selecciona un pago para ver los detalles
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-lg font-semibold text-red-600">2</div>
                          <div className="text-sm text-red-800">Pagos pendientes</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-lg font-semibold text-green-600">1</div>
                          <div className="text-sm text-green-800">Pago completado</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-lg font-semibold text-blue-600">1</div>
                          <div className="text-sm text-blue-800">En procesamiento</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'metodos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Métodos de Pago
                </h2>
                <Button
                  onClick={() => setShowAddMethod(true)}
                  className="bg-[#019AA9] hover:bg-[#017A87] text-white"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Agregar Método
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metodosEjemplo.map((metodo) => (
                  <motion.div
                    key={metodo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getTipoMetodoIcon(metodo.tipo)}
                        <span className="font-medium">{metodo.nombre}</span>
                      </div>
                      {metodo.predeterminado && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Predeterminado
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>{metodo.numero}</div>
                      {metodo.banco && <div>{metodo.banco}</div>}
                      {metodo.vencimiento && <div>Vence: {metodo.vencimiento}</div>}
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" className="flex-1 text-xs">
                        Editar
                      </Button>
                      <Button variant="outline" className="flex-1 text-xs">
                        Eliminar
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'historial' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Historial de Pagos
              </h2>
              
              <div className="space-y-4">
                {pagosEjemplo.filter(p => p.estado === 'pagado').map((pago) => (
                  <div key={pago.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          <h3 className="font-semibold text-gray-900">{pago.concepto}</h3>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Pagado
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>{formatCurrency(pago.monto)}</div>
                          <div>Pagado: {pago.fechaPago && formatDate(pago.fechaPago)}</div>
                          <div>{pago.metodoPago}</div>
                          <div className="text-xs">{pago.numeroTransaccion}</div>
                        </div>
                      </div>
                      
                      <Button variant="outline">
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        Recibo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Pagos;