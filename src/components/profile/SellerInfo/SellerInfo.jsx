import { useState } from 'react'
import s from './SellerInfo.module.css'
import Button from '../../UI/Button/Button'
import showPhone from '../../../utils/showPhone'


export default function SellerInfo({ data }) {
    const [isShowPhone, setIsShowPhone] = useState(false);

    return (
      <>
            <h3 className={s.title}>
                { data.name  }
            </h3>
            <p className={s.city}>
                { data.city }
            </p>
            <p className={s.info}>
                Продает товары с{' '}
                {
                    data?.sells_from
                }
            </p>

            <Button classes="btnSeller" onClick={() => setIsShowPhone(true)}>
                {!isShowPhone  && 'Показать телефон'}
                <span className={s.span}>
                    {showPhone({ isShowPhone, data })}
                </span>
            </Button>
            </>
    );
}
