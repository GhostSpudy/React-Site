import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './route/HomePage';
import AboutUs from './route/AboutUs';
import BlogsCategories from './route/BlogsCategories';
import MyAccount from './route/MyAccount';
import NoMatch from './route/NoMatch';

import Header from './component/Header/Header.component';
import Footer from './component/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.scss';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blogs-categories" element={<BlogsCategories />} />
          <Route path="/profile" element={<MyAccount />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>

        <Footer />
      </Router>
    );
  }
}
