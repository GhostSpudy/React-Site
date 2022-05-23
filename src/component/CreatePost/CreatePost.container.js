import React, { PureComponent } from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import CreatePost from './CreatePost.component';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user,
  };
};

const mapDispatchToProps =  () => {return {}};

class CreatePostContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);

    this.state = {
      validatedPost: false,
      handleChangeText: ''
    };
  }

  containerProps() {
    const { admin, currentUser } = this.props;
    const { validatedPost, handleChangeText } = this.state;

    return {
      handleChangeTextarea: this.handleChangeTextarea,
      handleCreatePost: this.handleCreatePost,
      admin,
      currentUser,
      validatedPost,
      handleChangeText
    };
  }

  handleChangeTextarea(event) {
    this.setState({handleChangeText: event.target.value});
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
      admin: {isAdmin},
      currentUser: {currentUser},
      updateCategories,
      currentCategory,
    } = this.props;
    const {handleChangeText: text} = this.state;
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
          handleChangeText: '',
          validatedPost: false
        });
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  render() {
    return (
      <CreatePost 
        {...this.containerProps()}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer);
