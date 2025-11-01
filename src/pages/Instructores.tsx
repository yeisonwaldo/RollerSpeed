import React from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/solid';

const Instructores: React.FC = () => {
  const instructores = [
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      especialidad: "Patinaje Artístico",
      experiencia: "15 años",
      certificaciones: ["Instructor Certificado FIRS", "Entrenador Nacional"],
      descripcion: "Especialista en técnicas avanzadas de patinaje artístico y coreografía. Ha entrenado a múltiples campeones nacionales.",
      imagen: "/src/assets/images/gallery/instructor1.jpg",
      logros: ["Campeón Nacional 2010-2012", "Instructor del Año 2020", "Más de 200 estudiantes entrenados"],
      rating: 5
    },
    {
      id: 2,
      nombre: "María González",
      especialidad: "Patinaje de Velocidad",
      experiencia: "12 años",
      certificaciones: ["Entrenadora Olímpica", "Especialista en Velocidad"],
      descripcion: "Experta en técnicas de velocidad y resistencia. Enfoque en desarrollo de atletas de alto rendimiento.",
      imagen: "/src/assets/images/gallery/instructor2.jpg",
      logros: ["Récord Nacional Juvenil", "Entrenadora Olímpica 2016", "Medalla de Oro Panamericanos"],
      rating: 5
    },
    {
      id: 3,
      nombre: "Diego Martínez",
      especialidad: "Patinaje Recreativo",
      experiencia: "8 años",
      certificaciones: ["Instructor Básico Certificado", "Especialista en Niños"],
      descripcion: "Especializado en enseñanza para principiantes y niños. Metodología divertida y segura para todas las edades.",
      imagen: "/src/assets/images/gallery/instructor3.jpg",
      logros: ["Instructor Favorito de Niños", "Más de 500 estudiantes principiantes", "Especialista en Seguridad"],
      rating: 5
    },
    {
      id: 4,
      nombre: "Ana Sofía López",
      especialidad: "Patinaje Freestyle",
      experiencia: "10 años",
      certificaciones: ["Instructora Freestyle Avanzada", "Juez Nacional"],
      descripcion: "Experta en trucos y acrobacias sobre patines. Enfoque en creatividad y expresión personal.",
      imagen: "/src/assets/images/gallery/instructor4.jpg",
      logros: ["Campeona Nacional Freestyle", "Creadora de 15 trucos únicos", "Influencer con 50k seguidores"],
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#019AA9] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nuestros <span className="text-yellow-400">Instructores</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Conoce al equipo de profesionales que te guiarán en tu aventura sobre ruedas
            </p>
            <div className="flex justify-center items-center space-x-8 text-lg">
              <div className="flex items-center">
                <TrophyIcon className="h-6 w-6 mr-2 text-yellow-400" />
                <span>Certificados</span>
              </div>
              <div className="flex items-center">
                <StarIcon className="h-6 w-6 mr-2 text-yellow-400" />
                <span>Experimentados</span>
              </div>
              <div className="flex items-center">
                <HeartIcon className="h-6 w-6 mr-2 text-yellow-400" />
                <span>Apasionados</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructores Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {instructores.map((instructor) => (
              <motion.div
                key={instructor.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={instructor.imagen}
                    alt={instructor.nombre}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{instructor.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{instructor.nombre}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {instructor.experiencia}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <AcademicCapIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-lg font-semibold text-indigo-600">{instructor.especialidad}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{instructor.descripcion}</p>
                  
                  {/* Certificaciones */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Certificaciones:</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.certificaciones.map((cert, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Logros */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrophyIcon className="h-4 w-4 text-yellow-500 mr-1" />
                      Logros Destacados:
                    </h4>
                    <ul className="space-y-1">
                      {instructor.logros.map((logro, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {logro}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#019AA9] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar tu entrenamiento?
            </h2>
            <p className="text-xl mb-8">
              Nuestros instructores están esperando para ayudarte a alcanzar tus metas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Reservar Clase
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white hover:bg-white hover:text-[#019AA9] font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Más Información
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Instructores;