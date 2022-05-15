import React, { PureComponent } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import forest1 from '../../style/icons/slider/Forest-1.jpg';
import forest2 from '../../style/icons/slider/Forest-2.jpg';
import forest3 from '../../style/icons/slider/Forest-3.jpg';
import forest4 from '../../style/icons/slider/Forest-4.jpg';
import forest5 from '../../style/icons/slider/Forest-5.jpg';

export default class HomeSlider extends PureComponent {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img 
            className='d-block w-100'
            src={ forest1 }
            alt='Forest'
          />
          <Carousel.Caption>
            <h3>Forest</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className='d-block w-100'
            src={ forest2 }
            alt='Forest'
          />
          <Carousel.Caption>
            <h3>Forest</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className='d-block w-100'
            src={ forest3 }
            alt='Forest'
          />
          <Carousel.Caption>
            <h3>Forest</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className='d-block w-100'
            src={ forest4 }
            alt='Forest'
          />
          <Carousel.Caption>
            <h3>Forest</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className='d-block w-100'
            src={ forest5 }
            alt='Forest'
          />
          <Carousel.Caption>
            <h3>Forest</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}