import React, { PureComponent } from 'react';
import { Form, Button } from 'react-bootstrap';

import './CreateCategories.scss';

class CreateCategoriesComponent extends PureComponent {
  render() {
    const {
      currentUser: { isAuth, currentUser },
      admin: { isAdmin, adminEmail },
      validatedCategory,
      handleChangeCategory,
      handleCreateCategory,
      handleCategoryText
    } = this.props
    const admin = isAdmin === true && adminEmail === 'admin@admin.admin';

    if (!isAuth && !Object.keys(currentUser).length && !admin) {
      return
    }

    return (
      <Form
        noValidate
        validated={validatedCategory}
        onSubmit={handleCreateCategory}
        className='CreateCategories'
      >
        <Form.Group controlId='fromBasicText'>
          <Form.Control
            required
            type='text'
            placeholder='Ievadiet nosaukumu'
            value={handleCategoryText}
            onChange={handleChangeCategory}
          />
        </Form.Group>
        <div className='button'>
          <Button variant='primary' type='submit'> Izveidot </Button>
        </div>
      </Form>
    );
  }
}

export default CreateCategoriesComponent;
