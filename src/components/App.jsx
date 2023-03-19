import { useState } from 'react';

import Statistics from 'components/Statistics';
import Notification from 'components/Notification';
import Section from 'components/Section';
import FeedbackOptions from './FeedbackOptions';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const chandlClickButton = e => {
    let buttonName = e.target.name;

    switch (buttonName) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;
  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();

    let result = 0;

    if (totalFeedback > 0) {
      result = Math.ceil((good / totalFeedback) * 100);
    }

    return `${result}%`;
  };

  return (
    <div>
      <div>
        <Section title="Please leave feedback">
          {
            <FeedbackOptions
              nameBtn={['good', 'neutral', 'bad']}
              handlClickButton={chandlClickButton}
            ></FeedbackOptions>
          }
        </Section>
      </div>

      <div>
        <Section title="Statistics">
          {countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message={'There is no feedback'} />
          )}
        </Section>
      </div>
    </div>
  );
};

export default App;
