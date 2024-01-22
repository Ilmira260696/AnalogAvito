import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import s from './PersonalInfo.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { useUpdateUserMutation } from '../../../serviceQuery/user';
import UpdatePassword from '../UpdatePassword/UpdatePassword';

export default function PersonalInfo({ data }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [postDataUser, { isLoading: isLoadingUser }] =
        useUpdateUserMutation();
    const [modalActive, setModalActive] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('auth');
        window.location.href = '/';
    };
    useEffect(() => {
        if (data.name) {
            setName(data.name);
        }
        if (data.surname) {
            setSurname(data.surname);
        }
        if (data.email) {
            setEmail(data.email);
        }
        if (data.city) {
            setCity(data.city);
        }
        if (data.phone) {
            setPhone(data.phone);
        }
    }, [data]);

    const updateDataUser = async () => {
        try {
            await postDataUser({
                name,
                surname,
                email,
                city,
                phone,
            });
            if (!isLoadingUser) {
                toast.success('Данные изменены!');
            }
        } catch (error) {
            toast.error(error.message, { className: s.error });
        }
    };

    return (
        <form className={s.form} action="#">
            <div className={`${s.formDiv} ${name !== data?.name && s.active}`}>
                <label htmlFor="fname">Имя</label>

                <Input
                    classes="inputPersonal"
                    id="fname"
                    name="text"
                    type="text"
                    value={name}
                    placeholder=""
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div
                className={`${s.formDiv} ${
                    surname !== data?.surname && s.active
                }`}
            >
                <label htmlFor="lname">Фамилия</label>
                <Input
                    classes="inputPersonal"
                    id="lname"
                    name="text"
                    type="text"
                    value={surname}
                    placeholder=""
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <div
                className={`${s.formDiv} ${email !== data?.email && s.active}`}
            >
                <label htmlFor="email">E-mail</label>

                <Input
                    classes="inputPersonal"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder=""
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={`${s.formDiv} ${city !== data?.city && s.active}`}>
                <label htmlFor="city">Город</label>

                <Input
                    classes="inputPersonal"
                    name="city"
                    type="text"
                    value={city}
                    placeholder=""
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div
                className={`${s.formDiv} ${phone !== data?.phone && s.active}`}
            >
                <label htmlFor="phone">Телефон</label>

                <Input
                    classes="inputPhone"
                    name="phone"
                    type="tel"
                    value={phone}
                    placeholder={+79161234567}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <Button
                classes="btnPersonal"
                isDisabled={
                    !!(
                        name === data?.name &&
                        surname === data?.surname &&
                        email === data?.email &&
                        city === data?.city &&
                        phone === data?.phone
                    )
                }
                onClick={() => updateDataUser()}
            >
                {isLoadingUser ? 'Сохраняем...' : 'Сохранить'}
            </Button>
            <Button classes="btnPersonal" onClick={() => setModalActive(true)}>
                Изменить пароль
            </Button>
            <Button classes="btnPersonal" onClick={() => handleLogout()}>
                Выйти из аккаунта
            </Button>
            <UpdatePassword
                modalActive={modalActive}
                setModalActive={setModalActive}
            />
        </form>
    );
}
