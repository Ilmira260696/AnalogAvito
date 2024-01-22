import { useParams,  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import s from './Profile.module.css'
import Search from '../../components/common/Search/Search'
import ProfileContent from '../../components/profile/ProfileContent/ProfileContent'
import Product from '../../components/common/Product/Product'
import { setAdsSeller, setSellerInfo } from '../../store/slices/adv'


export default function ProfileSeller() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adsAll, adsSeller, sellerInfo, isLoading } = useSelector((state) => state.ads);

    useEffect(() => {
        if (id) {
            dispatch(setAdsSeller({ sellerID: id }));
            dispatch(setSellerInfo({ sellerID: id }));
        }
    }, [id, adsAll]);
    if (isLoading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Идёт загрузка...</h1>
    );
    return (
        <main>
            <div className={s.mainContainer}>
                <div className={s.centerBlock}>
                    <Search />
                    <div className={s.backBlock} onClick={() => navigate(-1)}>
                        
                        <h2 className={s.headingSeller}>Профиль продавца</h2>
                    </div>

                    <div className={s.mainProfile}>
                        <div className={s.profileSellContent}>
                            <div className={s.profileSeller}>
                                <ProfileContent
                                    page="seller"
                                    data={sellerInfo}
                                />
                            </div>
                        </div>
                    </div>

                    <h3 className={`${s.mainTitle} ${s.title}`}>
                        Товары продавца
                    </h3>
                </div>
                <Product data={adsSeller} isLoading={adsSeller.length === 0} />
            </div>
        </main>
    );
}