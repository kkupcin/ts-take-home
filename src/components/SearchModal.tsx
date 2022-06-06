import styled from 'styled-components';
import ModalCard from './ModalCard';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { closeModal } from '../state/features/modalSlice';
import { BookProps, Results } from '../pages/MainPage';
import Loader from './Loader';

const StyledOverlay = styled.div`
  background-color: #333;
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
`;

const StyledModal = styled.div`
  position: absolute;
  background-color: #fff;
  padding: 18px;
  box-shadow: 0px 0.5px 10px rgba(0, 0, 0, 0.1);
  top: 89px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 2;
  align-items: center;

  @media (min-width: 768px) {
    width: 480px;
    left: auto;
    right: 64px;
    border-radius: 5px;
    top: 116px;

    ::before {
      content: '';
      position: absolute;
      background-color: #fff;
      top: -12px;
      right: 68px;
      transform: rotate(45deg);
      height: 24px;
      width: 24px;
    }
  }
`;

const ModalText = styled(Link)`
  text-align: center;
  text-decoration: none;
  color: inherit;
`;

const ErrorText = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 8px;
`;

const SearchModal = () => {
  const books: Results = useAppSelector((state) => state.modalResults.results);
  const loading: boolean = useAppSelector((state) => state.modalResults.isLoading);
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <>
      <StyledOverlay onClick={closeModalHandler} />
      <StyledModal>
        {loading && <Loader />}
        {!loading && books.work && (
          <>
            {books.work.map((book: BookProps, index: number) => {
              return <ModalCard book={book} key={index} />;
            })}
            <ModalText
              to='/results'
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Click here for more results
            </ModalText>
          </>
        )}
        {!loading && !books.work && <ErrorText>No results found</ErrorText>}
      </StyledModal>
    </>,
    document.getElementById('main-page') || document.body,
  );
};

export default SearchModal;
