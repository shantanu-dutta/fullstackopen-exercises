import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      {props.total > 0 ? (
        <div>
          <table>
            <thead>
              <tr></tr>
              <tr></tr>
            </thead>
            <tbody>
              <StatisticLine label="good" value={props.good} />
              <StatisticLine label="neutral" value={props.neutral} />
              <StatisticLine label="bad" value={props.bad} />
              <StatisticLine label="total" value={props.total} />
              <StatisticLine label="average" value={props.average} />
              <StatisticLine
                label="positivePercentage"
                value={`${props.positivePercentage}%`}
              />
            </tbody>
          </table>
        </div>
      ) : (
        "No feedback given"
      )}
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positivePercentage = total > 0 ? (good / total) * 100 : 0;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button
          label="good"
          onClick={() => setGood((prevGood) => prevGood + 1)}
        />
        <Button
          label="neutral"
          onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}
        />
        <Button label="bad" onClick={() => setBad((prevBad) => prevBad + 1)} />
      </div>

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
