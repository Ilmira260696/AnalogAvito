import s from './ProfileContent.module.css'
import Avatar from '../Avatar/Avatar'
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import SellerInfo from '../SellerInfo/SellerInfo'

export default function ProfileContent({ page, data, isLoading }) {
    return (
        <>
            <Avatar page={page} data={data} />
            <div
                className={
                    page === 'personal' ? s.personalRight : s.sellerRight
                }
            >
                {page === 'personal' ? (
                    <PersonalInfo data={data && data} isLoading={isLoading} />
                ) : (
                    <SellerInfo data={data} />
                )}
            </div>
        </>
    );
}
