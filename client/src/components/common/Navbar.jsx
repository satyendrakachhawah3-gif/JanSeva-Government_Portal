import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Sparkles,
  Search,
  CheckCircle2,
  FileText,
  MapPin,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  CheckSquare,
  Building2
} from 'lucide-react';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gov-navy to-gov-deep flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-gov-navy tracking-tight font-sans">
                  JanSeva <span className="text-orange-600">AI</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200">
                  Gov Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Digital Public Scheme Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/') ? 'bg-slate-100 text-gov-navy font-semibold' : 'text-slate-600 hover:text-gov-navy hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/schemes"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/schemes') ? 'bg-slate-100 text-gov-navy font-semibold' : 'text-slate-600 hover:text-gov-navy hover:bg-slate-50'
              }`}
            >
              Government Schemes
            </Link>

            <Link
              to="/recommendations"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                isActive('/recommendations') ? 'bg-orange-100 text-orange-800' : 'text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              Find Schemes For Me
            </Link>

            <Link
              to="/eligibility-checker"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/eligibility-checker') ? 'bg-slate-100 text-gov-navy font-semibold' : 'text-slate-600 hover:text-gov-navy hover:bg-slate-50'
              }`}
            >
              Eligibility Checker
            </Link>

            <Link
              to="/service-locator"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/service-locator') ? 'bg-slate-100 text-gov-navy font-semibold' : 'text-slate-600 hover:text-gov-navy hover:bg-slate-50'
              }`}
            >
              Service Centers
            </Link>

            <Link
              to="/grievances"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/grievances') ? 'bg-slate-100 text-gov-navy font-semibold' : 'text-slate-600 hover:text-gov-navy hover:bg-slate-50'
              }`}
            >
              Grievances
            </Link>
          </nav>

          {/* Right Action Icons & Role Menu */}
          <div className="flex items-center gap-3">
            
            {/* Notification Bell */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-gov-navy hover:bg-slate-100 relative transition"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-gov-navy" />
                        <h4 className="font-semibold text-slate-800 text-sm">Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-orange-600 hover:underline font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-sm">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            onClick={() => {
                              markAsRead(n._id);
                              if (n.link) navigate(n.link);
                              setIsNotifOpen(false);
                            }}
                            className={`p-3.5 hover:bg-slate-50 cursor-pointer transition ${
                              !n.isRead ? 'bg-orange-50/40 border-l-4 border-orange-500' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <p className="font-semibold text-xs text-slate-800">{n.title}</p>
                              <span className="text-[10px] text-slate-400">
                                {new Date(n.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons or User Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-gov-navy text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight line-clamp-1">{user.name}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                      role === 'OFFICER' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-slate-100 mb-1">
                      <p className="font-semibold text-xs text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    {role === 'CITIZEN' && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gov-navy" />
                          Citizen Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        >
                          <User className="w-4 h-4 text-slate-500" />
                          Demographic Profile
                        </Link>
                      </>
                    )}

                    {role === 'OFFICER' && (
                      <Link
                        to="/officer-portal"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                        Officer Verification Queue
                      </Link>
                    )}

                    {role === 'ADMIN' && (
                      <Link
                        to="/admin-portal"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        <Building2 className="w-4 h-4 text-purple-600" />
                        Admin Scheme Portal
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition mt-1"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-bold text-gov-navy hover:bg-slate-100 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-gov-navy hover:bg-gov-deep rounded-xl shadow-md transition"
                >
                  Citizen Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/schemes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Government Schemes
            </Link>
            <Link
              to="/recommendations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg"
            >
              Find Schemes For Me
            </Link>
            <Link
              to="/eligibility-checker"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Eligibility Checker
            </Link>
            <Link
              to="/service-locator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Service Centers
            </Link>
            <Link
              to="/grievances"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Grievance Portal
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
