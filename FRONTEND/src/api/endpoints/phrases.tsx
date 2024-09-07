import {apiNoAuth} from '../api';

const getSearchValues = async (search: string) => {
  try {
    const response = await apiNoAuth.get(
      `/phrases/name/?searchValue=${search}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getFrases = async (limit: number, offset: number) => {
  try {
    const response = await apiNoAuth.get(
      `/phrases/?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/////TODO:POR REALIZAR POST PUT DELETE APIAUTH

export {getSearchValues, getFrases};
