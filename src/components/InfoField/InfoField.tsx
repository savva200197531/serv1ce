import React from 'react'
import './info-field.scss'

type Props = {
  label: string
  text?: string
}

const InfoField: React.FC<Props> = ({ label, text }) => {
  return <p className="info-field"><span>{label}:</span> {text}</p>
}

export default InfoField
