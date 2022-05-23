import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import error from '../../style/icons/Error_404.jpg';

import './NoMatch.scss';

export default class NoMatchComponent extends PureComponent {
  render() {
    return (
      <main className="NoMatch">
        <Container>
          <img
            src={error}
            className='Error'
            alt='Error'
          />
          <h2>Kļūda 404. Šāda lapa neeksistē!</h2>
          <Link to='/' className='btn btn-danger'>Uz mājas lapu</Link>
        </Container>
      </main>
    );
  }
}