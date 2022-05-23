import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { updateUser } from '../../redux/UserReducer';

import MyAccount from './MyAccount.component';

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

class MyAccountContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleEditData = this.handleEditData.bind(this);

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

    if (isAuthFromStorage && Object.keys(userFromStorage).length !== 0) {
      this.setState({
        name: userFromStorage.name,
        surname: userFromStorage.surname,
        email: userFromStorage.email,
        password: userFromStorage.password
      });
    }
  }

  containerProps() {
    const { currentUser } = this.props;
    const { validated, name, surname, email, password } = this.state;

    return {
      handleChangeName: this.handleChangeName,
      handleChangeSurname: this.handleChangeSurname,
      handleChangeEmail: this.handleChangeEmail,
      handleChangePassword: this.handleChangePassword,
      handleEditData: this.handleEditData,
      currentUser,
      validated,
      name,
      surname,
      email,
      password
    };
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
    return (
      <MyAccount 
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer);
