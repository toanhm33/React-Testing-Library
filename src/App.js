import React from 'react';
import './App.css';
import TestElements from './components/TestElements'
import TestAsync from './components/TestAsync'
import TestAxios from './components/TestAxios'
import CounterProvider from './components/TestContext'
import TestEvents from './components/TestEvents'
import TestRedux from './components/TestRedux'

function App() {
  return (
    <div className="App">
      <h1>Testing Updated</h1>
      <TestElements/>
      <TestAsync/>
      <TestAxios/>
      <CounterProvider/>
      <TestEvents/>
      <TestRedux/>
      {/* <TestRouter/> */}
    </div>
  );
}


export default App;
