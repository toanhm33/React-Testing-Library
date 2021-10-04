import React from 'react';
import './App.css';
import TestElements from './components/TestElements'
import TestAsync from './components/TestAsync'
import CounterProvider from './components/TestContext'
import TestEvents from './components/TestEvents'
import TestRedux from './components/TestRedux'

function App() {
  return (
    <div className="App">
      <h1>Testing react library</h1>
      <TestElements/>
      <TestEvents/>
      <TestAsync/>
      <TestRedux/>
      <CounterProvider/>
    </div>
  );
}


export default App;
