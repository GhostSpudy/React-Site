import React, { PureComponent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import './MyAccount.scss';

class MyAccountComponent extends PureComponent {
  render() {
    const {
      handleEditData,
      handleChangeName,
      handleChangeSurname,
      handleChangeEmail,
      handleChangePassword,
      validated,
      name,
      surname,
      email,
      password
    } = this.props;

    return (
      <main className='Profile'>
        <Container>
          <h2> {name} </h2>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleEditData}
            className='UserData'
          >
            <Form.Group controlId='fromBasicName'>
              <Form.Label>Vards</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Ievadiet vardu'
                value={name}
                onChange={handleChangeName}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicLastName'>
              <Form.Label>Uzvards</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Ievadiet uzvardu'
                value={surname}
                onChange={handleChangeSurname}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicEmail'>
              <Form.Label> E-pasts </Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Ievadiet e-pastu'
                value={email}
                onChange={handleChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicPassword'>
              <Form.Label> Parole </Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Ievadiet paroli'
                value={password}
                onChange={handleChangePassword}
              />
            </Form.Group>
            <div className='button'>
              <Button variant='primary' type='submit'> Rediģēt </Button>
            </div>
          </Form>
        </Container>
      </main>
    );
  }
}

export default MyAccountComponent;
