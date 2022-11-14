import React from 'react';
import TodoApp from './components/TodoApp';
import './App.css';
import background1 from './assets/img/background2.jpg';

function App() {
  return (
    <div className="App">
      <div className="hero">
        <img className="background" src={background1} alt="background" />
      </div>
      <TodoApp />
    </div>
  );
}

export default App;
