export default function ThemeToggle({ isDarkMode, toggleTheme }) {
    return (
        <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Light
            </span>
            
            <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    isDarkMode ? 'bg-indigo-500' : 'bg-slate-300'
                }`}
                aria-label="Toggle Dark Mode"
            >
                {/* The sliding circle */}
                <span
                    className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-transform duration-300 shadow-sm ${
                        isDarkMode ? 'translate-x-9' : 'translate-x-1'
                    }`}
                >
                    <span className="text-xs">{isDarkMode ? '🌙' : '☀️'}</span>
                </span>
            </button>

            <span className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-indigo-300' : 'text-slate-400'}`}>
                Dark
            </span>
        </div>
    );
}