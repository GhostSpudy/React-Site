import React, { PureComponent } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { images } from './HomeSlider.config';

import './HomeSlider.scss';

export default class HomeSlider extends PureComponent {
  render() {
    return (
      <Carousel>
        {images.map((test, i) => (
          <Carousel.Item key={i}>
            <img
              className='d-block w-100'
              src={test}
              alt='Forest'
            />
            <Carousel.Caption>
              <h3>Forest</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}
