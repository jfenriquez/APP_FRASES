import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  View,
} from 'react-native';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import ChangeTheme from '../components/ChangeTheme';
import {ThemeContext} from '../context/themeContext/ThemeContext';
import CardFrase from '../components/CardFrase';
import {RootStackParamList} from '../interfaces/NavigationInterface';
import {AuthContext} from '../context/AuthContext';
import {useFavorite} from '../hooks/useFavorite';
import {getFavoriteXUser} from '../api/endpoints/favorites';
import {getDislikeXUser} from '../api/endpoints/dislikes';
import {InterfacePhraseData} from '../interfaces/PhrasesInterface';

const FavoriteScreen = () => {
  const {status, user} = useContext(AuthContext);
  const {
    favorites,
    dislikes,
    setDislikes,
    setFavorites,
    toggleDislike,
    toggleFavorite,
    loading,
  } = useFavorite();
  const [phrasesFavorites, setPhrasesFavorites] = useState<
    InterfacePhraseData[]
  >([]);

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  ////FAVORITOS_AND_DISLIKES
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener favoritos Y dislikes
        if (user) {
          const favoritesResponse = await getFavoriteXUser(user.id);
          const dislikesResponse = await getDislikeXUser(user.id);
          ////favorites
          if (favoritesResponse && favoritesResponse.data) {
            const favoritesData = new Set(
              favoritesResponse.data.map(item => item.ID),
            );
            setFavorites(favoritesData);
            setPhrasesFavorites(favoritesResponse.data);
          } else {
            console.error('Favorites response is undefined or invalid');
            setFavorites(new Set()); // Inicializa los favoritos como un set vacío
          }
          ////dislikes
          if (dislikesResponse && dislikesResponse.data) {
            const dislikesData = new Set(
              dislikesResponse.data.map(item => item.ID),
            );
            setDislikes(dislikesData);
          } else {
            console.error('dislikes response is undefined or invalid');
            setDislikes(new Set()); // Inicializa los favoritos como un set vacío
          }
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    try {
      // Obtener favoritos Y dislikes
      if (user) {
        const favoritesResponse = await getFavoriteXUser(user.id);
        ////favorites
        if (favoritesResponse && favoritesResponse.data) {
          setPhrasesFavorites(favoritesResponse.data);
        }
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  ////update viewchange fetch favoritos
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [user, loading]),
  );

  return (
    <>
      {status === 'authenticated' ? (
        <>
          <View
            style={{
              backgroundColor: colors.background,
              flex: 1,
            }}>
            <ChangeTheme />

            {/* FRASES */}
            <Text
              style={{
                fontSize: 25,
                justifyContent: 'center',
                textAlign: 'center',
                color: colors.text,
                margin: 10,
                fontWeight: 'bold',
              }}>
              FRASES FAVORITAS
            </Text>
            <FlatList
              extraData={favorites}
              data={phrasesFavorites}
              renderItem={({item}) => (
                <CardFrase
                  frase={item.FRASE}
                  isDislike={dislikes.has(item.ID)}
                  isFavorite={favorites.has(item.ID) || true}
                  onToggleDislike={() => toggleDislike(item.ID)}
                  onToggleFavorite={() => toggleFavorite(item.ID)}
                  key={item.ID}
                  id={item.ID}
                />
              )}
            />
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
          }}>
          <Button
            title="Go to Account"
            onPress={() => navigation.navigate('AccountScreen')}
          />
        </View>
      )}
    </>
  );
};

export default FavoriteScreen;
