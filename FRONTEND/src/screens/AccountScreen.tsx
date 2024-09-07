import React, {useContext, useEffect} from 'react';

import Login from '../components/forms/Login';
import {Avatar, Button, IconButton, Text} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from '../context/themeContext/ThemeContext';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountScreen = () => {
  const {status, signOut, user} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!user ? (
        <Login />
      ) : (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <Avatar.Text size={140} label={user?.name.charAt(0).toUpperCase()} />
          <Text
            variant="titleLarge"
            style={{
              color: colors.text,
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: 35,
            }}>
            {`
            ¡Bienvenido, ${user?.name} Estamos encantados de tenerte de vuelta. Explora y disfruta de todo lo que hemos preparado para ti,Revisa tus frases en tus favoritos.`}
          </Text>
          {/* salir */}

          <IconButton
            rippleColor="rgba(255, 92, 92, 0.528)"
            style={[styles.iconButton, {backgroundColor: colors.primary}]}
            onPress={signOut}
            icon={props => (
              <IconMC
                name="account-arrow-left-outline"
                style={{color: colors.background, ...styles.icon}}
                {...props}
              />
            )}
          />
          <Text style={{color: colors.text}}>salir</Text>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  iconButton: {
    //borderRadius: 60,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
  },
});
