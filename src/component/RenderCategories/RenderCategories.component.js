import React, { PureComponent } from 'react';
import { Nav } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux';

import './RenderCategories.scss';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

class RenderCategories extends PureComponent {
  deleteCategory(categoryId) {
    const { updateCategories } = this.props;

    axios.delete(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories/${categoryId}`)
      .then(res => {
        updateCategories();
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  renderDeleteButton(categoryId) {
    const { admin: { isAdmin, adminEmail } } = this.props;

    if (isAdmin === true && adminEmail === 'admin@admin.admin') {
      return (
        <p onClick={() => this.deleteCategory(categoryId)}>Dzest</p>
      )
    }

    return;
  }

  render() {
    const { categories } = this.props;

    return (
      <>
        {categories.map(category => (
          <Nav.Item key={category.id}>
            <Nav.Link eventKey={category.id}>{category.tittle}</Nav.Link>
            { this.renderDeleteButton(category.id) }
          </Nav.Item>
        ))}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderCategories)
