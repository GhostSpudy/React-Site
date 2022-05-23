import React, { PureComponent } from 'react';
import { Tab, Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

import './RenderPosts.scss';

class RenderPostsComponent extends PureComponent {
  editPostWindow() {
    const {
      showEditWindow,
      validated,
      handleChangeText,
      handleEditPost,
      handleChangeTextarea,
      closeEditor
    } = this.props;

    return (
    <Modal
        show={showEditWindow}
        onHide={() => closeEditor()}
        className='EditWindow'
      >
        <Modal.Header closeButton>
          <Modal.Title>Rediģēt ierakstu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleEditPost}
          >
            <FloatingLabel controlId='floatingTextarea' label='Uzrakstīt ierakstu'>
              <Form.Control
                required
                as='textarea'
                placeholder='Ievadiet tekstu'
                value={handleChangeText}
                onChange={handleChangeTextarea}
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
    const {
      currentUser: { isAuth, currentUser },
      admin: { isAdmin, adminEmail },
      deletePost,
      openEditor
    } = this.props;
    const admin = isAdmin === true && adminEmail === 'admin@admin.admin';

    if (!isAuth && !Object.keys(currentUser).length && !admin) {
      return;
    }

    if (post.authorEmail !== currentUser.email && !admin) {
      return;
    }

    return (
      <div className='ChangePost'>
        <p onClick={() => openEditor(post)}
        >Rediģēt</p>
        <p onClick={() => deletePost(post.id)}>Dzest</p>
      </div>
    )
  }

  render() {
    const { categories, likeThePost } = this.props;

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
                    <p onClick={() => likeThePost(post.id, post.likes)}>Patika {post.likes}</p>
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

export default RenderPostsComponent;