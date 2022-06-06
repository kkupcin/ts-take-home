import styled from 'styled-components';

const StyledHomeHero = styled.div`
  background-color: #d1f0b1;
  width: 100%;
`;

const MainTitle = styled.h1`
  text-transform: uppercase;
  font-size: 38px;
  line-height: 52px;
  letter-spacing: 0.1em;
  font-weight: 700;
  text-align: center;
  padding: 48px 0;
  margin: 0 auto;
  width: 260px;

  @media (min-width: 768px) {
    width: 360px;
    font-size: 42px;
    padding: 64px 0;
  }

  @media (min-width: 1440px) {
    font-size: 64px;
    width: auto;
    padding: 124px 24px;
  }
`;

const HomeHero = () => {
  return (
    <StyledHomeHero>
      <MainTitle>Search for a favourite</MainTitle>
    </StyledHomeHero>
  );
};

export default HomeHero;
