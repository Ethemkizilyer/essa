import React from 'react'

function Error({error}:{error:string | null}) {
  return (
    <div className="flex justify-center items-center">Error: {error}</div>
  )
}

export default Error