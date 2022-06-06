import SearchInput from './SearchInput';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: #fff;
  padding: 24px 36px;
  box-shadow: 0px 0.5px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 3;
`;

const Header = () => {
  return (
    <StyledHeader>
      <SearchInput />
    </StyledHeader>
  );
};

export default Header;
