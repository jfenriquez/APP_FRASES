import React, {useState, useContext, useEffect} from 'react';
import {Alert, Button, Share, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Card,
  Dialog,
  IconButton,
  PaperProvider,
  Portal,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../context/themeContext/ThemeContext';
import Clipboard from '@react-native-clipboard/clipboard';

import {AuthContext} from '../context/AuthContext';
import {useFavorite} from '../hooks/useFavorite';

const Copiar = async (text: string) => {
  Clipboard.setString(text);
};

const Compartir = async text => {
  try {
    await Share.share({
      message: text,
    });
  } catch (error) {
    console.log(error);
  }
};

////////COMPONENT
const CardFrase = (props: {
  frase: string;
  id: number;
  isFavorite: boolean;
  isDislike: boolean;
  onToggleFavorite: () => void;
  onToggleDislike: () => void;
}) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {user, status} = useContext(AuthContext);

  const {isFavorite, isDislike} = props;
  const [iconFavorite, setIconFavorite] = useState<boolean>();
  const {loading} = useFavorite();

  /* useEffect(() => {
    setIconFavorite(props.isFavorite);
  }, [props.isFavorite]); */

  return (
    <Card style={{backgroundColor: colors.card, margin: 10}}>
      <Card.Content>
        <Text
          variant="titleLarge"
          style={{
            color: colors.text,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          {props.frase}
        </Text>
      </Card.Content>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Card.Actions>
          <IconButton
            rippleColor="rgba(92, 255, 136, 0.496)"
            style={{...styles.iconButton, backgroundColor: colors.primary}}
            onPress={() => Copiar(props.frase)}
            icon={props => (
              <Icon
                name="content-copy"
                style={{color: colors.background, ...styles.icon}}
                {...props}
              />
            )}
          />
          {/* COMPARTIR */}
          <IconButton
            rippleColor="rgba(13, 85, 253, 0.518)"
            style={{...styles.iconButton, backgroundColor: colors.border}}
            onPress={() => Compartir(props.frase)}
            icon={props => (
              <Icon
                name="share"
                style={{color: colors.background, ...styles.icon}}
                {...props}
              />
            )}
          />
          {/* FAVORITO */}
          <IconButton
            rippleColor="rgba(255, 92, 92, 0.528)"
            style={{...styles.iconButton, backgroundColor: colors.primary}}
            onPress={
              user
                ? props.onToggleFavorite
                : () =>
                    Alert.alert(
                      'Iniciar sesión',
                      'Debes iniciar sesión para guardar tus favoritos ',
                    )
            }
            icon={props => (
              <IconMC
                name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
                style={{color: colors.background, ...styles.icon}}
                {...props}
              />
            )}
            //disabled={status === 'authenticated' ? false : true}
          />

          <IconButton
            rippleColor="rgba(255, 92, 92, 0.528)"
            style={[styles.iconButton, {backgroundColor: colors.primary}]}
            onPress={
              user
                ? props.onToggleDislike
                : () =>
                    Alert.alert(
                      'Iniciar sesión',
                      'Debes iniciar sesión para guardar tus favoritos ',
                    )
            }
            icon={props => (
              <IconMC
                name={isDislike ? 'thumb-down' : 'thumb-down-outline'}
                style={{color: colors.background, ...styles.icon}}
                {...props}
              />
            )}
            //disabled={status === 'authenticated' ? false : true}
          />
        </Card.Actions>
      </View>
    </Card>
  );
};

export default CardFrase;

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 60,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
});

const AlertIniciaSession = () => {
  const [visible, setVisible] = React.useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
