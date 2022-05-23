import React, { PureComponent } from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import RenderCategories from './RenderCategories.component';

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  }
};

const mapDispatchToProps = () => {return {}};

class RenderCategoriesContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.deleteCategory = this.deleteCategory.bind(this);
  }

  containerProps() {
    const { admin, categories } = this.props;

    return {
      deleteCategory: this.deleteCategory,
      admin,
      categories
    };
  }

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

  render() {
    return (
      <RenderCategories 
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderCategoriesContainer);
