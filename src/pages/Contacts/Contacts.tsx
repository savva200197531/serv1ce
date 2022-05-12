import React from 'react'
import './contacts.scss'
import { Map, Placemark } from 'react-yandex-maps'

const mapData = {
  center: [53.3741746448565, 83.74993629840466],
  zoom: 15,
}

const addressData = [
  'ООО “Газойл”',
  'ул. Северо-Западная, д. 20',
  'Барнаул, 656037',
]

const Contacts = () => {
  return (
    <section className="contacts">
      <div className="container">
        <div className="contacts-content">
          <div className="contacts-text">
            <h3 className="contacts-title">КОНТАКТНАЯ ИНФОРМАЦИЯ</h3>
            {addressData.map((item, index) => <p key={index}>{item}</p>)}
          </div>
          <div className="contacts-map">
            <Map width="100%" height={400} defaultState={mapData}>
              <Placemark geometry={[53.3741746448565, 83.74993629840466]}/>
            </Map>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
