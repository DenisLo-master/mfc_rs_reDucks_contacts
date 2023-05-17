import React, {memo} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';

export const GroupListPage = memo<CommonPageProps>(({contactsState, groupContactsState}) => {
  return (
    <Row xxl={4}>
      {groupContactsState[0].map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
