import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components';
import { LogoTitulo, ImagenEscuelas, IconoMision, IconoVision, IconoValores, LogoBienvenido, Imagen1Servicio, Imagen2Servicio, Imagen3Servicio } from '../assets/images';

const Inicio: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-start space-y-4">
                <img 
                  src={LogoBienvenido} 
                  alt="Roller Speed" 
                  className="h-32 md:h-48 w-auto"
                />
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Únete a nosotros para mejorar tus habilidades deportivas con entrenadores expertos y programas de entrenamiento personalizados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto bg-[#019AA9] hover:bg-[#018a95] text-white">
                    Inicia Sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-[#F8B305] hover:bg-[#e6a004] text-gray-900">
                    Inscríbete ahora
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={ImagenEscuelas}
                  alt="Escuelas de patinaje Roller Speed"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nosotros" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Sobre nosotros
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                En Roller Speed formamos a niños, jóvenes y adultos en el patinaje como deporte favorito para la vida. Contamos con entrenadores técnicos profesionales, fomentando el amor por el deporte y la excelencia en la enseñanza y la promoción de talentos e intercambio internacional.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img src={IconoVision} alt="Visión" className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visión</h3>
                    <p className="text-gray-600">
                      Ser reconocidos como el patinaje de la región Caribe, por la calidad en la formación deportiva, la innovación en la enseñanza y la promoción de talentos a nivel nacional e internacional.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img src={IconoMision} alt="Misión" className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Misión</h3>
                    <p className="text-gray-600">
                      Brindar una formación integral en patinaje que desarrolle habilidades técnicas, disciplina y valores deportivos. Ofrecemos programas de calidad con expertos entrenadores para deportistas de todas las edades y niveles deportivos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img src={IconoValores} alt="Valores" className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Valores</h3>
                    <p className="text-gray-600">
                      Disciplina, constancia y compromiso en cada entrenamiento.
                      Respeto hacia compañeros, entrenadores y la comunidad.
                      Excelencia: esfuerzo por mejorar cada día a día.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              En Roller Speed ofrecemos programas de patinaje para todas las edades y niveles, combinando diversión, técnica y disciplina para impulsar el desarrollo deportivo de cada alumno.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={Imagen1Servicio} 
                  alt="Clases para Niños y Jóvenes" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clases para Niños y Jóvenes</h3>
                <p className="text-gray-600 mb-4">
                  Programas especializados para el desarrollo de habilidades básicas y avanzadas en patinaje.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Edades: 4-17 años</p>
                  <p>• Duración: 1.5 horas</p>
                  <p>• Grupos pequeños</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={Imagen2Servicio} 
                  alt="Entrenamiento Avanzado" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Entrenamiento Avanzado</h3>
                <p className="text-gray-600 mb-4">
                  Para patinadores con experiencia que buscan perfeccionar su técnica y competir.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Nivel intermedio-avanzado</p>
                  <p>• Entrenamiento personalizado</p>
                  <p>• Preparación para competencias</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={Imagen3Servicio} 
                  alt="Preparación para Competencias" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Preparación para Competencias</h3>
                <p className="text-gray-600 mb-4">
                  Entrenamiento intensivo para competidores que buscan destacar en torneos.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Entrenamiento intensivo</p>
                  <p>• Técnicas avanzadas</p>
                  <p>• Acompañamiento en competencias</p>
                </div>
              </div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mantente al día con nuestros eventos, competencias y actividades especiales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Campeonato Regional de Velocidad</h3>
                  <p className="text-sm text-gray-500">15 de Noviembre, 2025</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Competencia regional donde nuestros atletas demostrarán sus habilidades en pista de velocidad.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📍 Pista Municipal</span>
                <span className="text-sm font-medium text-[#019AA9]">Competencia</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-orange-400 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Jornada de Puertas Abiertas</h3>
                  <p className="text-sm text-gray-500">22 de Noviembre, 2025</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Ven y conoce nuestras instalaciones, entrenadores y programas. Clases de prueba gratuitas.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📍 Roller Speed</span>
                <span className="text-sm font-medium text-orange-600">Evento Abierto</span>
              </div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#019AA9]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para comenzar tu aventura?
            </h2>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Únete a nuestra comunidad y descubre todo tu potencial sobre ruedas
            </p>
            <Link to="/contacto">
              <Button variant="secondary" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                Contáctanos Ahora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;