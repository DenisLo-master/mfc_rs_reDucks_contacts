import {Outlet, useLocation} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import React from 'react';
import {MainMenu} from './MainMenu';
import {Breadcrumbs} from 'src/components/Breadcrumbs';

export const Layout = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);

  return (
    <Container>
      <Row>
        <Col xxl={12}>
          <MainMenu />
        </Col>
        <Col xxl={12}>
          <Breadcrumbs pathNames={pathNames}/>
        </Col>
        <Col xxl={12}>
          <Outlet />
        </Col>
        <Col xxl={12}>
          <footer>

          </footer>
        </Col>
      </Row>
    </Container>
  );
}
