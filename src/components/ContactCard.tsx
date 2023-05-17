import React, {memo} from 'react';
import {ContactDto} from 'src/types/dto/ContactDto';
import {Card, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

interface ContactCardProps {
  contact: ContactDto,
  withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(({
    contact: {
      photo,
      id,
      name,
      phone,
      birthday,
      address
    }, withLink
  }) => {
    return (
      <Card key={id}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title>
            {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
          </Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item><Link to={`tel:${phone}`} target="_blank">{phone}</Link></ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  }
)
