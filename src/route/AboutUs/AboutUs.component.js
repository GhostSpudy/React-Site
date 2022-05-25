import React, { PureComponent } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';
import businessCat from '../../style/icons/business-cat.jpg';

import './AboutUs.style.scss';

export default class AboutUs extends PureComponent {
  render() {
    return (
      <main className="AboutUs">
        <Container>
          <Tab.Container id='ledt-tabs-example' defaultActiveKey='1'>
            <Row>
              <Col sm={3}>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link eventKey='1'>Test 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='2'>Test 2</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey='1'>
                    <img
                      src={ businessCat }
                      height='300'
                      className='d-inline-block align-top'
                      alt='cat'
                    />
                    <p>
                      Excepteur sint occaecat cupidatat non proident,
                      unde omnis iste natus error sit voluptatem accusantium
                      doloremque laudantium, totam rem aperiam eaque ipsa,
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                      Et harum quidem rerum facilis est et expedita distinctio,
                      consectetur adipiscing elit, quae ab illo inventore veritatis et...
                    </p>
                  </Tab.Pane>
                </Tab.Content>
                <Tab.Content>
                  <Tab.Pane eventKey='2'>
                    <p>Tālrunis: +371 12345678</p>
                    <p>E-pasts: AtvertsBlogs@gmail.com</p>
                    <p>Palīdzības dienesta darba laiks: Darba dienās no 10.00 līdz 16.00</p>
                    <p>
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
                    </p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </main>
    );
  }
}