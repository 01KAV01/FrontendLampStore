// *********************
// Пока не готво
// *********************

import React from 'react'

const UrgencyText = ({stock} : { stock: number }) => {
  return (
    <p className='text-success text-xl max-[500px]:text-lg'>Поторопитесь! только<span className='badge badge-success text-white text-xl max-[500px]:text-lg'>{stock}</span> товар остался на складе!</p>
  )
}

export default UrgencyText