import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Modal
} from "react-bootstrap";
import { connect } from 'react-redux';
import axios from "axios";
import { setAdmin, logoutAdmin } from "../../redux/AdminReducer";
import { setUser, logout } from "../../redux/UserReducer";

import logo from "../../style/icons/blog128.png";
import './Header.scss';

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    currentUser: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdministrator:(email) => dispatch(setAdmin(email)),
    logoutAdmin:() => dispatch(logoutAdmin()),
    addUser:(userData) => dispatch(setUser(userData)),
    logout:() => dispatch(logout())
  }
};

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeIEmail = this.handleChangeIEmail.bind(this);
    this.handleChangeIPassword = this.handleChangeIPassword.bind(this);
    this.handleChangeUName = this.handleChangeUName.bind(this);
    this.handleChangeUSurname = this.handleChangeUSurname.bind(this);
    this.handleChangeUEmail = this.handleChangeUEmail.bind(this);
    this.handleChangeUPassword = this.handleChangeUPassword.bind(this);

    this.state = {
      showSignIn: false,
      showSignUp: false,
      validated: false,
      IEmail: '',
      IPassword: '',
      UName: '',
      USurname: '',
      UEmail: '',
      UPassword: '',
      postWritten: 0,
      emailExist: false,
      wrongData: false
    };
  }

  componentDidMount() {
    const isAuthFromStorage = localStorage.getItem('isAuth') === 'true';
    const userFromStorage = JSON.parse(localStorage.getItem('currentUser'));
    const isAdminFromStorage = localStorage.getItem('isAdmin') === 'true';
    const adminEmailFromStorage = localStorage.getItem('adminEmail');

    if (isAuthFromStorage && Object.keys(userFromStorage).length !== 0) {
      const { currentUser: { isAuth, currentUser}, addUser } = this.props;

      if (isAuth === false && !Object.keys(currentUser).length) {
        addUser(userFromStorage);
      }
    }

    if (isAdminFromStorage && adminEmailFromStorage === 'admin@admin.admin') {
      const { admin: { isAdmin, adminEmail }, setAdministrator } = this.props;

      if (isAdmin === false && adminEmail === '') {
        setAdministrator(adminEmailFromStorage);
      }
    }
  }

  handleChangeIEmail(event) {
    this.setState({IEmail: event.target.value});
  }

  handleChangeIPassword(event) {
    this.setState({IPassword: event.target.value});
  }

  handleChangeUName(event) {
    this.setState({UName: event.target.value});
  }

  handleChangeUSurname(event) {
    this.setState({USurname: event.target.value});
  }

  handleChangeUEmail(event) {
    this.setState({UEmail: event.target.value});
  }

  handleChangeUPassword(event) {
    this.setState({UPassword: event.target.value});
  }

  handleSignInSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity()) {
      const { addUser, setAdministrator } = this.props;
      const {
        IEmail: email,
        IPassword: password
      } = this.state;

      if (email === 'admin@admin.admin' && password === 'admin') {
        setAdministrator(email);

        localStorage.setItem('isAdmin', true);
        localStorage.setItem('adminEmail', email);

        this.setState({ showSignIn: false, validated: false});

        return;
      }

      axios.get('https://62828b39ed9edf7bd88644ad.mockapi.io/api/users')
        .then(res => {
            const userData = res.data.reduce((res, obj) => (
              obj.email === email && obj.password === password
            ) ? obj : res, {});
            const ifDataCorrect = !Object.keys(userData).length;

          if (ifDataCorrect) {
            this.setState({wrongData: true, validated: false});
          } else {
            addUser(userData);
            localStorage.setItem('isAuth', true);
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.setState({
              wrongData: false,
              showSignIn: false,
              validated: false
            });
          }
        })
        .catch(err => {
          throw new Error(err)
        })
    }

    this.setState({validated: true});
  }

  showErrorIn() {
    const { wrongData } = this.state;

    if (wrongData) {
      return (
        <div className='error-text'>
          <p> Nepareizi dati! </p>
        </div>
      )
    }
  }

  signInWindow() {
    const { showSignIn, validated } = this.state;

    return (
      <Modal
        show={showSignIn}
        onHide={() => this.setState({ showSignIn: false })}
        className='SignIn'
      >
        <Modal.Header closeButton>
          <Modal.Title>Ielagoties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleSignInSubmit}
          >
            <Form.Group controlId='fromBasicEmail'>
              <Form.Label>E-pasta adrese</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Ievadiet e-pastu'
                onChange={this.handleChangeIEmail}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Parole</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Ievadiet paroli'
                onChange={this.handleChangeIPassword}
              />
            </Form.Group>
            { this.showErrorIn() }
            <div className='buttons'>
              <Button variant='primary' type='submit'> Ielagoties </Button>
              <Button
                variant='primary'
                onClick={ () => this.setState({ showSignIn: false, showSignUp: true }) }
              >
                Reģistrēties
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  handleSignUpSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity()) {
      const {
        UName: name,
        USurname: surname,
        UEmail: email,
        UPassword: password,
        postWritten
      } = this.state;

      axios.get('https://62828b39ed9edf7bd88644ad.mockapi.io/api/users')
        .then(res => {
          const test = res.data.map(test => (test.email === email)).includes(true);

          if (test) {
            this.setState({emailExist: true, validated: false});
          } else {
            axios.post('https://62828b39ed9edf7bd88644ad.mockapi.io/api/users', {
              name,
              surname,
              email,
              password,
              postWritten
            })
              .then(res => res.data)
              .catch(err => {
                throw new Error(err)
              })

            this.setState({
              emailExist: false,
              showSignUp: false,
              showSignIn: true,
              validated: false
            });
          }
        })
        .catch(err => {
          throw new Error(err)
        })
    }

    this.setState({validated: true});
  }

  showErrorUp() {
    const { emailExist } = this.state;

    if (emailExist) {
      return (
        <div className='error-text'>
          <p> Lietotājs ar šo e-pasta adresi jau eksistē! </p>
        </div>
      )
    }
  }

  signUpWindow() {
    const { showSignUp, validated } = this.state;

    return (
      <Modal
        show={showSignUp}
        onHide={() => this.setState({showSignUp: false, emailExist: false})}
        className='SignUp'
      >
        <Modal.Header closeButton>
          <Modal.Title>Reģistrēties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleSignUpSubmit}
          >
            <Form.Group controlId='fromBasicName'>
              <Form.Label>Vards</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Ievadiet vardu'
                onChange={this.handleChangeUName}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicLastName'>
              <Form.Label>Uzvards</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Ievadiet uzvardu'
                onChange={this.handleChangeUSurname}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicEmail'>
              <Form.Label> E-pasts </Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Ievadiet e-pastu'
                onChange={this.handleChangeUEmail}
              />
            </Form.Group>
            <Form.Group controlId='fromBasicPassword'>
              <Form.Label> Parole </Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Ievadiet paroli'
                onChange={this.handleChangeUPassword}
              />
            </Form.Group>
            {this.showErrorUp()}
            <div className='buttons'>
              <Button variant='primary' type='submit'> Reģistrēties </Button>
              <Button
                variant='primary'
                onClick={() => this.setState({showSignUp: false, showSignIn: true, emailExist: false})}>
                Ielagoties
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  renderSignInUpButton() {
    const { currentUser: { isAuth }, admin: { isAdmin } } = this.props;

    if (isAuth || isAdmin) {
      return
    }

    return (
      <Button
        variant='dark'
        onClick={() => this.setState({ showSignIn: true, validated: false })}
      >
        Ielagoties/Reģistrēties
      </Button>
    );
  }

  renderUserButtons() {
    const { logout, currentUser: { isAuth, currentUser } } = this.props;

    if (isAuth && Object.keys(currentUser).length !== 0) {
      return (
        <>
          <Link to='/python' className='nav-link'>Python</Link>
          <Link to='/profile' className='nav-link'>{currentUser.name}</Link>
          <Link
            to='/'
            className='nav-link'
            onClick={() => logout()}
          >
            Iziet
          </Link>
        </>
      );
    }

    return
  }

  renderAdminButtons() {
    const { logoutAdmin, admin: { isAdmin, adminEmail } } = this.props;

    if (isAdmin && adminEmail === 'admin@admin.admin') {
      return (
        <>
          <Link to='/python' className='nav-link'>Python</Link>
          <Link to='/' className='nav-link'> Admin </Link>
          <Link
            to='/'
            className='nav-link'
            onClick={() => logoutAdmin()}
          >
            Iziet
          </Link>
        </>
      );
    }

    return
  }

  buttonList() {
    return (
      <Nav className='ButtonList mr-auto'>
        <Link to='/blogs-categories' className='nav-link'> Ziņu kategorijas </Link>
        <Link to='/about-us' className='nav-link'> Par mums </Link>
        { this.renderSignInUpButton() }
        { this.renderUserButtons() }
        { this.renderAdminButtons() }
      </Nav>
    )
  }

  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand='md'
          bg='dark'
          variant='dark'
          className='Header'
        >
          <Container>
            <Navbar.Brand>
              <Link to='/'>
                <img
                  src={ logo }
                  height='30'
                  width='30'
                  className='d-inline-block align-top'
                  alt='logo'
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse 
              id='responsive-navbar-nav'
              className='justify-content-end'
            >
              { this.buttonList() }
            </Navbar.Collapse>
          </Container>
        </Navbar>
        { this.signInWindow() }
        { this.signUpWindow() }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)