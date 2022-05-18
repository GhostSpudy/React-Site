import React, { PureComponent } from 'react';
import { Tab, Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux';

import './RenderPosts.scss';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps =  (dispatch) => {
  return {}
};

class RenderPosts extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);

    this.state = {
      showEditWindow: false,
      validated: false,
      handleChangeTextarea: '',
      currentPost: {}
    };
  }

  handleChangeTextarea(event) {
    this.setState({handleChangeTextarea: event.target.value});
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
      const { currentPost, handleChangeTextarea } = this.state;
      const editedDate = new Date().toLocaleString();

      if (currentPost.text !== handleChangeTextarea) {
        axios.put(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/categories/${currentPost.categoryId}/posts/${currentPost.id}`, {
          text: handleChangeTextarea, edited: true, editedDate
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

  editPostWindow() {
    const { showEditWindow, validated, handleChangeTextarea } = this.state;

    return (
    <Modal
        show={showEditWindow}
        onHide={() => this.setState({ showEditWindow: false })}
        className='EditWindow'
      >
        <Modal.Header closeButton>
          <Modal.Title>Rediģēt ierakstu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleEditPost}
          >
            <FloatingLabel controlId='floatingTextarea' label='Uzrakstīt ierakstu'>
              <Form.Control
                required
                as='textarea'
                placeholder='Ievadiet tekstu'
                value={handleChangeTextarea}
                onChange={this.handleChangeTextarea}
              />
            </FloatingLabel>
            <div className='button'>
              <Button variant='primary' type='submit'> Rediģēt </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  renderChangePostButtons(post) {
    const { currentUser: { isAuth, currentUser }, admin: { isAdmin, adminEmail } } = this.props;
    const admin = isAdmin === true && adminEmail === 'admin@admin.admin';

    if (!isAuth && !Object.keys(currentUser).length && !admin) {
      return;
    }

    if (post.authorEmail !== currentUser.email && !admin) {
      return;
    }

    return (
      <div className='ChangePost'>
        <p onClick={() => this.setState({
            showEditWindow: true,
            currentPost: post,
            handleChangeTextarea: post.text
          })}
        >Rediģēt</p>
        <p onClick={() => this.deletePost(post.id)}>Dzest</p>
      </div>
    )
  }

  render() {
    const { categories } = this.props;

    return (
      <>
        {categories.map(category => (
          <Tab.Content key={category.id}>
            {category.posts.map(post => (
              <Tab.Pane eventKey={post.categoryId} key={post.id}>
                <div className='PostInfo'>
                  <div className='Author'>
                    <p>{post.author}</p>
                    <p>{post.date}</p>
                  </div>
                  <div className='Edited'>
                    <p>{post.edited ? 'Rediģēts' : ''}</p>
                    <p>{post.edited ? post.editedDate : ''}</p>
                  </div>
                </div>
                <div className='PostBody'>
                  <p>{post.text}</p>
                </div>
                <div className='PostControl'>
                  <div className='Likes'>
                    <p onClick={() => this.likeThePost(post.id, post.likes)}>Patika {post.likes}</p>
                  </div>
                  { this.renderChangePostButtons(post) }
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        ))}
        { this.editPostWindow() }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderPosts)