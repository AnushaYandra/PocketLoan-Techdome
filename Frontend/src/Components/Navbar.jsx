import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaChartBar, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [logoutBox, setLogoutBox] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUserDetails(userData);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openLogoutBox = () => {
        setLogoutBox(true);
        document.body.classList.add('no-scroll'); 
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserDetails(null);
        navigate('/login');
    };

    const closeLogoutBox = () => {
        setLogoutBox(false);
        document.body.classList.remove('no-scroll'); 
    };

    const navItems = [
        { path: "/", title: "Home" },
        { path: "/your-loan", title: "My Loans" },
        { path: "/about-us", title: "About us" },
        ...(userDetails && userDetails.role === 'admin' ? [{ path: "/admin", title: "Approval Dashboard" }] : []),
    ];

    return (
        <>
            <header className='bg-very-lightblue shadow-lg relative'>
                <nav className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-4 flex justify-between items-center'>
                    {/* Logo */}
                    <a href="/" className='flex items-center gap-3 text-2xl'>
                        <img src="/images/logo.png" className='h-10 w-10 shadow-md rounded-full' alt="Logo" />
                        <span className='font-extrabold text-dark-brown'>Pocket Loan</span>
                    </a>

                    {/* Nav Items for large screens */}
                    <ul className='hidden md:flex gap-8'>
                        {navItems.map(({ path, title }) => (
                            <li key={path} className='text-dark-brown font-semibold'>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => 
                                        isActive ? "bg-light-blue text-white px-5 py-2 rounded-lg font-bold shadow-lg transition-all duration-300 flex items-center" : "nav-link hover:text-dark-blue px-5 py-2 rounded-lg transition-all duration-300"
                                    }>
                                    {title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* SignUp and LogIn */}
                    <div className='text-base font-medium hidden lg:flex items-center gap-5'>
                        {userDetails ? (
                            <>
                                <h2 className='font-bold text-dark-brown text-lg'>
                                    Hey {userDetails.username}!
                                </h2>
                                <button onClick={openLogoutBox} className="py-1 px-5 rounded button shadow-md transition-all 
                                duration-300 hover:shadow-lg hover:bg-dark-brown hover:text-white">Log out</button>
                            </>
                        ) : (
                            <Link to="/login" className="py-1 px-5 rounded button shadow-md transition-all duration-300 
                            hover:shadow-lg hover:bg-dark-brown hover:text-white">Log in / Sign up</Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggler */}
                    <div className='md:hidden block'>
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? (
                                <FaXmark style={{ color: '#e49d23' }} className='w-6 h-6' />
                            ) : (
                                <FaChartBar style={{ color: '#e49d23' }} className='w-6 h-6' />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`px-4 py-6 bg-white shadow-lg ${isMenuOpen ? "block" : "hidden"}`}>
                    <ul className='flex flex-col gap-3'>
                        {navItems.map(({ path, title }) => (
                            <li key={path} className='text-dark-brown font-semibold'>
                                <NavLink to={path} className={({ isActive }) =>
                                    isActive ? "text-dark-brown font-bold" : "hover:shadow-lg hover:bg-light-blue hover:text-white px-5 py-2 rounded-lg transition-all duration-300"
                                }>
                                    {title}
                                </NavLink>
                            </li>
                        ))}
                        {userDetails ? (
                            <li onClick={openLogoutBox} className='py-2 hover:text-dark-brown text-base font-medium'>Log out</li>
                        ) : (
                            <>
                                <li className='py-2 hover:text-dark-brown text-base font-medium'><Link to="/login">Log in</Link></li>
                                <li className='py-2 hover:text-dark-brown text-base font-medium'><Link to="/signup">Sign up</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </header>

            {/* Logout confirmation box */}
            {logoutBox && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-5 rounded-xl shadow-lg'>
                        <p className='text-center'>Do you want to log out?</p>
                        <div className='flex justify-center gap-5 pt-4'>
                            <button onClick={handleLogout} className='button shadow-md px-4 py-1 rounded-md'>Yes</button>
                            <button onClick={closeLogoutBox} className='button shadow-md px-4 py-1 rounded-md'>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;

