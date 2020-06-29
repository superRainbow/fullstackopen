import React from 'react';

import Part from '../part';

const Content = ({data}) => (
  <ul>
    { data.map(item => <Part key={item.id} data={item} />) }
  </ul>
);

export default Content;
