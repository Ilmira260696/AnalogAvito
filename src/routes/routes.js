import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Main from '../pages/Main/Main';
import Auth from '../pages/Auth/Auth';
import Layout from '../pages/Layout/Layout';
import ProfilePersonal from '../pages/Profile/ProfilePersonal';
import ProfileSeller from '../pages/Profile/ProfileSeller';
import Article from '../pages/Article/Article';
import { NotFound } from '../pages/NotFound/NotFound';
export function AppRoutes({ user }) {
    return (
        <Routes>
            <Route path="/registration" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/article/:id" element={<Article />} />

                <Route element={<ProtectedRoute isAllowed={!!user} />}>
                    <Route
                        path="/profile"
                        element={<ProfilePersonal />}
                    />
                </Route>
                <Route path="/seller/:id" element={<ProfileSeller />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
