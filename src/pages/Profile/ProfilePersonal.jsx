import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Profile.module.css';
import Search from '../../components/common/Search/Search';
import ProfileContent from '../../components/profile/ProfileContent/ProfileContent';
import Product from '../../components/common/Product/Product';
import { useGetUserQuery } from '../../serviceQuery/user';
import { setAuth } from '../../store/slices/AuthorizationSlice';
import { useGetAdsUserQuery } from '../../serviceQuery/adv';

export default function ProfilePersonal() {
    const dispatch = useDispatch();
    const { data: adsUser, isLoading, error } = useGetAdsUserQuery();
    const { data, isLoading: isLoadingUser } = useGetUserQuery();
    const user = useSelector((state) => state?.auth);
    const adsUserSort =
        adsUser?.length > 0 &&
        [...adsUser].sort((a, b) => {
            const dateA = new Date(a.created_on);
            const dateB = new Date(b.created_on);

            return dateB - dateA;
        });

    useEffect(() => {
        if (data) {
            dispatch(
                setAuth({
                    ...user,
                    ID: data.id,
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    city: data.city,
                    phone: data.phone,
                    avatar: data.avatar,
                    role: data.role,
                }),
            );
        }
    }, [data]);
    if (isLoading)
        return (
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
                Идёт загрузка...
            </h1>
        );

    return (
        <main>
            <div className={s.mainContainer}>
                <div className={s.centerBlock}>
                    <Search />

                    <h2 className={s.heading}>
                        Здравствуйте,{' '}
                        {!isLoadingUser
                            ? `${user?.name || user?.email}!`
                            : isLoading}
                    </h2>
                    <div className={s.mainProfile}>
                        <div className={s.profileContent}>
                            <h3 className={s.profileTitle}>
                                Настройки профиля
                            </h3>
                            <div className={s.profilePersonal}>
                                <ProfileContent
                                    isLoading={isLoading}
                                    page="personal"
                                    data={user && user}
                                />
                            </div>
                        </div>
                    </div>

                    <h3 className={s.mainTitle}>Мои товары</h3>
                </div>
                <Product
                    data={adsUserSort}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </main>
    );
}
