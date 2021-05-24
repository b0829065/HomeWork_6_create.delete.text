import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;



// import React from 'react';
// import Todo from './TextEdit';

// class App extends React.Component {
//     constructor (props) {
//         super (props);

//         this.state = {
//             todos: [
//                 {id: 1, text: 'tip：點文字兩下可以編輯', completed: false},
//                 {id: 2, text: '好啦其實我是', completed: true},
//                 {id: 3, text: '網路上找答案的', completed: false},
//                 {id: 4, text: '不得不說最近期末好多項目要做', completed: false},
//                 {id: 5, text: '相信我，之後一定會好好研究這份homework的QQ，因為我知道這裡很重要', completed: false},
//             ],
//             newId: 6,
//             newText: '',
//         }
//     }
    
//     // 取 todo 的內容
//     getNewValue (e) {
//         const newText = e.target.value;
        
//         this.setState({
//             newText: newText,
//         });
//     }
    

//     // 新增
//     addTodo (e) {
//         const {todos, newText, newId} = this.state;
        
//         if (!newText) {
//             e.preventDefault();
//             return;
//         }
        
//         this.setState({
//             todos: [
//                 ...todos,
//                 {id: newId, text: newText, completed: false}
//             ],
//             newId: newId +1,
//             newText: '',
//         });
//     }

//     // 刪除
//     deleteTodo (id) {
//         const {todos} = this.state;
        
//         let newTodos = todos.filter((item) => item.id !== id);
        
//         this.setState({
//             todos: newTodos,
//         });        
//     }

//     // 完成
//     checkTodoToggle (id) {
//         const {todos} = this.state;

//         let newTodos = todos.map((item) => {
//             if(item.id === id){
//                 item.completed = !item.completed;
//             }
//             return item;
//         });
        
//         this.setState({
//             todos: newTodos,
//         })
//     }


//     // 編輯
//     saveEditedValue(id, value) {
//         const {todos} = this.state;

//         let newTodos = todos.map((item) => {
//             if(item.id === id){
//                 item.text = value;
//             }
//             return item;
//         });
        
//         this.setState({
//             todos: newTodos,
//         })
//     }
    


//     render () {
//         let {todos} = this.state;
        
//         //console.log(todos)

//         return (
//             <div className="container">
//                 <header className="header__container">
//                     <h1 className="header__site-title">Todo list</h1>
//                     <p className="header__site-description">馬上 記下 想要做的任何事</p>
//                 </header>
//                 <div className="input-group mb-3">
//                     <input type="text" className="form-control" id="input-add" placeholder="I'm gonna do..."
//                         value={this.state.newText}
//                         onChange={(e) => this.getNewValue(e)} />
//                     <div className="input-group-append">
//                         <button
//                             className="btn btn-outline-secondary"
//                             onClick={(e) => this.addTodo(e)}
//                         >add</button>
//                     </div>
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     {todos.map((todo) =>
//                         <Todo
//                             key={todo.id}
//                             todo={todo}
//                             remove={(id) => this.deleteTodo(id)}
//                             checkToggle={(id) => this.checkTodoToggle(id)}
//                             saveEditedValue={(id, value) => this.saveEditedValue(id, value)}
//                         />
//                     )}
//                 </ul>
//             </div>
//         );
//     }
// }

// export default App;