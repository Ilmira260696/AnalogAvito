import { useParams } from 'react-router-dom';
import s from './Article.module.css';
import Search from '../../components/common/Search/Search';
import ArticleImage from '../../components/ads/ArticleImage/ArticleImage';
import ArticleInfo from '../../components/ads/ArticleInfo/ArticleInfo';
import { useGetAdvQuery, useGetCommentsAdvQuery } from '../../serviceQuery/adv';

export default function Article({ isLoading }) {
    const { id } = useParams();
    const { data } = useGetAdvQuery(id);
    const { data: comments } = useGetCommentsAdvQuery(id);
    if (isLoading)
        return (
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
                Идёт загрузка...
            </h1>
        );
    return (
        <main className={s.main}>
            <Search />
            <div className={s.mainArtic}>
                <div className={s.articContent}>
                    <div className={s.articleLeft}>
                        <ArticleImage data={data} />
                    </div>
                    <div className={s.articleRight}>
                        <ArticleInfo
                            data={data}
                            comments={comments}
                            articleID={id}
                        />
                    </div>
                </div>
            </div>
            <div className={s.mainContainer}>
                <h3 className={s.mainTitle}>Описание товара</h3>
                <div className={s.mainContent}>
                    <p className={s.mainText}>{data && data.description}</p>
                </div>
            </div>
        </main>
    );
}
