import {apiAuth, apiNoAuth} from '../api';

const getFavoriteXUser = async () => {
  try {
    const response = await apiAuth.get(`/users/favorites`);
    //console.log(response, '{{{{{{{{{{{{{{{________________');
    return response;
  } catch (error) {
    console.log(error, 'error');
  }
};

const addFavoritePhraseXUser = async (fraseId: string) => {
  try {
    const response = await apiAuth.post(`/users/favorites/${fraseId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteFavoritePhraseXUser = async (fraseId: string) => {
  try {
    const response = await apiAuth.delete(`/users/favorites/${fraseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {getFavoriteXUser, deleteFavoritePhraseXUser, addFavoritePhraseXUser};
