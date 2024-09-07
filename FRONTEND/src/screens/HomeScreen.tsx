import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import ChangeTheme from '../components/ChangeTheme';
import {ThemeContext} from '../context/themeContext/ThemeContext';

import Icon from 'react-native-vector-icons/MaterialIcons';

import CardFrase from '../components/CardFrase';
import {
  getPhrasesXcategory,
  getPublicCategories,
} from '../api/endpoints/categories';
import {InterfaceCategory} from '../interfaces/CategoriesInterface';
import {
  InterfacePhraseData,
  InterfacePhrases,
} from '../interfaces/PhrasesInterface';
import {getFrases} from '../api/endpoints/phrases';
import SearchInput from '../components/SearchInput';
import {useSearchPhrase} from '../hooks/useSearchPhrase';

import {AuthContext} from '../context/AuthContext';
import {useFavorite} from '../hooks/useFavorite';
import {
  addFavoritePhraseXUser,
  deleteFavoritePhraseXUser,
  getFavoriteXUser,
} from '../api/endpoints/favorites';

import {
  addDislikePhraseXUser,
  deleteDislikePhraseXUser,
  getDislikeXUser,
} from '../api/endpoints/dislikes';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {set} from 'lodash';
import {apiNoAuth} from '../api/api';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {user, status} = useContext(AuthContext);
  const [text, setText] = React.useState('');
  //const [res, setRes] = useState([]);
  const [categories, setCategories] = React.useState<InterfaceCategory[]>([]);
  const [phrase, setPhrase] = useState<InterfacePhraseData[]>([]);

  const [busqueda, setBusqueda] = useState<InterfacePhraseData[]>([]);
  const [nextPage, setNextPage] = useState('');

  const {
    setFavorites,
    favorites,
    setDislikes,
    dislikes,
    toggleFavorite,
    toggleDislike,
    loading,
    setLoading,
  } = useFavorite();

  ///////frases
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getPublicCategories();
        setCategories(res);
        const frases = await getFrases(5, 0);
        setNextPage(frases.nextPage);
        setPhrase(frases.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [text]);

  ////FAVORITOS_AND_DISLIKES
  const fetchData = async () => {
    try {
      console.log('user', status);
      // Obtener favoritos Y dislikes
      if (status === 'authenticated') {
        const favoritesResponse = await getFavoriteXUser();
        const dislikesResponse = await getDislikeXUser();
        ////favorites
        if (favoritesResponse && favoritesResponse.data.length > 0) {
          const favoritesData = new Set(
            favoritesResponse.data.map(item => item.ID),
          );
          setFavorites(favoritesData);
        } else {
          //console.error('Favorites response is undefined or invalid');
          setFavorites(new Set(['Favorites response is undefined or invalid'])); // Inicializa los favoritos como un set vacío
        }
        ////dislikes
        if (dislikesResponse && dislikesResponse.data) {
          const dislikesData = new Set(
            dislikesResponse.data.map(item => item.ID),
          );
          setDislikes(dislikesData);
        } else {
          //console.error('dislikes response is undefined or invalid');
          setDislikes(new Set()); // Inicializa los favoritos como un set vacío
        }
      } else {
        setFavorites(new Set()); // Inicializa los favoritos como un set vacío
        setDislikes(new Set()); // Inicializa los favoritos como un set vacío
        console.log('No hay usuario');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Cargar más datos cuando lleguemos al final de la lista
  const handleLoadMore = async () => {
    if (loading || !nextPage) return; // Si ya está cargando, no hacer nada
    try {
      setLoading(true); // Establece el estado de carga a verda
      const res = await axios.get(nextPage);
      const nuevasFrases: InterfacePhraseData[] = res.data.data;
      const newNextPage = res.data.nextPage; //el siguiente enlace de página
      if (Array.isArray(nuevasFrases)) {
        // Verificar si nuevasFrases es realmente un array
        setPhrase(prevPhrases => [...prevPhrases, ...nuevasFrases]); // Combinar frases existentes con las nuevas
      } else {
        console.log('La respuesta de datos no es un array:', nuevasFrases);
      }
      console.log('handleLoadMore');
      setNextPage(newNextPage);
      setLoading(false); // Establece el estado de carga a falso
    } catch (error) {
      console.log(error);
    }
  };

  /* useEffect(() => {
    fetchData();
  }, [text, user]); */

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Llama a la función de cargar datos
    }, [user, text]), // Dependencias vacías para que solo se ejecute cuando la pantalla se enfoque
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const handlerCategory = async (id: number) => {
    try {
      setLoading(true);
      setPhrase([]);
      const data = await getPhrasesXcategory(id);
      setPhrase(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
        }}>
        <ChangeTheme />

        {/* BUSCADOR AND MODO OSCURO*/}
        <SearchInput
          onDebounce={(text: string) => setText(text)}
          onRes={value => setBusqueda(value)}
        />

        {/* CATEGORIAS */}
        <Text style={{textAlign: 'center', marginTop: 5}}>CATEGORIAS</Text>
        <Divider style={{backgroundColor: colors.text}} />

        <FlatList
          style={{marginTop: 5, marginBottom: 25, maxHeight: 90}}
          horizontal={true}
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={{padding: 10, height: 100}}>
              <Button
                textColor={colors.text}
                style={{backgroundColor: colors.card}}
                mode="contained"
                onPress={() => handlerCategory(item.id)}>
                {item.nombre}
              </Button>
            </TouchableOpacity>
          )}
        />

        {/* FRASES */}
        <Text style={{textAlign: 'center', marginTop: 5}}>
          FRASES POPULARES
        </Text>
        <Divider style={{backgroundColor: colors.text, marginTop: 5}} />
        {text.length > 0 && busqueda.length <= 0 ? (
          <Text style={{flex: 1, textAlign: 'center', marginTop: 5}}>
            Sin resultados
          </Text>
        ) : favorites.size > 0 && text.length > 0 && busqueda.length > 0 ? (
          <FlatList
            extraData={favorites}
            data={busqueda}
            keyExtractor={item => item.ID.toString()}
            renderItem={({item}) => (
              <View style={{height: 'auto'}}>
                <CardFrase
                  isFavorite={favorites.has(item.ID)}
                  onToggleFavorite={() => toggleFavorite(item.ID)}
                  frase={item.FRASE}
                  id={item.ID}
                  isDislike="s"
                />
              </View>
            )}
            ListFooterComponent={renderFooter}
          />
        ) : favorites.size > 0 || !user ? (
          <FlatList
            extraData={favorites}
            data={phrase}
            keyExtractor={item => item.ID.toString()}
            renderItem={({item}) => (
              <View style={{height: 'auto'}}>
                <CardFrase
                  isFavorite={favorites.has(item.ID)}
                  onToggleFavorite={() => toggleFavorite(item.ID)}
                  isDislike={dislikes.has(item.ID)}
                  onToggleDislike={() => toggleDislike(item.ID)}
                  frase={item.FRASE}
                  id={item.ID}
                  key={item.ID}
                />
              </View>
            )}
            onEndReachedThreshold={1.5} // Umbral para llamar a fetchData
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </>
  );
};

export default HomeScreen;
