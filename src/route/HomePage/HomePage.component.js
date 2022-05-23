import React, { PureComponent } from 'react';
import { Container } from "react-bootstrap";
import HomeSlider from '../../component/HomeSlider';
import PopularBlogBlock from '../../component/PopularBlogBlock';

import './HomePage.scss';

export default class HomePage extends PureComponent {
  render() {
    return (
      <main className="HomePage">
        <HomeSlider />
        <Container>
          <PopularBlogBlock />
        </Container>
      </main>
    );
  }
}