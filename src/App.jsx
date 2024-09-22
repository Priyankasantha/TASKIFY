
import React,{ useState,useEffect } from 'react'
import './App.css'
import{AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'
import{BsCheckLg}from 'react-icons/bs'


function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState('');
  const [newDescription,setNewDescription]=useState('');
  const[completedTodos,setCompletedTodos]=useState([]);


  

  
  
  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };
  const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
};
 
  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd + '-'+ mm +'-'+ yyyy +'-'+' '+'  at  '+ h +':'+ m +':'+ s ;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify( updatedCompletedArr));
}

  const handleDeleteCompletedTodo=(index)=>{

    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);


  }
  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  
  return (
    <>
    <div><h1 className='press-start-2p-regular'>TASKIFY</h1>
  
    <div>
      <div className='to-do-wrap'>
        <div className='to-do-input'>
          <div className='to-do-input-item'>
            <label>TITLE</label>
            <input type="text" value={newTitle}onChange={e=>setNewTitle(e.target.value)} placeholder=" What's the task bro...?" />
          </div>
          <div className='to-do-input-item'>
            <label>DESCRIPTION</label>
            <input type="text"value={newDescription}onChange={e=>setNewDescription(e.target.value)}  placeholder="Description...?" />
          </div>
          <div className='to-do-input-item'>
            <button type="button" onClick={handleAddTodo}className='primarybtn'>ADD</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondary-btn ${isCompleteScreen===false && 'active'}`}onClick={()=>setIsCompleteScreen(false)}>TODO</button>
          <button className={`secondary-btn ${isCompleteScreen===true && 'active'}`}onClick={()=>setIsCompleteScreen(true)}>COMPLETED</button>
        </div>

        <div className='to-do-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='to-do-list-item' key={index}>
               <div>
                 <h3>{item.title}</h3>
                 <p>{item.description}</p>
               </div>
              <div>
                 <AiOutlineDelete className='icons' onClick={()=>handleDeleteTodo(index)}title="Delete?"/>
                 <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)}title="Complete?"/> 
              </div>
             </div>
            )
          })}
          
       {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='to-do-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on:{item.completedOn}</small></p>
            </div>
            <div>
            <AiOutlineDelete className='icons' onClick={()=>handleDeleteCompletedTodo(index)}title="Delete?"/>
          

            </div>
          </div>
            )
          })}

        </div>
      </div>
    </div>
    </div>
    
  
    
    </>
  )
}

export default App
