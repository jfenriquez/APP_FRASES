import React, {useContext, useEffect, useState} from 'react';

import {View, TouchableOpacity, Text, useColorScheme} from 'react-native';
//import {styles} from '../theme/appTheme';
import {ThemeContext} from '../context/themeContext/ThemeContext';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Divider, Menu, MD2Colors, IconButton} from 'react-native-paper';
const ChangeTheme = () => {
  const {setDarkTheme, setLightTheme, setLemonTheme, setCoffeTheme} =
    React.useContext(ThemeContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        // ...styles.globalMargin,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View
        style={{
          paddingTop: 5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              rippleColor="rgba(92, 255, 136, 0.496)"
              style={{backgroundColor: colors.primary, height: 30, width: 30}}
              onPress={openMenu}
              icon={props => (
                <Icon
                  style={{color: colors.background}}
                  name="theme-light-dark"
                  size={26}
                  color={colors.text}
                />
              )}
            />
          }>
          <Menu.Item
            onPress={() => {
              setDarkTheme();
            }}
            title="oscuro"
          />
          <Menu.Item
            onPress={() => {
              setLightTheme();
            }}
            title="claro"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setLemonTheme();
            }}
            title="lemon"
          />
          <Menu.Item
            onPress={() => {
              setCoffeTheme();
            }}
            title="coffe"
          />
        </Menu>
      </View>
    </View>
  );
};

export default ChangeTheme;
