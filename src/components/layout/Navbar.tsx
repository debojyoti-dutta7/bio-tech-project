import { Link } from 'react-router-dom';
import { Bell, Menu, Sun, Moon, Home } from 'lucide-react';
import { getProfile } from '../../utils/storage';

interface NavbarProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ onMenuClick, darkMode, onToggleTheme }: NavbarProps) {
  const profile = getProfile();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border">
      <button
        onClick={onMenuClick}
        className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl hover:bg-background text-muted"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">
        <h2 className="text-sm font-medium text-muted">
          Welcome back{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl hover:bg-background text-muted hover:text-text transition-colors text-sm font-medium"
          aria-label="Back to website"
        >
          <Home className="h-4 w-4" />
          <span className="hidden md:inline">Website</span>
        </Link>

        <button
          onClick={onToggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-background text-muted transition-colors"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl hover:bg-background text-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-2.5 ml-1 pl-3 border-l border-border">
          <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
            {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text leading-tight">
              {profile?.name || 'Guest User'}
            </p>
            <p className="text-xs text-muted">Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}
