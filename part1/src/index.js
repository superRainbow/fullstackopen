import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header';
import Content from './content/content';
import Total from './total/total';

const App = () => {
  const [ counter, setCounter ] = useState(0);
  const course = 'Half Stack application development';
  const contentArray = [
    { part: 'Fundamentals of React', exercise: 10 },
    { part: 'Using props to pass data', exercise: 7 },
    { part: 'State of a component', exercise: 14 }
  ];

  setTimeout(() => setCounter(counter + 1),1000);

  const contentDom = contentArray.map((item, index) => {
    return <Content key={`content-${index}`} part={item.part} part={item.exercise} />
  })

  return (
    <div>
      <Header course={course} />
      { contentDom }
      <Total total={contentArray.map(item => item.exercise).reduce((accumulator, currentValue) => accumulator + currentValue)} />
      <div>{counter}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));