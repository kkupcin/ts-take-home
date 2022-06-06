import styled from 'styled-components';
import { BookProps } from '../pages/MainPage';

const Container = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0px 0.5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  max-height: 160px;
  gap: 16px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    gap: 24px;
    max-height: 200px;
  }
`;

const Image = styled.img`
  width: 25%;
  max-height: 120px;
  object-fit: contain;

  @media (min-width: 768px) {
    max-height: 160px;
  }
`;

const InfoBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 8px;
  }

  span {
    font-style: italic;
  }

  h3 {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 14px;
  }

  p {
    display: none;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 20px;
      margin-bottom: 12px;
    }

    h3 {
      font-size: 16px;
      margin-bottom: 24px;
    }

    p {
      display: block;
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const CTA = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;

  h3 {
    font-size: 12px;
    margin: auto 0;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

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
  padding: 8px 18px;

  @media (min-width: 768px) {
    padding: 12px 28px;
  }
`;

const BookCard = (props: BookProps) => {
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
            <span>by</span> {authorFullName}
          </h3>
          {props.book.rgabout && <p>{props.book.rgabout}</p>}
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

export default BookCard;
