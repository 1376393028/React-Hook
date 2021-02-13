import React from 'react';
import ReactDOM from 'react-dom'


 let memoizedState = []; 
 let cursor = 0; 

 function render() {
  cursor = 0;
  ReactDOM.render(
  <App />,
  document.getElementById('root')
  );
 }
 
 function useState(initialValue) {
   memoizedState[cursor] = memoizedState[cursor] || initialValue;
   const currentCursor = cursor;
   function setState(newState) {
     memoizedState[currentCursor] = newState;
     render();
   }
   return [memoizedState[cursor++], setState]; 
 }
 
 function useEffect(callback, depArray) {
   const hasNoDeps = !depArray;
   const deps = memoizedState[cursor];
   const hasChangedDeps = deps
     ? !depArray.every((el, i) => el === deps[i]): true;
   if (hasNoDeps || hasChangedDeps) {
     callback();
     memoizedState[cursor] = depArray;
   }
   cursor++;
 }


function App() {
  const [count,setCount] = useState(0);
  const [age,steAge] = useState(0);
  useEffect(() => {
    console.log(`click a ${count}+${age}time`)
  })
  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Click me {count}</button>
      <p>You clicked {age} times</p>
      <button onClick={() => steAge(age + 1)}> Click me {age}</button>
    </div>
 );
}
export default App;
