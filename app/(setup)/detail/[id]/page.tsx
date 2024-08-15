"use client"

import { useParams, useRouter, } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


 function DetailPage() {
    const dispatch=useDispatch()
    const router = useParams();
console.log("router",router.id)
// useEffect(()=>{
// if(router.id){
// dispatch(updatePost({Number(router.id),item}))
// } else {
//     dispatch(createPost({item}))
// }
// },[])

  return (
    <div>page</div>
  )
}

export default DetailPage