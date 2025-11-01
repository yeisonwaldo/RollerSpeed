import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para el sistema de autenticación
export type UserRole = 'estudiante' | 'instructor' | 'administrador';

export interface User {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  role: UserRole;
  avatar?: string;
  telefono?: string;
  fechaNacimiento?: string;
  nivelExperiencia?: string;
  especialidad?: string;
  fechaIngreso?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface DashboardPermissions {
  canViewStudents: boolean;
  canManageStudents: boolean;
  canViewInstructors: boolean;
  canManageInstructors: boolean;
  canViewClasses: boolean;
  canManageClasses: boolean;
  canViewReports: boolean;
  canManageSystem: boolean;
}

// Usuarios de prueba con credenciales falsas
const TEST_USERS: User[] = [
  // Estudiantes
  {
    id: '1',
    email: 'estudiante1@rollerspeed.com',
    password: 'estudiante123',
    nombre: 'Ana',
    apellido: 'García',
    role: 'estudiante',
    telefono: '+57 300 123 4567',
    fechaNacimiento: '1995-03-15',
    nivelExperiencia: 'Principiante',
    avatar: '👩‍🎓'
  },
  {
    id: '2',
    email: 'estudiante2@rollerspeed.com',
    password: 'estudiante456',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    role: 'estudiante',
    telefono: '+57 301 234 5678',
    fechaNacimiento: '1998-07-22',
    nivelExperiencia: 'Intermedio',
    avatar: '👨‍🎓'
  },
  
  // Instructores
  {
    id: '3',
    email: 'instructor1@rollerspeed.com',
    password: 'instructor123',
    nombre: 'María',
    apellido: 'López',
    role: 'instructor',
    telefono: '+57 302 345 6789',
    fechaNacimiento: '1988-11-10',
    especialidad: 'Patinaje Artístico',
    fechaIngreso: '2020-01-15',
    avatar: '👩‍🏫'
  },
  {
    id: '4',
    email: 'instructor2@rollerspeed.com',
    password: 'instructor456',
    nombre: 'Diego',
    apellido: 'Martínez',
    role: 'instructor',
    telefono: '+57 303 456 7890',
    fechaNacimiento: '1985-05-18',
    especialidad: 'Patinaje de Velocidad',
    fechaIngreso: '2019-08-20',
    avatar: '👨‍🏫'
  },
  
  // Administradores
  {
    id: '5',
    email: 'admin@rollerspeed.com',
    password: 'admin123',
    nombre: 'Laura',
    apellido: 'Fernández',
    role: 'administrador',
    telefono: '+57 304 567 8901',
    fechaNacimiento: '1982-09-25',
    fechaIngreso: '2018-03-01',
    avatar: '👩‍💼'
  },
  {
    id: '6',
    email: 'superadmin@rollerspeed.com',
    password: 'superadmin123',
    nombre: 'Roberto',
    apellido: 'Silva',
    role: 'administrador',
    telefono: '+57 305 678 9012',
    fechaNacimiento: '1980-12-08',
    fechaIngreso: '2017-06-15',
    avatar: '👨‍💼'
  }
];

// Función para obtener permisos según el rol
export const getRolePermissions = (role: UserRole): DashboardPermissions => {
  switch (role) {
    case 'estudiante':
      return {
        canViewStudents: false,
        canManageStudents: false,
        canViewInstructors: true,
        canManageInstructors: false,
        canViewClasses: true,
        canManageClasses: false,
        canViewReports: false,
        canManageSystem: false,
      };
    case 'instructor':
      return {
        canViewStudents: true,
        canManageStudents: true,
        canViewInstructors: true,
        canManageInstructors: false,
        canViewClasses: true,
        canManageClasses: true,
        canViewReports: true,
        canManageSystem: false,
      };
    case 'administrador':
      return {
        canViewStudents: true,
        canManageStudents: true,
        canViewInstructors: true,
        canManageInstructors: true,
        canViewClasses: true,
        canManageClasses: true,
        canViewReports: true,
        canManageSystem: true,
      };
    default:
      return {
        canViewStudents: false,
        canManageStudents: false,
        canViewInstructors: false,
        canManageInstructors: false,
        canViewClasses: false,
        canManageClasses: false,
        canViewReports: false,
        canManageSystem: false,
      };
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar si hay un usuario guardado en localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('rollerspeed_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('rollerspeed_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Buscar usuario en la lista de prueba
    const foundUser = TEST_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      // Crear una copia del usuario sin la contraseña para el estado
      const { password: _, ...userWithoutPassword } = foundUser;
      const authenticatedUser = userWithoutPassword as User;
      
      setUser(authenticatedUser);
      localStorage.setItem('rollerspeed_user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rollerspeed_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook para obtener permisos del usuario actual
export const usePermissions = (): DashboardPermissions => {
  const { user } = useAuth();
  return user ? getRolePermissions(user.role) : getRolePermissions('estudiante');
};

// Exportar usuarios de prueba para referencia
export { TEST_USERS };