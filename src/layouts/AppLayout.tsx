import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";
import ThemeToggle from "../components/ThemeToggle";

export default function AppLayout() {
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
    })
    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to={'/auth/login'} />
    //if(data) return <DevTree data={data} />
    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {data && <DevTree data={data} />}
        </div>
    );
}