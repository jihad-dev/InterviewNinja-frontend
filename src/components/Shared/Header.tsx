

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { logout } from '../../Redux/features/auth/authSlice';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-700">
              👉InterviewNinja
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/categories" className="text-gray-700 hover:text-indigo-600 font-medium">Categories</Link>
            <Link to="/resources" className="text-gray-700 hover:text-indigo-600 font-medium">Resources</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>
            {user && (
              <Link to="/favorites" className="text-gray-700 hover:text-indigo-600 font-medium">Favorites</Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
                </button>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to='/profile'
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                      >
                        Your Profile
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to='/dashboard/admin-home'
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to='/favorites'
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                      >
                        Favorites
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logout());
                          setIsOpen(false);
                          navigate('/login')
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-indigo-600 font-medium">Register</Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-4 py-2 space-y-1 flex flex-col">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Categories</Link>
            <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Resources</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Contact</Link>
            {user && <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Favorites</Link>}

            {user ? (
              <>

              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Login</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;