import React, { PureComponent } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';

import CreatePost from '../../component/CreatePost';
import RenderPosts from '../../component/RenderPosts';
import CreateCategories from '../../component/CreateCategories';
import RenderCategories from '../../component/RenderCategories';

import './BlogsCategories.scss';

export default class BlogsCategoriesComponent extends PureComponent {
  render() {
    const {
      handleSelectCategory,
      updateCategories,
      isLoading,
      currentCategory,
      categories
    } = this.props;

    if (isLoading) {
      return (
        <main className="BlogsCategories">
          <div className='loader'></div>
        </main>
      )
    }

    return (
      <main className="BlogsCategories">
        <Container>
          <Tab.Container id='ledt-tabs-example' defaultActiveKey='1'>
            <Row>
              <Col sm={3} className="Menu">
                <Nav
                  variant='tabs'
                  className='Categories flex-column mt-5 mb-5 scrollspy-example'
                  data-bs-spy="scroll"
                  onSelect={handleSelectCategory}
                >
                  {<RenderCategories
                    categories={categories}
                    updateCategories={updateCategories}
                  />}
                </Nav>
                {<CreateCategories 
                  updateCategories={updateCategories}
                />}
              </Col>
              <Col sm={9} className="Body">
                {<RenderPosts
                  categories={categories}
                  updateCategories={updateCategories}
                  currentCategory={currentCategory}
                />}
                {<CreatePost
                  currentCategory={currentCategory}
                  updateCategories={updateCategories}
                />}
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </main>
    );
  }
}