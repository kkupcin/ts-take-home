import MainPage from './pages/MainPage';
import Header from './components/Header';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './state/hooks';
import { useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #fafafa;
    color: #333;
    box-sizing: border-box;
  }
`;

function App() {
  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);
  const results = useAppSelector((state) => state.results.results);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalIsOpen]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<MainPage page='home' />} />
        <Route path='/results' element={<MainPage page='results' />} />
      </Routes>
    </>
  );
}

export default App;
