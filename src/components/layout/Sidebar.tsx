import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  Utensils,
  MessageCircle,
  User,
  BookOpen,
  X,
  Home,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../ui/Logo';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/health', icon: Activity, label: 'Health Analysis' },
  { to: '/dashboard/diet', icon: Utensils, label: 'Diet Plans' },
  { to: '/dashboard/chat', icon: MessageCircle, label: 'AI Chat' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
  { to: '/dashboard/project', icon: BookOpen, label: 'Project Info' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-border">
          <Link to="/" className="group">
            <Logo className="h-8 group-hover:scale-105 transition-transform" wordmarkClassName="text-sm" />
          </Link>
          <button onClick={onClose} className="lg:hidden text-muted hover:text-text">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted/60">Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/12 to-secondary/8 text-primary'
                    : 'text-muted hover:text-text hover:bg-background'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full gradient-primary"
                    />
                  )}
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-3">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-text hover:bg-background transition-all"
          >
            <Home className="h-5 w-5" />
            Back to Website
          </Link>
          <div className="rounded-xl bg-gradient-to-br from-primary/8 to-accent/5 border border-primary/10 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-semibold text-text">AI Health Assistant</p>
            </div>
            <p className="text-xs text-muted">Intelligent nutrition guidance</p>
          </div>
        </div>
      </aside>
    </>
  );
}
