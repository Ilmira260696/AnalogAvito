import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import IconClose from '../../UI/IconClose/IconClose';
import Button from '../../UI/Button/Button';
import { useCreateCommentMutation } from '../../../serviceQuery/adv';
import { formatDateTime } from '../../../utils/formatDate';
import s from './Reviewes.module.css';

export default function Reviewes({ setActive, comments, articleID }) {
    const navigate = useNavigate();
    const { ID, access } = useSelector((state) => state.auth);
    const [postComment] = useCreateCommentMutation();
    const [textComment, setTextComment] = useState('');

    const handleCloseClick = () => {
        setTextComment('');
        setActive(false);
    };

    const createComment = async () => {
        try {
            await postComment({ text: textComment, id: articleID });
            setTextComment('');
        } catch (currentError) {
            toast.error(currentError.message, { className: s.error });
        }
    };

    return (
        <div className={s.formComments}>
            <div className={s.block}>
                <h2 className={s.title}>Отзывы о товаре</h2>
                <IconClose onClick={handleCloseClick} />
            </div>
            {access ? (
                <div className={s.addCommentAuth}>
                    <h3 className={s.tileComment}>Добавить отзыв</h3>
                    <textarea
                        className={s.textarea}
                        type="text"
                        name="text"
                        cols="auto"
                        rows="5"
                        value={textComment}
                        placeholder="Введите отзыв"
                        onChange={(e) => setTextComment(e.target.value)}
                    />
                    <Button
                        classes="addComment"
                        isDisabled={!textComment}
                        onClick={() => createComment()}
                    >
                        Опубликовать
                    </Button>
                </div>
            ) : (
                <div className={s.addComment}>
                    <h3 className={s.titleComment}>
                        Отзыв может оставить только авторизованный пользователь.
                    </h3>
                    <Button classes="auth" onClick={() => navigate('/auth')}>
                        Авторизоваться
                    </Button>
                </div>
            )}
            <ul className={comments?.length > 0 ? s.ul : s.ulNoComment}>
                {comments?.length > 0 ? (
                    comments.map((comment) => (
                        <li className={s.listComments} key={comment.id}>
                            <div className={s.avatar}>
                                <Link
                                    to={
                                        ID === comment.author.id
                                            ? '/profile'
                                            : `/seller/${comment.author.id}`
                                    }
                                >
                                    {comment.author.avatar && (
                                        <img
                                            src={`http://localhost:8090/${comment.author.avatar}`}
                                            alt="avatar"
                                        />
                                    )}
                                </Link>
                            </div>
                            <div className={s.authorInfo}>
                                <div className={s.authorItem}>
                                    {' '}
                                    <Link
                                        to={
                                            ID === comment.author.id
                                                ? '/profile'
                                                : `/seller/${comment.author.id}`
                                        }
                                    >
                                        <p className={s.name}>
                                            {comment.author.name}
                                            <span>
                                                {formatDateTime(
                                                    comment.created_on,
                                                )}
                                            </span>
                                        </p>
                                    </Link>
                                    <Button classes="auth">Ответить</Button>
                                </div>

                                <div>
                                    <h4 className={s.titleComment}>
                                        Комментарий
                                    </h4>
                                    <p className={s.textComment}>
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className={s.noComment}>
                        <h2 className={s.noCommentText}>Отзывов пока нет</h2>
                    </li>
                )}
            </ul>
        </div>
    );
}
