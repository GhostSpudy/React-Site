import React, { PureComponent } from 'react';
import { Navbar, Container } from 'react-bootstrap';

import './Footer.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className='Footer'>
        <Container>
          <Navbar.Brand>
            <p className='Text text-center'>&copy; Atvērts blogs 2022</p>
          </Navbar.Brand>
        </Container>
      </footer>
    );
  }
}
