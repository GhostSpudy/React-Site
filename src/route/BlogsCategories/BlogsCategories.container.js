import React, { PureComponent } from 'react';
import axios from "axios";

import BlogsCategories from './BlogsCategories.component';

export default class BlogsCategoriesContainer extends PureComponent {
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

  containerProps() {
    const { isLoading, categories, currentCategory } = this.state;

    return {
      handleSelectCategory: this.handleSelectCategory,
      updateCategories: this.updateCategories,
      isLoading,
      categories,
      currentCategory
    };
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
    return (
      <BlogsCategories 
        {...this.containerProps()}
      />
    );
  }
}
