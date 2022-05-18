import React, { PureComponent } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux';

import './CreateCategories.scss';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

class CreateCategories extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeCategory = this.handleChangeCategory.bind(this);

    this.state = {
      validatedCategory: false,
      handleChangeCategory: ''
    };
  }

  handleChangeCategory(event) {
    this.setState({handleChangeCategory: event.target.value});
  }

  handleCreateCategory = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity() === true) {
      const { updateCategories } = this.props;
      const { handleChangeCategory: tittle } = this.state;

      axios.post(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories`, { tittle })
        .then(res => {
          updateCategories();
          this.setState({
            handleChangeCategory: '',
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
    const { currentUser: { isAuth, currentUser }, admin: { isAdmin, adminEmail } } = this.props
    const { validatedCategory } = this.state;
    const admin = isAdmin === true && adminEmail === 'admin@admin.admin';

    if (!isAuth && !Object.keys(currentUser).length && !admin) {
      return
    }

    return (
      <Form
        noValidate
        validated={validatedCategory}
        onSubmit={this.handleCreateCategory}
        className='CreateCategories'
      >
        <Form.Group controlId='fromBasicText'>
          <Form.Control
            required
            type='text'
            placeholder='Ievadiet nosaukumu'
            value={this.state.handleChangeCategory}
            onChange={this.handleChangeCategory}
          />
        </Form.Group>
        <div className='button'>
          <Button variant='primary' type='submit'> Izveidot </Button>
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategories)
