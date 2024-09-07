import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/themeContext/ThemeContext';
import {RootStackParamList} from '../../interfaces/NavigationInterface';
import Login from './Login';
import {AuthContext} from '../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('aaaa');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('123456');
  const [password2, setPassword2] = useState('123456');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {signUp, errorMessage, removeErrorMessage} = useContext(AuthContext);

  const handleRegister = () => {
    if (password !== password2) {
      return Alert.alert('Las contraseñas no coinciden');
    }
    try {
      signUp({name, email, password});

      Keyboard.dismiss();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
          }}>
          {/* <BackgroundWithShapes /> */}

          {/* <BlurView blurType="light" blurAmount={10} style={styles.blurView}> */}
          <View
            style={{
              backgroundColor: colors.card,
              ...styles.formContainer,
            }}>
            <LottieView
              style={{width: '30%', height: '30%', position: 'relative'}}
              source={require('../../assets/CatAnimation.json')}
              autoPlay
              loop
              resizeMode="cover"
              //onAnimationFinish={}
            />
            <Text style={{color: colors.text, ...styles.formTitle}}>
              Formulario de registro
            </Text>

            <TextInput
              style={{
                ...styles.inputField,
                borderColor: colors.text,
                color: colors.text,
              }}
              placeholder="Nombre"
              placeholderTextColor={colors.text}
              value={name}
              textContentType="name"
              onChangeText={text => setName(text)}
            />

            <TextInput
              style={{
                ...styles.inputField,
                borderColor: colors.text,
                color: colors.text,
              }}
              placeholder="Correo electrónico"
              placeholderTextColor={colors.text}
              value={email}
              textContentType="emailAddress"
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />

            <TextInput
              style={{
                ...styles.inputField,
                borderColor: colors.text,
                color: colors.text,
              }}
              placeholder="Contraseña"
              placeholderTextColor={colors.text}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TextInput
              style={{
                ...styles.inputField,
                borderColor: colors.text,
                color: colors.text,
              }}
              placeholder="repetir Contraseña"
              placeholderTextColor={colors.text}
              secureTextEntry={true}
              value={password2}
              onChangeText={text => setPassword2(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={handleRegister}
                style={{
                  ...styles.loginButton,
                  backgroundColor: colors.primary,
                }}>
                <Text style={{color: colors.background}}>REGISTRARSE</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </BlurView> */}
        </View>
      </ScrollView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  formContainer: {
    width: '90%',
    height: '70%',
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    width: 300,
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
  },
  loginButton: {
    marginTop: 0,
    padding: 12,
    borderRadius: 20,
  },
});
