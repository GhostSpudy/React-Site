import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import HomePage from './route/HomePage/HomePage';
import SignIn from './route/SignIn/SignIn';
import SignUp from './route/SignUp/SignUp';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.scss';
import Header from './component/Header/HeaderComponent';
import Footer from './component/Footer/FooterComponent';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}
