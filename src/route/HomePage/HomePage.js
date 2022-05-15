import React, { PureComponent } from 'react';
import { Container } from "react-bootstrap";
import HomeSlider from '../../component/HomeSlider/HomeSliderComponent';

import './HomePage.scss';

export default class HomePage extends PureComponent {
  render() {
    return (
      <main className="HomePage">
        <Container>
          <HomeSlider />
        </Container>
      </main>
    );
  }
}