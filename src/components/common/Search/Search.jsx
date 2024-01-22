import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import s from './Search.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import { setFilterAdsAll } from '../../../store/slices/adv'

export default function Search({
    searchText,
    setSearchText,
    isMob,
    setIsMob,
    setIsClickAdd,
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchData } = useSelector((state) => state.ads);

    useEffect(() => {
        if (isMob && searchText) {
            dispatch(setFilterAdsAll(searchText));
        }
    }, [searchText, isMob]);

    const getSearchData = () => {
        const data = searchData.map((item) => (
            <option key={Math.random()} value={item} />
        ));
        return data;
    };

    return (
        <div className={s.mainSearch}>
            <Link to="/">
                <img
                    className={s.searchLogo}
                    src="../img/logo.png"
                    alt="logo"
                />

                <img
                    className={s.searchLogoMob}
                    src="../img/logo-mob.png"
                    alt="logo"
                />
            </Link>

            <form className={s.searchForm}>
                {location.pathname === '/' ? (
                    <>
                        <Input
                            classes="searchText"
                            type="search"
                            placeholder="Поиск по объявлениям"
                            name="search"
                            list="ads"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setIsMob(false);
                            }}
                        />
                        <Input
                            classes="searchTextMob"
                            type="search"
                            placeholder="Поиск"
                            name="search-mob"
                            list="ads"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setIsMob(true);
                            }}
                        />
                        {searchText && (
                            <datalist id="ads">{getSearchData()}</datalist>
                        )}
                        <Button
                            classes="searchBtn"
                            onClick={() => {
                                dispatch(setFilterAdsAll(searchText));
                                setIsClickAdd(true);
                            }}
                        >
                            Найти
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            classes="searchMainBtn"
                            onClick={() => navigate('/')}
                        >
                            Вернуться на главную
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
}
