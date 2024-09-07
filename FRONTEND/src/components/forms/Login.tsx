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
import {AuthContext} from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('123456');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  //CONTEXT
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {signIn,  signOut, errorMessage, removeErrorMessage} =
    useContext(AuthContext);

  const handlerLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    console.log(`Usuario: ${email}, Contraseña: ${password}`);
    signIn({email, password});
    Keyboard.dismiss();
  };

  ////estado login
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('error ', errorMessage, [
        {
          text: 'OK',
          onPress: () => {
            removeErrorMessage();
          },
        },
      ]);
    }
  }, [errorMessage]);

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
              Formulario de inicio de sesión
            </Text>

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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={handlerLogin}
                style={{
                  ...styles.loginButton,
                  backgroundColor: colors.primary,
                }}>
                <Text style={{color: colors.background}}>Iniciar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingLeft: 50,
                  paddingTop: 30,
                  paddingBottom: 10,
                  justifyContent: 'flex-end',
                }}
                onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{color: colors.text, textDecorationLine: 'underline'}}>
                  REGISTRARSE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </BlurView> */}
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

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
