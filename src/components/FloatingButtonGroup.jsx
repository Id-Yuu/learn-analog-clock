import { useTranslation } from 'react-i18next';

export default function FloatingButtonGroup({ onOpenGuide, onOpenVideo }) {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            {/* Language toggle */}
            <button
                onClick={toggleLang}
                className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-sm font-black tracking-wider border-2 border-white/20"
                title={t('langTitle')}
                aria-label="Toggle Language"
            >
                {i18n.language === 'en' ? 'ID' : 'EN'}
            </button>

            {/* Video button */}
            <button
                onClick={onOpenVideo}
                className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-red-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl border-2 border-white/20"
                title={t('videoTitle')}
                aria-label={t('videoAria')}
            >
                ▶
            </button>

            {/* Guide/help button */}
            <button
                onClick={onOpenGuide}
                className="bg-indigo-500 hover:bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-indigo-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl font-bold border-2 border-white/20"
                title={t('helpTitle')}
                aria-label={t('helpAria')}
            >
                ?
            </button>

            {/* GitHub star button */}
            <a
                href="https://github.com/Id-Yuu/learn-analog-clock"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white/20"
                title="Star on GitHub"
                aria-label="Star on GitHub"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.787 8.207 11.387.6.111.793-.261.793-.58 
                        0-.287-.01-1.048-.016-2.055-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 
                        1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.931 
                        0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 
                        2.044.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.119 3.176.77.84 1.236 1.911 1.236 3.221 
                        0 4.61-2.805 5.624-5.476 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.192.697.8.578C20.565 
                        22.283 24 17.789 24 12.5 24 5.87 18.627.5 12 .5z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
        </div>
    );
}
