import React from 'react';

import Header from './header/header';
import Content from './content/content';
import Total from './total/total';

const Course = ({course}) => {
  const total = course.parts.reduce((accumulator, item) => accumulator + item.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content data={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
