import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import s from './Main.module.css'
import Search from '../../components/common/Search/Search'
import Product from '../../components/common/Product/Product'


export default function Main() {
    const { adsAll, isLoading, error, filterAdsAll } = useSelector(
        (state) => state.ads,
    );
    const [searchText, setSearchText] = useState('');
    const [isMob, setIsMob] = useState(false);
    const [isClickAdd, setIsClickAdd] = useState(false);

    useEffect(() => {
        if (!searchText) {
            setIsClickAdd(false);
        }
    }, [searchText]);

    const handleArrayAds = () => {
        if (isMob && searchText) {
            return filterAdsAll;
        }
        if (isClickAdd && searchText) {
            return filterAdsAll;
        }

        return adsAll;
    };
    
    if (isLoading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Идёт загрузка...</h1>
    );

    return (
        <main className="main">
            <Search
                searchText={searchText}
                setSearchText={setSearchText}
                isMob={isMob}
                setIsMob={setIsMob}
                setIsClickAdd={setIsClickAdd}
            />
            <div className={s.mainContainer}>

    
                <h2 className={s.h2}>Объявления</h2>
                {(isMob && searchText && filterAdsAll.length === 0) ||
                (isClickAdd && searchText && filterAdsAll.length === 0) ? (
                    <h3 className={s.h3}>{` «${searchText}» не найдено`}</h3>
                ) : (
                    <Product
                        data={handleArrayAds()}
                        isLoading={isLoading}
                        error={error}
                    />
                )}
           

            </div>
        </main>
    
    );
}

