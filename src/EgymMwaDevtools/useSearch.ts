import { FormEventHandler, useCallback, useState } from 'react';
import { SearchId } from './types';

const useSearch = (searchId: SearchId) => {
  const [search, setSearch] = useState('');

  const confirmSearch = useCallback<FormEventHandler>((e) => {
    e.preventDefault();

    const searchValue = (document.getElementById(searchId) as HTMLInputElement)?.value || '';

    setSearch(searchValue)
  }, []);

  const clearSearch = useCallback(() => {
    (document.getElementById(searchId) as HTMLInputElement)!.value = '';
    setSearch('');
  }, []);

  return {
    search, confirmSearch, clearSearch
  }
};

export default useSearch;