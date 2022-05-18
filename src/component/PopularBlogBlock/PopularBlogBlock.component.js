import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Container, Nav } from 'react-bootstrap';

import './PopularBlogBlock.scss';

export default class PopularBlogBlock extends PureComponent {
  render() {
    return (
      <Container>
        <h2 className='text-center m-4'>Populāri blogi</h2>
        <CardGroup className='PopularBlogBlock mb-5'>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title>1 blogs</Card.Title>
              <Card.Text>
                komentariju skaits ...
              </Card.Text>
              <Nav className="button">
                <Link to="/blogs-categories" className="nav-link"> Pariet uz blogu </Link>
              </Nav>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title>2 blogs</Card.Title>
              <Card.Text>
                komentariju skaits ...
              </Card.Text>
              <Nav className="button">
                <Link to="/blogs-categories" className="nav-link"> Pariet uz blogu </Link>
              </Nav>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title>3 blogs</Card.Title>
              <Card.Text>
                komentariju skaits ...
              </Card.Text>
              <Nav className="button">
                <Link to="/blogs-categories" className="nav-link"> Pariet uz blogu </Link>
              </Nav>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}