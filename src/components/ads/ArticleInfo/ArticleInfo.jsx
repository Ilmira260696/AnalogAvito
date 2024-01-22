import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import s from './ArticleInfo.module.css';
import Button from '../../UI/Button/Button';
import getReviews from '../../../utils/getReviews';
import showPhone from '../../../utils/showPhone';
import Modal from '../../UI/Modal/Modal';
import CommentsModal from '../Reviewes/Reviewes';
import { useDeleteAdvMutation } from '../../../serviceQuery/adv';
import AdvSettings from '../AdvSettings/AdvSettings';
import {
    formatDateTime,
    formatDateSellsProduct,
} from '../../../utils/formatDate';

export default function ArticleInfo({ data, comments, articleID }) {
    const navigate = useNavigate();
    const { ID } = useSelector((state) => state.auth);
    const [isShowPhone, setIsShowPhone] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [modalSettingsActive, setModalSettingsActive] = useState(false);
    const [deleteTextAdv, { error: errorDeleteAdvText }] =
        useDeleteAdvMutation();
    const isTablet = window.matchMedia('(max-width: 920px)').matches;

    const deleteAdv = async () => {
        try {
            await deleteTextAdv({ id: articleID });

            if (errorDeleteAdvText) {
                toast.error(errorDeleteAdvText.error, { className: s.error });
            } else {
                toast.success('Объявление снято с публикации!');
                navigate('/profile');
            }
        } catch (error) {
            toast.error(error.message, { className: s.error });
        }
    };

    const getAvatar = () => {
        if (data.user.avatar) {
            return (
                <img
                    src={`http://localhost:8090/${data.user.avatar}`}
                    alt="avatar"
                />
            );
        }
        return <p className={s.noPhoto}>No photo</p>;
    };

    return (
        <div className={s.articleBlock}>
            <h3 className={s.articleTitle}>{data?.title}</h3>
            <div className={s.articleInfo}>
                <p className={s.articleDate}>
                    {data && formatDateTime(data.created_on)}
                </p>
                <p className={s.articleCity}>{data && data.user.city}</p>

                <Button
                    classes="btnComments"
                    onClick={() => setModalActive(true)}
                >
                    {comments && getReviews(comments)}
                </Button>
                <Modal
                    active={modalActive}
                    setActive={setModalActive}
                    width={isTablet ? '600px' : '900px'}
                    pointerEvents
                >
                    <CommentsModal
                        setActive={setModalActive}
                        comments={comments}
                        articleID={articleID}
                    />
                </Modal>
            </div>
            <p className={s.articlePrice}>{data && `${data.price} ₽`}</p>
            <div className={s.btnBlock}>
                {data &&
                    (ID === data?.user.id ? (
                        <>
                            <Button
                                classes="articleBtn"
                                onClick={() => setModalSettingsActive(true)}
                            >
                                Редактировать
                            </Button>
                            <Modal
                                active={modalSettingsActive}
                                setActive={setModalSettingsActive}
                                pointerEvents
                            >
                                <AdvSettings
                                    setActive={setModalSettingsActive}
                                    data={data}
                                    articleID={articleID}
                                />
                            </Modal>
                            <Button
                                classes="btnRemove"
                                onClick={() => deleteAdv()}
                            >
                                Снять с публикации
                            </Button>
                        </>
                    ) : (
                        <Button
                            classes="btnSeller"
                            onClick={() => setIsShowPhone(true)}
                        >
                            {!isShowPhone && 'Показать телефон'}
                            <span className={s.span}>
                                {showPhone({ isShowPhone, data: data.user })}
                            </span>
                        </Button>
                    ))}
            </div>
            <Link
                to={
                    ID === data?.user.id
                        ? '/profile'
                        : `/seller/${data?.user.id}`
                }
            >
                <div className={s.articleAuthor}>
                    <div className={s.authorImg}>{data && getAvatar()}</div>
                    <div className={s.authorCont}>
                        <p className={s.authorName}>{data && data.user.name}</p>

                        <p className={s.authorAbout}>
                            {data &&
                                formatDateSellsProduct(data.user.sells_from)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
