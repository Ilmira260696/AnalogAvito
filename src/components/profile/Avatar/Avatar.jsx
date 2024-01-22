import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Avatar.module.css';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import { useUploadAvatarMutation } from '../../../serviceQuery/user';

export default function Avatar({ page, data }) {
    const [modalActive, setModalActive] = useState(false);
    const [setAvatar, { isLoading }] = useUploadAvatarMutation();

    const handleAvatarUpload = async (file) => {
        try {
            await setAvatar({ file });

            if (!isLoading) {
                toast.success('Аватар изменен!');
            }
        } catch (error) {
            toast.error(error.message, { className: s.error });
        }
    };

    const getAvatar = () => {
        if (data.avatar) {
            return (
                <img
                    onClick={() => setModalActive(true)}
                    src={`http://localhost:8090/${data.avatar}`}
                    alt="avatar"
                />
            );
        }
        return <p className={s.noPhoto}>No photo</p>;
    };

    return (
        <div className={page === 'personal' ? s.personalLeft : s.sellerLeft}>
            <div className={s.imgBlock}>
                {data.name || data.email ? getAvatar() : isLoading}
            </div>

            {page === 'personal' && (
                <label className={s.replacePhoto} htmlFor="avatarUser">
                    {isLoading ? 'Загрузка...' : 'Заменить'}
                    <Input
                        id="avatarUser"
                        type="file"
                        accept="image/*, .png, .jpg, .gif, .web, .jpeg"
                        onChange={(e) => handleAvatarUpload(e.target.files[0])}
                    />
                </label>
            )}

            <Modal active={modalActive} setActive={setModalActive}>
                <div className={s.imgModal}>
                    <img
                        src={`http://localhost:8090/${data.avatar}`}
                        alt="avatar"
                    />
                </div>
            </Modal>
        </div>
    );
}
