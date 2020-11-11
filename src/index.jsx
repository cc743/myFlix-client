import React from 'react';
import ReactDOM from 'react-dom';

//Import statements to indicate that you need to bundle './index.scss'
import './index.scss';

//Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);