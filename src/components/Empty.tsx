import {Toast} from 'react-bootstrap';
import React from 'react';

export const Empty = () => {
  return (
    <Toast bg={'danger'}>
      <Toast.Header closeButton={false}>
        Empty
      </Toast.Header>
      <Toast.Body>
        Data not found
      </Toast.Body>
    </Toast>
  );
}
