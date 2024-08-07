import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({ title } : { title? : string }) => {
  return (
    <Helmet>
        <title>{title ? `${title} | FC-Archive` : 'FC-Archive' } </title>
    </Helmet>
  )
}

export default Title