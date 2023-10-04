import React from 'react'

export default function Cards({
    id,
    name,
    species,
    image,
    handleClick
}) {
  return (
    <>
  <div className="bg-white rounded-lg shadow-lg md:w-1/5 m-2 md:m-5 hover:shadow-purple-800" onClick={()=>handleClick(id)}>
  <img className='object-cover rounded-t-lg w-full' src={image} alt="" />
  <div className="p-4 md:p-6">
    <h2 className="font-bold  text-xl md:text-2xl text-purple-800">{name}</h2>
    <p className="text-purple-700 ">{species}</p>
  </div>
</div>

    </>
  )
}
