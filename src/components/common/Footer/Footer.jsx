import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import s from './Footer.module.css'
import Modal from '../../UI/Modal/Modal'
import AddNewAdv from '../../ads/AddNewAdv/AddNewAdv'

export default function Footer() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.access);
    const [modalActive, setModalActive] = useState(false);

    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.footerImg} onClick={() => navigate('/')}>
                    <img src="../img/icon_01.png" alt="home" />
                </div>
                <div
                    className={s.footerImg}
                    onClick={() =>
                        user ? setModalActive(true) : navigate('/auth')
                    }
                >
                    <img src="../img/icon_02.png" alt="home" />
                </div>
                <Modal
                    active={modalActive}
                    setActive={setModalActive}
                    pointerEvents
                >
                    <AddNewAdv setActive={setModalActive} mobile />
                </Modal>
                <div
                    className={s.footerImg}
                    onClick={() =>
                        user ? navigate('/profile-personal') : navigate('/auth')
                    }
                >
                    <img src="../img/icon_03.png" alt="home" />
                </div>
            </div>
        </footer>
    );
}
