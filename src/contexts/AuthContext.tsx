import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { UserProfile } from '../types';
import { mockUsers } from '../data/mockUsers';

import {
  PlanId,
  PlanFeature,
  getPlanById,
  canUseFeature,
} from '../data/plans';

interface AuthContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  register: (data: {
    nom: string;
    email: string;
    dni: string;
    oposicio: string;
    password: string;
    plan: PlanId | null;
  }) => Promise<{
    success: boolean;
    user?: UserProfile;
    error?: string;
  }>;

  logout: () => void;

  devSwitchUser: (userId: string) => void;

  canUseFeature: (feature: PlanFeature) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const normalizePlan = (
  plan: unknown
): PlanId | null => {
  if (plan === 'pro') {
    return 'pro';
  }

  if (plan === 'basic') {
    return 'basic';
  }

  return null;
};

const normalizeUser = (
  user: UserProfile
): UserProfile => {
  return {
    ...user,
    plan: normalizePlan(user.plan),
  };
};

/**
 * Elimina els usuaris de prova antics que ja no formen
 * part dels usuaris inicials de l'aplicació.
 */
const removeLegacyDemoUsers = (
  users: UserProfile[]
): UserProfile[] => {
  const legacyEmails = new Set([
    'marc.soler@email.cat',
    'laia.guitart@email.cat',
    'jclotet@email.cat',
  ]);

  return users.filter(
    (user) =>
      !legacyEmails.has(
        user.email.trim().toLowerCase()
      )
  );
};

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('auth_users');

    if (saved) {
      try {
        const parsedUsers = JSON.parse(saved);

        if (Array.isArray(parsedUsers)) {
          const normalizedUsers = parsedUsers.map(
            (user: UserProfile) =>
              normalizeUser(user)
          );

          return removeLegacyDemoUsers(
            normalizedUsers
          );
        }

        return mockUsers.map(normalizeUser);
      } catch {
        return mockUsers.map(normalizeUser);
      }
    }

    return mockUsers.map(normalizeUser);
  });

  const [currentUser, setCurrentUser] =
    useState<UserProfile | null>(() => {
      const saved = localStorage.getItem(
        'auth_current_user'
      );

      if (saved) {
        try {
          const parsedUser = JSON.parse(saved);

          if (
            parsedUser &&
            typeof parsedUser === 'object'
          ) {
            const normalizedUser =
              normalizeUser(parsedUser);

            const legacyEmails = new Set([
              'marc.soler@email.cat',
              'laia.guitart@email.cat',
              'jclotet@email.cat',
            ]);

            if (
              legacyEmails.has(
                normalizedUser.email
                  .trim()
                  .toLowerCase()
              )
            ) {
              return null;
            }

            return normalizedUser;
          }

          return null;
        } catch {
          return null;
        }
      }

      return null;
    });

  useEffect(() => {
    localStorage.setItem(
      'auth_users',
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        'auth_current_user',
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem(
        'auth_current_user'
      );
    }
  }, [currentUser]);

  const login = async (
    email: string,
    password: string
  ) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user = users.find(
      (u) =>
        u.email.trim().toLowerCase() ===
        normalizedEmail
    );

    if (!user) {
      return {
        success: false,
        error:
          'Correu electrònic o contrasenya incorrectes',
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        error:
          'Correu electrònic o contrasenya incorrectes',
      };
    }

    const normalizedUser: UserProfile =
      normalizeUser(user);

    setCurrentUser(normalizedUser);

    return {
      success: true,
    };
  };

  const register = async (data: {
    nom: string;
    email: string;
    dni: string;
    oposicio: string;
    password: string;
    plan: PlanId | null;
  }) => {
    const normalizedEmail =
      data.email.trim().toLowerCase();

    const normalizedDni =
      data.dni.trim().toUpperCase();

    const emailExists = users.some(
      (u) =>
        u.email.trim().toLowerCase() ===
        normalizedEmail
    );

    if (emailExists) {
      return {
        success: false,
        error:
          'El correu electrònic ja està registrat',
      };
    }

    const dniExists = users.some(
      (u) =>
        u.dni.trim().toUpperCase() ===
        normalizedDni
    );

    if (dniExists) {
      return {
        success: false,
        error: 'El DNI ja està registrat',
      };
    }

    if (data.plan) {
      const selectedPlan = getPlanById(data.plan);

      if (!selectedPlan) {
        return {
          success: false,
          error:
            'El pla seleccionat no és vàlid',
        };
      }
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      nom: data.nom.trim(),
      fullName: data.nom.trim(),
      email: normalizedEmail,
      password: data.password,
      dni: normalizedDni,
      oposicio: data.oposicio,
      role: 'alumne',

      estatPagament:
        data.plan === null
          ? 'aprovat'
          : 'pendent',

      dataRegistre:
        new Date().toLocaleDateString('ca-ES'),

      plan: data.plan,
    };

    setUsers((prev) => [
      ...prev,
      newUser,
    ]);

    return {
      success: true,
      user: newUser,
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const devSwitchUser = (
    userId: string
  ) => {
    const targetUser = users.find(
      (user) => user.id === userId
    );

    if (targetUser) {
      const normalizedUser: UserProfile =
        normalizeUser(targetUser);

      setCurrentUser(normalizedUser);
    }
  };

  const userPlan: PlanId | null =
    normalizePlan(currentUser?.plan);

  const userCanUseFeature = (
    feature: PlanFeature
  ): boolean => {
    return canUseFeature(
      userPlan ?? undefined,
      feature
    );
  };

  const isAuthenticated =
    currentUser !== null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        setUsers,
        isAuthenticated,
        login,
        register,
        logout,
        devSwitchUser,
        canUseFeature:
          userCanUseFeature,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(
    AuthContext
  );

  if (!context) {
    throw new Error(
      'useAuth debe ser usado dentro de un AuthProvider'
    );
  }

  return context;
};