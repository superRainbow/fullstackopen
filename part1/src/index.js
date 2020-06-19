import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const Statistic = ({ text, value }) => (
  <p>{text} {value}</p>
);

const Statistics = (props) => {
  const { good, neutral, bad } = props.data;
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const proitve = (good / total) * 100;

  if(total === 0) {
    return(
      <div>
        <p>no feedback given</p>
      </div>
    );
  }

  return(
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <p>all { total }</p>
      <p>average { average }</p>
      <p>proitve { proitve }%</p>
    </div>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  const [points, setPoints] = useState({ 0: 1, 1: 3, 2: 4, 3: 2 });
  const [selected, setSelected] = useState(0);
  const [ data, setData] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const clickEvent = (key) => {
    setData({...data, [key]: data[key] + 1})
  };

  return (
    <div>
      <div>
        <div>{anecdotes[selected]}</div>
        <p>has {points[selected]} votes.</p>
        <Button handleClick={() => setPoints({ ...points, [selected]: points[selected] + 1 })} text="vote" />
        <Button handleClick={() => setSelected(selected + 1)} text="next anecdote" />
      </div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => clickEvent('good')} text="good" />
        <Button handleClick={() => clickEvent('neutral')} text="neutral" />
        <Button handleClick={() => clickEvent('bad')} text="bad" />
        <div>
          <p>Statistics</p>
          <Statistics data={data} />
        </div>
      </div>
    </div>
  )
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);