import { useLocation } from 'react-router-dom';
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from './nav/HomeNavigation';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const location = useLocation();

    return (
        <header className="bg-black py-4 shadow-sm">
            <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <Logo />
                    {/* Mostrar botón al costado del logo en móviles */}
                    <div className="md:hidden">
                        <ThemeToggle />
                    </div>
                </div>

                <nav className="w-full md:w-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
                    {/* Mostrar botón en navegación en pantallas grandes */}
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}
