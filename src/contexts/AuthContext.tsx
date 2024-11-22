import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Role, UserProfile } from '../types';
import { apiClient, setApiToken } from '../lib/apiClient';

type AuthContextType = {
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (roleName: string) => boolean;
  apiToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiToken, setApiToken] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        await fetchUserProfile(session.user.id);
        await authenticateWithAPI(session.access_token);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchUserProfile(session.user.id);
        await authenticateWithAPI(session.access_token);
      } else {
        setUserProfile(null);
        setApiToken(null);
      }
    });
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) throw profileError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select(`
          roles (
            role_id,
            role_name
          )
        `)
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      setUserProfile({
        ...profile,
        roles: roles.map(r => r.roles),
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const hasRole = (roleName: string): boolean => {
    return userProfile?.roles?.some(role => role.role_name === roleName) || false;
  };

  const authenticateWithAPI = async (supabaseToken: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        supabase_token: supabaseToken
      });
      setApiToken(response.data.token);
    } catch (error) {
      console.error('Error authenticating with API:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        userProfile, 
        loading, 
        signIn, 
        signUp, 
        signOut,
        hasRole,
        apiToken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}