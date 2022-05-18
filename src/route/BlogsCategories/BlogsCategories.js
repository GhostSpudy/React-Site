import React, { PureComponent } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';
import axios from "axios";

import CreatePost from '../../component/CreatePost/CreatePost.component';
import RenderPosts from '../../component/RenderPosts/RenderPosts.component';
import CreateCategories from '../../component/CreateCategories/CreateCategories.component';
import RenderCategories from '../../component/RenderCategories/RenderCategories.component';

import './BlogsCategories.scss';

export default class BlogsCategories extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.updateCategories = this.updateCategories.bind(this);

    this.state = {
      isLoading: false,
      categories: [],
      currentCategory: 1
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    axios.get(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories`)
      .then(res => {
        this.setState({categories: res.data, isLoading: false});
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  handleSelectCategory(selectedKey) {
    this.setState({currentCategory: selectedKey});
  }

  updateCategories() {
    axios.get(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories`)
      .then(res => {
        this.setState({categories: res.data});
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  render() {
    const { isLoading, currentCategory, categories } = this.state;

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
                  onSelect={this.handleSelectCategory}
                >
                  {<RenderCategories
                    categories={categories}
                    updateCategories={this.updateCategories}
                  />}
                </Nav>
                {<CreateCategories 
                  updateCategories={this.updateCategories}
                />}
              </Col>
              <Col sm={9} className="Body">
                {<RenderPosts
                  categories={categories}
                  updateCategories={this.updateCategories}
                  currentCategory={currentCategory}
                />}
                {<CreatePost
                  currentCategory={currentCategory}
                  updateCategories={this.updateCategories}
                />}
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </main>
    );
  }
}