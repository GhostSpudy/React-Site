import React, { PureComponent } from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import CreateCategories from './CreateCategories.component';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps = () => {return {}};

class CreateCategoriesContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);

    this.state = {
      validatedCategory: false,
      handleCategoryText: ''
    };
  }

  containerProps() {
    const { admin, currentUser } = this.props;
    const { validatedCategory, handleCategoryText } = this.state;

    return {
      handleChangeCategory: this.handleChangeCategory,
      handleCreateCategory: this.handleCreateCategory,
      admin,
      currentUser,
      validatedCategory,
      handleCategoryText
    };
  }

  handleChangeCategory(event) {
    this.setState({handleCategoryText: event.target.value});
  }

  handleCreateCategory(event) {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity() === true) {
      const { updateCategories } = this.props;
      const { handleCategoryText: tittle } = this.state;

      axios.post(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories`, { tittle })
        .then(res => {
          updateCategories();
          this.setState({
            handleCategoryText: '',
            validatedCategory: false
          });
        })
        .catch(err => {
          throw new Error(err)
        })
    }

    this.setState({validatedCategory: true});
  }

  render() {
    return (
      <CreateCategories
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoriesContainer);
