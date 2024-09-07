import React, {useState} from 'react';
import {InterfacePhraseData} from '../interfaces/PhrasesInterface';
import {getSearchValues} from '../api/endpoints/phrases';

export const useSearchPhrase = () => {
  const [phrases, setPhrases] = useState<InterfacePhraseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPhrase = async (phrase: string) => {
    try {
      setIsLoading(true);
      const response = await getSearchValues(phrase);
      setIsLoading(false);
      setPhrases(response);
      return response;
    } catch (error) {
      console.log(error);
      return setPhrases([]);
    }
  };

  return {
    isLoading,
    phrases,
    searchPhrase,
    setPhrases,
  };
};
