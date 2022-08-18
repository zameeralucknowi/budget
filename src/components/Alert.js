import React from 'react'

const Alert = (props) => {
  return (
  <>
{props.alert && <div className={`alert alert-${props.alert.type}`}>
{props.alert.text}
</div>}
  </>
  )
}

export default Alert
