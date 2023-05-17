import React, {memo} from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

interface GroupContactsCardProps {
  groupContacts: GroupContactsDto,
  withLink?: boolean
}

export const GroupContactsCard = memo<GroupContactsCardProps>(({
    groupContacts: {
      id,
      name,
      description,
      photo,
      contactIds
    }, withLink
  }) => {
    return (
      <Card key={id}>
        <Card.Header>
          {withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
        </Card.Header>
        <Card.Body>{description}</Card.Body>
        <Card.Img variant="top" src={photo} />
        <Card.Footer>Contacts: {contactIds.length}</Card.Footer>
      </Card>
    );
  }
)
