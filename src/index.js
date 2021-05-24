import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const DATA = [
  { id: "todo-0", name: "有料", completed: true },
  { id: "todo-1", name: "學長辛苦ㄌ", completed: false },
  { id: "todo-2", name: "這樣功能應該齊全了", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);



// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
