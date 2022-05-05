import React, { useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import './img-input.scss'

type Props = {
  errors?: string[]
  setImgFile: (value: File) => void
  label?: string
  initialImg?: string
}

const ImgInput: React.FC<Props> = ({ errors, setImgFile, label = 'Выберите изображение', initialImg = '' }) => {
  const [img, setImg] = useState<string>(initialImg)

  const handleCapture = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return

    const file = target.files[0]
    setImgFile(file)

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = ({ target }: ProgressEvent<FileReader>) => {
      setImg(target?.result as string)
    }
  }

  return (
    <>
      <input
        accept="image/*"
        id="icon-button-photo"
        onChange={handleCapture}
        type="file"
        style={{
          display: 'none',
        }}
      />
      <div>
        <label className="img-label" htmlFor="icon-button-photo">
          <Button color="primary" component="span">
            <FontAwesomeIcon icon={faCamera as any} size="2x"/>
            <span className="img-label__text">{label}</span>
          </Button>
        </label>
        <p className="img-errors">{errors?.map((error) => error)}</p>
      </div>
      {img && <img className="img-preview" src={img} alt="img"/>}
    </>
  )
}

export default ImgInput
