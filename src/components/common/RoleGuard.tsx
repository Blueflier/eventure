import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ roles, children, fallback = null }: Props) {
  const { hasRole } = useAuth();

  const hasRequiredRole = roles.some(role => hasRole(role));

  if (!hasRequiredRole) {
    return fallback ? <View>{fallback}</View> : null;
  }

  return <View>{children}</View>;
}