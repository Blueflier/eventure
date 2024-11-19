import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { supabase } from '../../lib/supabase';
import { UserProfile } from '../../types';

export default function ProfileScreen() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    user_id: session?.user?.id || '',
    email: session?.user?.email || '',
    name: '',
    profile_picture: '',
    bio: '',
    community_affiliation: '',
    created_at: new Date().toISOString(),
    two_factor_enabled: false,
    average_rating: 0,
  });

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session?.user?.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`${session?.user?.id}/profile.jpg`, result.assets[0].uri);

        if (error) throw error;

        setProfile({
          ...profile,
          profile_picture: data.path,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader profile={profile} onImagePress={handleImagePick} />

      <View style={styles.form}>
        <Input
          label="Name"
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />

        <Input
          label="Bio"
          value={profile.bio}
          onChangeText={(text) => setProfile({ ...profile, bio: text })}
          multiline
          numberOfLines={4}
          style={styles.bioInput}
        />

        <Input
          label="Community Affiliation"
          value={profile.community_affiliation}
          onChangeText={(text) => setProfile({ ...profile, community_affiliation: text })}
        />

        <Button
          title="Update Profile"
          onPress={handleUpdateProfile}
          loading={loading}
          style={styles.updateButton}
        />

        <Button
          title="Delete Account"
          onPress={() => {
            Alert.alert(
              'Delete Account',
              'Are you sure you want to delete your account? This action cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      const { error } = await supabase.auth.admin.deleteUser(
                        session?.user?.id as string
                      );
                      if (error) throw error;
                    } catch (error) {
                      Alert.alert('Error', 'Failed to delete account');
                    }
                  },
                },
              ]
            );
          }}
          style={styles.deleteButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
    gap: 15,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  updateButton: {
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
});