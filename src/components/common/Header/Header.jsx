import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import s from './Header.module.css'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'
import AddNewAdv from '../../ads/AddNewAdv/AddNewAdv'

export default function Header() {
    const { access } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);

    return (
        <header className={s.header}>
            <nav className={s.nav}>
                {access && (
                    <>
                        <Button
                            classes="btnMain"
                            onClick={() => setModalActive(true)}
                        >
                            Разместить объявление
                        </Button>
                        <Modal
                            active={modalActive}
                            setActive={setModalActive}
                            pointerEvents
                        >
                            <AddNewAdv
                                modalActive={modalActive}
                                setActive={setModalActive}
                            />
                        </Modal>
                    </>
                )}
                <Button
                    classes="btnMain"
                    onClick={() =>
                        access
                            ? navigate('/profile')
                            : navigate('/auth')
                    }
                >
                    {access ? 'Личный кабинет' : 'Вход в личный кабинет'}
                </Button>
            </nav>
        </header>
    );
}
