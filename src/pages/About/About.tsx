import React from 'react'
import './about.scss'
import { Placemark, Map } from 'react-yandex-maps'
import photo1 from '../../assets/images/photo1.jpg'
import photo2 from '../../assets/images/photo2.jpg'
import photo3 from '../../assets/images/photo3.jpg'
import photo4 from '../../assets/images/photo4.jpg'

const mapData = {
  center: [53.3741746448565, 83.74993629840466],
  zoom: 15,
}

const addressData = [
  'ООО “Газойл”',
  'ул. Северо-Западная, д. 20',
  'Барнаул, 656037',
  // 'Телефон: +7 (923) 561-2109',
  // 'факс: +7 (923) 561-2109',
  // 'E-mail: info@rusteletech.ru',
]

const imgData = [
  {
    img: photo1,
    text: 'Выручка компании с 2015-2021гг. По данному графику видно, что рост компании был до 2020 г., он состовлял выше 60млн.руб. С 2020г. по 2021г. выручка упала до 40млн.руб.',
  },
  {
    img: photo2,
    text: 'График чистой прибыли с 2015-2021гг. На графике видно, что чистая прибыль повышалась с 2015 г. по 2018г. и с 2019г. по 2020г. Спад происходил с 2018г. по 2019г. и с 2020г. по 2021г.',
  },
  {
    img: photo3,
    text: 'Финансовые показатели за 2021г.',
  },
  {
    img: photo4,
    text: 'Налоги и сборы за 2020г.',
  },
]

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-section">
            <h1 className="about-title">О нас</h1>
            <p>
              Компания ООО «ТЕХНОГАЗСЕРВИС», адрес: Алтайский край, улица Северо-Западная, д 20.
              Зарегестрирована 15 июля 2015 года. Основной деятельностья компании является. Директор данной организации
              является Дроздов Федор Григорьевич. Основной вид деятельности «Техническая эксплуатация опасных
              производственных объектов»
            </p>
            <p>
              Организации присвоены: ИНН 2221221266, ОГРН 1152225011465, КПП 222101001, ОКПО 33976348. Уставной капитал
              составляет 10000 рублей.
            </p>
            <p>
              Преимуществами данной организации являются:
            </p>
            <ul>
              <li>— Долгое время работы, что говорит о стабильной деятельности и поднадзорности государственным
                органам;
              </li>
              <li>— Компания имеет несколько лицензии, что является признаком высокой надежности контрагента;</li>
              <li>— Не входят в реестр недобросовестных поставщиков;</li>
              <li>— Нет связей с дисквалифицированными лицами;</li>
              <li>— Нет массовых руководителей и учредителей;</li>
              <li>— На Фредресурсе не найдено ни одного сообщения о предстоящем банкроствстве компании;</li>
            </ul>
          </div>

          <div className="about-section">
            <h3 className="about-title">КОНТАКТНАЯ ИНФОРМАЦИЯ</h3>
            {addressData.map((item, index) => <p key={index}>{item}</p>)}
            <div className="contacts-map">
              <Map width="100%" height={400} defaultState={mapData}>
                <Placemark geometry={[53.3741746448565, 83.74993629840466]}/>
              </Map>
            </div>
          </div>

          <div className="about-section">
            <h3 className="about-title">Информация</h3>
            {imgData.map((item, index) => (
              <div className="about-photo-wrapper" key={index}>
                <img src={item.img} alt="photo"/>
                <p><span>Рисунок {index + 1}</span> – {item.text}</p>
              </div>
            ))}
          </div>
          {/*<div>телефон</div>*/}
          {/*<div>email</div>*/}
        </div>
      </div>
    </section>
  )
}

export default About
