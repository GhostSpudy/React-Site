import React, { PureComponent } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

import './CreatePost.scss';

class CreatePostComponent extends PureComponent {
  render() {
    const {
      currentUser: { isAuth, currentUser },
      admin: { isAdmin, adminEmail },
      handleCreatePost,
      handleChangeTextarea,
      handleChangeText,
      validatedPost,
    } = this.props;
    const admin = isAdmin === true && adminEmail === 'admin@admin.admin';

    if (!isAuth && !Object.keys(currentUser).length && !admin) {
      return;
    }

    return (
      <Form
        noValidate
        validated={validatedPost}
        onSubmit={handleCreatePost}
        className='CreatePost'
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
          <Button variant='primary' type='submit'>
            Publicēt
          </Button>
        </div>
      </Form>
    );
  }
}

export default CreatePostComponent;
