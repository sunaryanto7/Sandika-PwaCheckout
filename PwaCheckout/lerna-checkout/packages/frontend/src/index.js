import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from '@app/modules/main';
import NotFound from '@app/modules/404';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route exact path="/" element={<App />} />
      <Route exact path="/checkout" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);