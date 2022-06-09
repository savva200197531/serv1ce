import React from 'react'

type Props = {
  text?: string
}

const PersonalDataText: React.FC<Props> = ({ text }) => {
  return (
    <p>
      Нажимая на кнопку &#34;{text}&#34;, Вы даете Согласие на обработку персональных данных в соответствии с
      &#34;Политикой в области обработки и защиты персональных данных&#34;.
    </p>
  )
}

export default PersonalDataText
