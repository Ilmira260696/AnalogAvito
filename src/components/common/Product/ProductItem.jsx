import { useNavigate } from 'react-router-dom';
import s from './Product.module.css';
import { formatDateTime } from '../../../utils/formatDate';

export default function ProductItem({ item }) {
    const navigate = useNavigate();

    return (
        <div
            className={s.cardsItem}
            onClick={() => navigate(`/article/${item?.id}`)}
        >
            <div className={s.cardsCard}>
                {item && (
                    <div className={s.cardImage}>
                        {item.images[0] ? (
                            <img
                                src={`http://localhost:8090/${item.images[0].url}`}
                                alt={item.title}
                            />
                        ) : (
                            <p className={s.noPhoto}>No photo</p>
                        )}
                    </div>
                )}

                <div className="card__content">
                    <h3 className={s.cardTitle}>{item && item.title}</h3>

                    <p className={s.cardPrice}>{item && `${item.price} ₽`}</p>
                    <p className={s.cardPlace}>{item && item.user.city}</p>
                    <p className={s.cardDate}>
                        {item && formatDateTime(item.created_on)}
                    </p>
                </div>
            </div>
        </div>
    );
}
