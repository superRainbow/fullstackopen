import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Course from './components/course';
import TodoList from './components/todolist';
import FilterCountries from './components/filterCountries';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return <div>{ courses.map((course, index) => <Course key={index} course={course} />) }</div>
};

ReactDOM.render(
  <BrowserRouter>
    <h1>功能</h1>
    <ul>
        <li><Link to="/index">基本 React 練習</Link></li>
        <li><Link to="/todolist">todolist</Link></li>
        <li><Link to="/filterCountries">filter Countries</Link></li>
    </ul>
    <Route path="/index" component={App} />
    <Route path="/todolist" component={TodoList} />
    <Route path="/filterCountries" component={FilterCountries} />
  </BrowserRouter>,
  document.getElementById('root')
);