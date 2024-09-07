import {apiNoAuth} from '../api';

const getPublicCategories = async () => {
  try {
    const response = await apiNoAuth.get('/categories/all');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPhrasesXcategory = async (id: number) => {
  try {
    const response = await apiNoAuth.get(
      `/categories/phrases/?phrasesXcategory=${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getSearchCategory = async (searchValue: string) => {
  try {
    const response = await apiNoAuth.get(
      `/categories/?searchValue=${searchValue}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//////TODO:POST,PUT,DELETE APIAUTH

export {getPublicCategories, getPhrasesXcategory, getSearchCategory};
