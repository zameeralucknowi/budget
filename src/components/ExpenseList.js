import React from 'react'
import ExpenseItem from './ExpenseItem';
import { MdDelete } from "react-icons/md";

const ExpenseList = ({expense,handleDelete,handleEdit,clearItems}) => {
  return (
<>
<ul className='list' >
    {expense.map((exp)=>{
return <ExpenseItem key={exp.id} exp={exp} handleDelete={handleDelete} handleEdit={handleEdit} />
    })}
</ul>

{expense.length >0 && <button className='btn' onClick={clearItems} >
    Clear expenses
    <MdDelete className='btn-icon'/>
</button> }
</>
  )
}

export default ExpenseList
