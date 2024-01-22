import './style.css';
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import { AppRoutes } from './routes/routes'
import { useGetAdsAllQuery } from './serviceQuery/adv'
import {
    setAdsAll,
    setIsLoading,
    setError,
    setSearchData,
} from './store/slices/adv'

function App() {
    const dispatch = useDispatch();
    const { access } = useSelector((state) => state.auth)
    const { data, isLoading, error } = useGetAdsAllQuery()

    useEffect(() => {
        dispatch(setIsLoading(isLoading))
        dispatch(setError(error))

        if (data) {
            dispatch(setAdsAll({ data }))
            dispatch(setSearchData())
        }
    }, [data, isLoading, error])

    return (
        <BrowserRouter>
            <AppRoutes user={access} />
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar
                limit={1}
            />
        </BrowserRouter>
    );
}

export default App;
