import React, { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneMask = forwardRef<HTMLElement, Props>(
    function PhoneMask(props, ref) {
      const { onChange, ...other } = props
      return (
        <IMaskInput
          {...other}
          mask="+7 (000) 000-0000"
          definitions={{
            '#': /[1-9]/,
          }}
          inputRef={ref as any}
          onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      )
    },
)
