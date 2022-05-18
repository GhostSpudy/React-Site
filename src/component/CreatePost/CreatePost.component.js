import React, { PureComponent } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux';

import './CreatePost.scss';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps =  (dispatch) => {
  return {}
};

class CreatePost extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);

    this.state = {
      validatedPost: false,
      handleChangeTextarea: ''
    };
  }

  handleChangeTextarea(event) {
    this.setState({handleChangeTextarea: event.target.value});
  }

  handleCreatePost = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity() === true) {
      this.createPostAndUpdateCategories();
    }

    this.setState({validatedPost: true});
  }

  createPostAndUpdateCategories() {
    const {
      admin: { isAdmin },
      currentUser: { currentUser },
      updateCategories,
      currentCategory,
    } = this.props;
    const { handleChangeTextarea: text } = this.state;
    const date = new Date().toLocaleString();

    axios.post(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories/${currentCategory}/posts`, {
      categoryId: currentCategory,
      author: isAdmin ? 'Admin' : currentUser.name,
      authorEmail: isAdmin ? '' : currentUser.email,
      date, text,
      edited: false,
      likes: 0
    })
      .then(res => {
        updateCategories();
        this.setState({
          handleChangeTextarea: '',
          validatedPost: false
        });
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  render() {
    const { currentUser: { isAuth, currentUser }, admin: { isAdmin, adminEmail } } = this.props;
    const { validatedPost } = this.state;
    const admin = isAdmin === true && adminEmail === 'admin@admin.admin';

    if (!isAuth && !Object.keys(currentUser).length && !admin) {
      return
    }

    return (
      <Form
        noValidate
        validated={validatedPost}
        onSubmit={this.handleCreatePost}
        className='CreatePost'
      >
        <FloatingLabel controlId='floatingTextarea' label='Uzrakstīt ierakstu'>
          <Form.Control
            required
            as='textarea'
            placeholder='Ievadiet tekstu'
            value={this.state.handleChangeTextarea}
            onChange={this.handleChangeTextarea}
          />
        </FloatingLabel>
        <div className='button'>
          <Button variant='primary' type='submit'> Publicēt </Button>
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)