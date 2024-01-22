import { useState, useEffect } from 'react'
import s from './ArticleImage.module.css'
import Modal from '../../UI/Modal/Modal'

export default function ArticleImage({ data}) {
    const host = 'http://localhost:8090/';
    const [imageMain, setImageMain] = useState('');
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (data?.images[0]) {
            setImageMain(`${host}${data?.images[0]?.url}`);
        }
    }, [data]);

    return (
        <div
            className={`${s.articleFillImg} ${
                (!data?.images[0] || !data?.images) && s.background
            }`}
        >
            {data && 
                <div className={s.articleImg}>
                    {data.images[0] ? (
                        <img
                            src={imageMain}
                            alt={data.title}
                            onClick={() => setModalActive(true)}
                        />
                    ) : (
                        <p className={s.noPhoto}>No photo</p>
                    )}
                </div>
             }
            <Modal active={modalActive} setActive={setModalActive}>
                <img className={s.img} src={imageMain} alt={data?.title} />
            </Modal>
            <ul className={s.imgBar}>
                {data
                    ? data.images?.length > 1 &&
                      data.images.map((image) => (
                          <li
                              className={`${s.imgBarDiv} ${
                                  imageMain === `${host}${image.url}` &&
                                  s.active
                              }`}
                              key={image.id}
                              onClick={() =>
                                  setImageMain(`${host}${image.url}`)
                              }
                          >
                              <img
                                  src={`${host}${image.url}`}
                                  alt={data.title}
                              />
                          </li>
                      ))
                    : Array(5)
                          .fill()
                          .map(() => (
                              <li className={s.imgBarDiv} key={Math.random()}>
                              </li>
                          ))}
            </ul>
            <div className={s.imgBarMob}>
                {data?.images?.length > 1 &&
                    data.images.map((image) => (
                        <div
                            key={Math.random()}
                            className={`${s.imgBarMobCircle} ${
                                imageMain === `${host}${image.url}` && s.active
                            }`}
                            onClick={() => setImageMain(`${host}${image.url}`)}
                        />
                    ))}
            </div>
        </div>
    );
}
