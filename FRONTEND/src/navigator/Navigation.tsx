import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Animated, Image, TouchableOpacity} from 'react-native';

import AccountScreen from '../screens/AccountScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {ThemeContext} from '../context/themeContext/ThemeContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Register from '../components/forms/Register';
import FrasesXcategoriaScreen from '../screens/FrasesXcategoriaScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces/NavigationInterface';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function AccountStackNavigator() {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          headerTransparent: true,
          headerTitleStyle: {
            color: colors.text,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const color = {
    primary: '#6200ee',
    inactive: '#ff2424', // Define el color cuando está deseleccionado
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}>
      <Tab.Screen
        name="AccountScreen"
        component={AccountStackNavigator}
        options={{
          tabBarLabel: 'MI CUENTA',
          headerShown: false,
          tabBarLabelStyle: {
            color: colors.primary,
            fontWeight: 'bold',
          },

          tabBarInactiveTintColor: color.inactive,
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="person"
              color={focused ? colors.primary : colors.text}
              size={focused ? size + 5 : size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <MyCustomButton onPress={() => navigation.navigate('HomeScreen')}>
              {renderIconBall()}
            </MyCustomButton>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'FAVORITOS',
          tabBarLabelStyle: {
            color: colors.primary,
            fontWeight: 'bold',
          },
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="favorite"
              color={focused ? colors.primary : colors.text}
              size={focused ? size + 5 : size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function renderIconBall() {
  return (
    <Image
      source={require('./philosopher.png')}
      style={{width: 75, height: 75, top: -15}}
    />
  );
}

//////efectos del boton
interface MyComponentProps {
  children: React.ReactNode; // Allow any valid React node
  onPress: () => void; // Callback for when the button is pressed
}

const MyCustomButton: React.FC<MyComponentProps> = ({
  onPress,
  children,
  ...rest
}) => {
  const scale = new Animated.Value(1); // Create an animated value for scaling

  const onPressIn = () => {
    Animated.timing(scale, {
      toValue: 0.9, // Scale down slightly on press in
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true, // Improve performance (optional)
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scale, {
      toValue: 1, // Scale back to normal on press out
      duration: 100, // Adjust duration as needed
      useNativeDriver: true, // Improve performance (optional)
    }).start();
  };

  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={{transform: [{scale}]}}>{children}</Animated.View>
    </TouchableOpacity>
  );
};
