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
  // const [ good, setGood] = useState(0);
  // const [ neutral, setNeutral] = useState(0);
  // const [ bad, setBad] = useState(0);
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
      <h1>give feedback</h1>
      <Button handleClick={() => clickEvent('good')} text="good" />
      <Button handleClick={() => clickEvent('neutral')} text="neutral" />
      <Button handleClick={() => clickEvent('bad')} text="bad" />
      <div>
        <p>Statistics</p>
        <Statistics data={data} />
      </div>
    </div>
  )
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);