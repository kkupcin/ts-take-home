import styled from 'styled-components';
import { BookProps } from '../pages/MainPage';

const Container = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  max-height: 100px;
  gap: 8px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 25%;
  max-height: 80px;
  object-fit: contain;
`;

const InfoBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  span {
    font-style: italic;
  }

  h3 {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 14px;
  }
`;

const CTA = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 12px;
    margin: auto 0;
  }

  @media (min-width: 768px) {
    h3 {
      margin: 0;
      font-size: 14px;
    }
  }
`;

const PurchaseLink = styled.a`
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #b6cb9e;
  border-radius: 5px;
  padding: 8px 14px;

  @media (min-width: 768px) {
    padding: 12px 28px;
  }
`;

const ModalCard = (props: BookProps) => {
  let authorFullName = '';

  if (props.book.authorweb) {
    const authorNameArray = props.book.authorweb.split(',');
    const authorFirstName = authorNameArray[1] || '';
    const authorLastName = authorNameArray[0] || '';
    authorFullName = authorFirstName.concat(' ', authorLastName);
  }

  return (
    <Container>
      <Image
        src={`https://images1.penguinrandomhouse.com/cover/${
          props.book.titles?.isbn[0]?.$ || props.book.titles?.isbn?.$ || '99999'
        }`}
      />
      <InfoBox>
        <TextBox>
          <h2>{props.book.titleweb}</h2>
          <h3>
            <span>by</span>
            {authorFullName}
          </h3>
        </TextBox>

        <CTA>
          <h3>Get it on</h3>
          <PurchaseLink
            href={`https://www.amazon.co.uk/s?k=${props.book.titles?.isbn[0]?.$ || props.book.titles?.isbn?.$ || ''}`}
            target='__blank'
          >
            Amazon
          </PurchaseLink>
        </CTA>
      </InfoBox>
    </Container>
  );
};

export default ModalCard;
