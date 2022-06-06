import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../state/hooks';
import { updateSearchQuery } from '../state/features/searchQuerySlice';
import { closeModal, openModal } from '../state/features/modalSlice';
import { fetchModalResults } from '../state/features/modalResultsSlice';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  padding: 12px;
  padding-left: 40px;
  outline: none;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-sizing: border-box;
  color: #333;
  position: relative;

  @media (min-width: 768px) {
    max-width: 320px;
    font-size: 14px;
    padding-left: 46px;
    align-self: flex-end;
  }
`;

const Icon = styled.div`
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 16px;
  color: #333;
  opacity: 0.5;
  font-size: 18px;

  @media (min-width: 768px) {
    left: auto;
    right: 285px;
    top: 14px;
  }
`;

const SearchInput = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const dispatch = useAppDispatch();

  const updateCurrentSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentQuery(e.currentTarget.value);
    dispatch(updateSearchQuery(e.currentTarget.value));
  };

  useEffect(() => {
    if (currentQuery.trim() === '') closeModal();

    const searchTimeout = setTimeout(() => {
      const baseAPIUrl = 'https://reststop.randomhouse.com/resources/works/?start=0&max=3&expandLevel=1&search=';
      const searchUrl = baseAPIUrl + currentQuery.replace(' ', '+');

      if (currentQuery.trim() !== '') {
        dispatch(fetchModalResults(searchUrl));
        dispatch(openModal());
      } else {
        dispatch(closeModal());
      }
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [currentQuery]);

  return (
    <Container>
      <Icon>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Icon>

      <StyledSearchInput
        placeholder='Search for your next book...'
        onChange={updateCurrentSearch}
        value={currentQuery}
      ></StyledSearchInput>
    </Container>
  );
};

export default SearchInput;
