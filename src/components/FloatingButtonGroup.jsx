import { useTranslation } from 'react-i18next';

export default function FloatingButtonGroup({ onOpenGuide, onOpenVideo }) {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            <button
                onClick={toggleLang}
                className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-sm font-black tracking-wider border-2 border-white/20"
                title={t('langTitle')}
                aria-label="Toggle Language"
            >
                {i18n.language === 'en' ? 'ID' : 'EN'}
            </button>
            <button
                onClick={onOpenVideo}
                className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-red-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl border-2 border-white/20"
                title={t('videoTitle')}
                aria-label={t('videoAria')}
            >
                ▶
            </button>
            <button
                onClick={onOpenGuide}
                className="bg-indigo-500 hover:bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-indigo-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl font-bold border-2 border-white/20"
                title={t('helpTitle')}
                aria-label={t('helpAria')}
            >
                ?
            </button>
        </div>
    );
}