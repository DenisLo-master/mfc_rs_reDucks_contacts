import React, { memo, useEffect, useState } from 'react';
import { CommonPageProps } from './types';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useAddFavoriteMutation } from 'src/ducks/favorite';

export const FavoritListPage = memo<CommonPageProps>(({
  favoriteContactsState,
  contactsState
}) => {
  const [addFavorite] = useAddFavoriteMutation()
  const [contacts, setContacts] = useState<ContactDto[]>([])
  useEffect(() => {
    setContacts(() => contactsState[0].filter(({ id }) => favoriteContactsState[0].includes(id)));
  }, [contactsState, favoriteContactsState])

  const favoritesHandle = (contactsId: string) => {
    console.log('Favorites', contactsId)
    addFavorite(contactsId)
  }

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard
            contact={contact}
            withLink
            setFavorite={favoritesHandle}
          />
        </Col>
      ))}
    </Row>
  );
})
