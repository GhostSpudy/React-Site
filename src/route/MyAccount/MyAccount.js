import React, { PureComponent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from "axios";
import { updateUser } from '../../redux/UserReducer';

import './MyAccount.scss';

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser:(userData) => dispatch(updateUser(userData)),
  }
};

class MyAccount extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      validated: false,
      name: '',
      surname: '',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    const isAuthFromStorage = localStorage.getItem('isAuth') === 'true';
    const userFromStorage = JSON.parse(localStorage.getItem('currentUser'));

    if (isAuthFromStorage) {
      this.setState({
        name: userFromStorage.name,
        surname: userFromStorage.surname,
        email: userFromStorage.email,
        password: userFromStorage.password
      });
    }
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeSurname(event) {
    this.setState({surname: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleEditData = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity()) {
      this.changeUserData();

      return;
    }

    this.setState({validated: true});
  }

  changeUserData() {
    const { updateUser, currentUser: { currentUser } } = this.props;
    const {
      name, surname,
      email, password
    } = this.state;

    if (
      currentUser.name === name &&
      currentUser.surname === surname &&
      currentUser.email === email &&
      currentUser.password === password
    ) {
      this.setState({validated: false});
      return;
    }
    axios.put(`https://62828b39ed9edf7bd88644ad.mockapi.io/api/users/${currentUser.id}`, {
      name,
      surname,
      email,
      password
    })
      .then(res => {
        updateUser(res.data);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        this.setState({validated: false});
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  render() {
    const { validated, name, surname, email, password } = this.state;

    return (
      <main className='Profile'>
        <Container>
          <h2> {name} </h2>
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleEditData}
            className='UserData'
          >
            <Form.Group controlId='fromBasicName'>
              <Form.Label>Vards</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Ievadiet vardu'
                value={name}
                onChange={this.handleChangeName}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicLastName'>
              <Form.Label>Uzvards</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Ievadiet uzvardu'
                value={surname}
                onChange={this.handleChangeSurname}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicEmail'>
              <Form.Label> E-pasts </Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Ievadiet e-pastu'
                value={email}
                onChange={this.handleChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicPassword'>
              <Form.Label> Parole </Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Ievadiet paroli'
                value={password}
                onChange={this.handleChangePassword}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)