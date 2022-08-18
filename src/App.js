import React, { useState,useEffect} from 'react'
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';


// const initial = [
//   {id:uuidv4(),charge:"elec",amount:2000},
//   {id:uuidv4(),charge:"water",amount:1000},
//   {id:uuidv4(),charge :"bill ", amount:1500}
// ]

const initial = localStorage.getItem("expense")? JSON.parse(localStorage.getItem("expense")):[]

const App = () => {

  const [expense,setExpense] = useState(initial)

  const [charge,setCharge] = useState("")

  const [amount,setAmount] = useState("")

  const[alert,setAlert] = useState(null)

  const [edit,setEdit] = useState(false);

  const [id,setId] = useState(0)


  useEffect(()=>{
    localStorage.setItem("expense",JSON.stringify(expense));
  },[expense])


  // alert for the msg
  const handleAlert = (type,text) =>{
setAlert({
  type : type,
  text : text
})

setTimeout(() => {
  setAlert(null)

}, 2000);
  }

  // onchange event of the chrge
  const handleCharge = (e) =>{

    setCharge(e.target.value)
  }
 // onchange event of the amount
  const handleAmount = (e) =>{

    setAmount(e.target.value)
  }


// on submission
  const handleSubmit = (e) =>{
e.preventDefault();

// on addition of the items to the list

if(charge!=="" && amount>0){
  if(edit){
    let temp = expense.map(item=>{
      return item.id===id?{...item,charge,amount}:item;
    })
    setExpense(temp);
    setEdit(false);
    handleAlert("success","item edited successfully")
  }
  else{
    let item = {id:uuidv4(),charge,amount}
  setExpense([...expense,item])

  handleAlert("success","item added successfully")
  }
  setCharge("")
  setAmount("")
}
else{
  handleAlert("danger","cannot add an empty record")
}

  }

// deleting all items
const clearItems =()=>{
  setExpense([])
  handleAlert("danger"," All items deleted")
}

//delete an item
const  handleDelete = (id)=>{
  const tempExp = expense.filter(item=>item.id!==id)
  setExpense(tempExp);
  handleAlert("danger","item deleted")
}

//edit  an item
const  handleEdit = (id)=>{

let tempexp = expense.find(item=>item.id===id)
let {charge,amount} = tempexp;
setCharge(charge);
setAmount(amount);
setEdit(true);
setId(id);

  }


  return (

   <>
 <Alert alert={alert}/>

   <h1>Budget calculator</h1>

   <main className='App'>
   <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit} />
   <ExpenseList expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} />
   </main>
   <h1>
    total spending : <span className='total' >
       $ {expense.reduce((acc,curr)=>{
        return (acc+=parseInt(curr.amount))
      },0)}
    </span>
   </h1>

   </>

  )
}

export default App
