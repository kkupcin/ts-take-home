import styled from 'styled-components';
import HomeHero from '../components/HomeHero';
import BookCard from '../components/BookCard';
import SearchModal from '../components/SearchModal';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchSearchResults, setLoading } from '../state/features/searchResultsSlice';
import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

interface Props {
  page?: string;
}

const StyledMainPage = styled.div`
  width: 100%;
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    min-height: calc(100vh - 92px);
  }
`;

const SubTitle = styled.h2`
  font-weight: 700;
  margin: 36px auto;
  text-align: center;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1440px) {
    font-size: 24px;
  }
`;

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    gap: 36px;
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 24px;
  }

  @media (min-width: 1440px) {
    flex-direction: row;
    max-width: 1200px;
    grid-template-columns: 1fr 1fr;
  }
`;

export interface Titles {
  '@formatcode'?: string;
  '$'?: string;
}

export interface BookProps extends PropsWithChildren<any> {
  titleweb?: string;
  titles?: Titles;
  titleAuth?: string;
}

export interface Results {
  '@uri'?: string;
  'work'?: Object[];
}

const MainPage = (props: Props) => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const books: Results = useAppSelector((state) => state.results.results);
  const loading: boolean = useAppSelector((state) => state.results.isLoading);
  const navigate = useNavigate();

  const baseAPIUrl = 'https://reststop.randomhouse.com/resources/works/?start=0&max=10&expandLevel=1&search=';
  const starterSearch =
    'https://reststop.randomhouse.com/resources/works/?start=0&max=2&expandLevel=1&search=Jane+Eyre';
  const searchUrl = baseAPIUrl + searchQuery.replace(' ', '+');

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(fetchSearchResults(starterSearch));
    } else if (location.pathname === '/results' && searchQuery !== '') {
      dispatch(fetchSearchResults(searchUrl));
    } else if (location.pathname === '/results' && searchQuery === '') {
      dispatch(setLoading(false));
      navigate('/');
    }
  }, [location]);

  return (
    <div id='main-page'>
      <StyledMainPage>
        {props.page === 'home' && <HomeHero />}
        {loading ? (
          <Loader />
        ) : (
          <>
            {props.page === 'home' ? (
              <SubTitle>A couple of examples</SubTitle>
            ) : (
              <SubTitle>Here are your top ten results</SubTitle>
            )}
            <ResultWrapper>
              {!loading &&
                books.work?.map((book: BookProps, index: number) => {
                  return <BookCard book={book} key={index} />;
                })}
            </ResultWrapper>
          </>
        )}
      </StyledMainPage>

      {isOpen && <SearchModal />}
    </div>
  );
};

export default MainPage;
