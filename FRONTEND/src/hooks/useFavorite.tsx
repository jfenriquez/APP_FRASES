import React, {useContext, useEffect, useState} from 'react';
import {
  addFavoritePhraseXUser,
  deleteFavoritePhraseXUser,
  getFavoriteXUser,
} from '../api/endpoints/favorites';
import {AuthContext} from '../context/AuthContext';
import {
  addDislikePhraseXUser,
  deleteDislikePhraseXUser,
} from '../api/endpoints/dislikes';

export const useFavorite = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [dislikes, setDislikes] = useState(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  const {user} = useContext(AuthContext);

  ///////FAVORITE
  const toggleFavorite = async itemId => {
    try {
      const updatedFavorites = new Set(favorites);
      if (updatedFavorites.has(itemId)) {
        setLoading(true);
        updatedFavorites.delete(itemId);
        const res = await deleteFavoritePhraseXUser(itemId);
        setLoading(false);
      } else {
        setLoading(true);
        updatedFavorites.add(itemId);
        const res = await addFavoritePhraseXUser(itemId);
        setLoading(false);
      }
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error updating favorites', error);
    }
  };

  /////DISLIKE_______________________________
  const toggleDislike = async itemId => {
    try {
      const updatedDislikes = new Set(dislikes);
      if (updatedDislikes.has(itemId)) {
        setLoading(true);
        updatedDislikes.delete(itemId);
        const res = await deleteDislikePhraseXUser(itemId);
        setLoading(false);
      } else {
        setLoading(true);
        updatedDislikes.add(itemId);
        const res = await addDislikePhraseXUser(itemId);
        setLoading(false);
      }
      setDislikes(updatedDislikes);
    } catch (error) {
      console.error('Error updating favorites', error);
    }
  };

  return {
    loading,
    setLoading,
    toggleFavorite,
    toggleDislike,
    setFavorites,
    favorites,
    setDislikes,
    dislikes,
  };
};
