import React, { FC, useEffect, useState } from 'react';
import { CommonPageProps } from './types';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useAddFavoriteMutation } from 'src/ducks/favorite';


export const ContactPage: FC<CommonPageProps> = ({
  contactsState
}) => {
  const [addFavorite] = useAddFavoriteMutation()
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(() => contactsState[0].find(({ id }) => id === contactId));
  }, [contactId]);

  const favoritesHandle = (contactsId: string) => {
    console.log('Favorites', contactsId)
    addFavorite(contactsId)
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} setFavorite={favoritesHandle} /> : <Empty />}
      </Col>
    </Row>
  );
};
