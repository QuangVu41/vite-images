import React from 'react';
import { useGlobalContext } from './AppProvider';

// sws1HO8kysrtE1zHRRjEA2Z3CmCS2RS1Rhqb5i04FLg;

interface FormElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as FormElements;
    const searchValue = formElements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className='title'>unsplash images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input className='form-input search-input' type='text' name='search' placeholder='cat' />
        <button className='btn'>search</button>
      </form>
    </section>
  );
};

export default SearchForm;
