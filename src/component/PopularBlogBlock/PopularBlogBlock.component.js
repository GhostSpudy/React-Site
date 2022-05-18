import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Container, Nav } from 'react-bootstrap';

import './PopularBlogBlock.scss';

export default class PopularBlogBlock extends PureComponent {
  render() {
    return (
      <Container>
        <h2 className='text-center m-4'>Mājas lapas jaunumi</h2>
        <div>
          At vero eos et accusamus et iusto odio dignissimos ducimus, consectetur
          adipiscing elit, ut et voluptates repudiandae sint et molestiae non recusandae.
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos
          dolores et quas molestias excepturi sint, ut et voluptates repudiandae sint et
          molestiae non recusandae. Ut enim ad minima veniam, unde omnis iste natus error
          sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
          nisi ut aliquid ex ea commodi consequatur! Lorem ipsum dolor sit amet, quia voluptas
          sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui
          ratione voluptatem sequi nesciunt, neque porro quisquam est, velit esse cillum
          dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate,
          unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam eaque ipsa, velit esse cillum dolore eu fugiat nulla pariatur?
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet, nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit,
          quo minus id, quod maxime placeat, nisi ut aliquid ex ea commodi consequatur. Duis aute
          irure dolor in reprehenderit in voluptate, unde omnis iste natus...
        </div>
        {/* <CardGroup className='PopularBlogBlock mb-5'>
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
        </CardGroup> */}
      </Container>
    );
  }
}