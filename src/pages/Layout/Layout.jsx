import { Outlet } from 'react-router'
import s from './Layout.module.css'
import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'

export default function Layout() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}
