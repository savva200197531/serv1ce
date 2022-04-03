import React from 'react'
import './Contacts.scss'
import { Button } from '@mui/material'

const Contacts: React.FC = () => {
  return (
    <section className="contacts-section">
      <div className="container">
        <div className="contacts">
          <div className="contacts-info">
            <h2 className="section-title">Контакты</h2>
            <div className="contacts-data">
              <p className="contacts-address">г. Томск, ул. Говорова, д. 19В</p>
              <div className="contacts-data__bottom">
                <p className="contacts-phone">8 (3822) 2-111-95</p>
                <p className="contacts-email">info@fcva-bank.ru</p>
              </div>
            </div>
          </div>
          <form className="contacts-form">
            <h3 className="form-title">Запишитесь на первое бесплатное занятие</h3>
            <input type="text" className="form-input" placeholder="Имя" />
            <input type="text" className="form-input" placeholder="Телефон" />
            <div className="select">
              <select defaultValue={0} name="slct" id="slct">
                <option value="0" disabled>
                  Возраст ребёнка
                </option>
                <option value="1">4 - 6 лет</option>
                <option value="2">7 - 9 лет</option>
                <option value="3">10 - 12 лет</option>
              </select>
            </div>
            <div className="form-agreement">
              <div className="checkbox">
                <input id="ch1" type="checkbox" className="checkbox-input" />
                <label htmlFor="ch1" className="checkbox-label">
                  Я согласен на обработку персональных данных
                </label>
              </div>
            </div>
            <Button variant="contained" color="primary">
              Записаться на занятие
            </Button>
          </form>
        </div>
      </div>
      <div className="map" />
    </section>
  )
}

export default Contacts
