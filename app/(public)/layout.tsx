import React from 'react'

const layout = async({children}: {children: React.ReactNode}) => {
  return (
    <div><main>{children}</main></div>
  )
}

export default layout