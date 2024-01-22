import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './UpdatePassword.module.css';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { useUpdatePasswordMutation } from '../../../serviceQuery/user';

export default function UpdatePassword({ modalActive, setModalActive }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [postPassword, { error, isLoading }] = useUpdatePasswordMutation();

    const updatePassword = async () => {
        try {
            await postPassword({
                password,
                newPassword,
            });

            if (error) {
                toast.error(error.message, { className: s.error });
                return;
            }
            if (!isLoading) {
                toast.success('Пароль обновлен!');
                setModalActive(false);
            }
        } catch (errorCurrent) {
            toast.error(errorCurrent.message, { className: s.error });
        }
    };

    return (
        <Modal active={modalActive} setActive={setModalActive} width="100%">
            <div className={s.block}>
                <Input
                    classes="input"
                    name="password"
                    type="password"
                    placeholder="Старый пароль"
                    autoComplete="true"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    classes="input"
                    name="newPassword"
                    type="password"
                    placeholder="Новый пароль"
                    autoComplete="true"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                    classes="btnPersonal"
                    isDisabled={!!(!password && !newPassword)}
                    onClick={() => updatePassword()}
                >
                    {isLoading ? 'Пароль обновляется...' : 'Обновить пароль'}
                </Button>
            </div>
        </Modal>
    );
}
