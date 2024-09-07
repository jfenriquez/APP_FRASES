import {apiAuth} from '../api';

const getDislikeXUser = async () => {
  try {
    const response = await apiAuth.get(`/users/dislikes/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const addDislikePhraseXUser = async (fraseId: string) => {
  try {
    const response = await apiAuth.post(`/users/dislikes/${fraseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteDislikePhraseXUser = async (fraseId: string) => {
  try {
    const response = await apiAuth.delete(`/users/dislikes/${fraseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {getDislikeXUser, deleteDislikePhraseXUser, addDislikePhraseXUser};
