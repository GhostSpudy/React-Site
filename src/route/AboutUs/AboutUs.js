import React, { PureComponent } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';

export default class AboutUs extends PureComponent {
  render() {
    return (
      <main className="AboutUs">
        <Container>
          <Tab.Container id='ledt-tabs-example' defaultActiveKey='1'>
            <Row>
              <Col sm={3}>
                <Nav variant='pills' className='flex-column mt-5 mb-5'>
                  <Nav.Item>
                    <Nav.Link eventKey='1'>Test 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='2'>Test 2</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content className='mt-5 mb-5'>
                  <Tab.Pane eventKey='1'>
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
                    <p>
                      Excepteur sint occaecat cupidatat non proident, quia voluptas sit,
                      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                      eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est,
                      nisi ut aliquid ex ea commodi consequatur.Itaque earum rerum hic
                      tenetur a sapiente delectus, unde omnis iste natus error sit...
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