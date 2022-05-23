import React, { PureComponent } from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import RenderPosts from './RenderPosts.component';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps = () => {return {}};

class RenderPostsContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.likeThePost = this.likeThePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);

    this.state = {
      showEditWindow: false,
      validated: false,
      handleChangeText: '',
      currentPost: {}
    };
  }

  containerProps() {
    const { admin, currentUser, categories, updateCategories, currentCategory } = this.props;
    const { showEditWindow, validated, handleChangeText, currentPost } = this.state;

    return {
      handleChangeTextarea: this.handleChangeTextarea,
      likeThePost: this.likeThePost,
      deletePost: this.deletePost,
      handleEditPost: this.handleEditPost,
      openEditor: this.openEditor,
      closeEditor: this.closeEditor,
      admin,
      currentUser,
      categories,
      updateCategories,
      currentCategory,
      showEditWindow,
      validated,
      handleChangeText,
      currentPost
    };
  }

  handleChangeTextarea(event) {
    this.setState({handleChangeText: event.target.value});
  }

  openEditor(post) {
    this.setState({
      showEditWindow: true,
      currentPost: post,
      handleChangeText: post.text
    })
  }

  closeEditor() {
    this.setState({ showEditWindow: false })
  }

  likeThePost(postId, postLikes) {
    const { currentCategory, updateCategories } = this.props;

    axios.put(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories/${currentCategory}/posts/${postId}`, {
      likes: ++postLikes
    })
      .then(res => {
        updateCategories();
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  deletePost(postId) {
    const { currentCategory, updateCategories } = this.props;

    axios.delete(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories/${currentCategory}/posts/${postId}`)
      .then(res => {
        updateCategories();
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  handleEditPost = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity() === true) {
      const { updateCategories } = this.props;
      const { currentPost, handleChangeText } = this.state;
      const editedDate = new Date().toLocaleString();

      if (currentPost.text !== handleChangeText) {
        axios.put(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories/${currentPost.categoryId}/posts/${currentPost.id}`, {
          text: handleChangeText, edited: true, editedDate
        })
          .then(res => {
            updateCategories();
            this.setState({ showEditWindow: false })
          })
          .catch(err => {
            throw new Error(err)
          })
      } else {
        this.setState({ showEditWindow: false })
      }
    }

    this.setState({validated: true});
  }

  render() {
    return (
      <RenderPosts 
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderPostsContainer);