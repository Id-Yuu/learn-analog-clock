import { useTranslation } from 'react-i18next';

export default function GuideModal({ isOpen, onClose }) {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all border border-slate-100 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">{t('guideWelcome')}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">{t('guideSubtitle')}</p>
                
                <ul className="space-y-5 text-slate-700 dark:text-slate-300 mb-8">
                    <li className="flex gap-4 items-start">
                        <span className="text-2xl bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-xl">👆</span>
                        <div>
                            <strong className="block text-slate-800 dark:text-slate-100">{t('guideStep1Title')}</strong>
                            <span className="text-sm">{t('guideStep1Desc')}</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-2xl bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-xl">⚙️</span>
                        <div>
                            <strong className="block text-slate-800 dark:text-slate-100">{t('guideStep2Title')}</strong>
                            <span className="text-sm">{t('guideStep2Desc')}</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-2xl bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-xl">🎯</span>
                        <div>
                            <strong className="block text-slate-800 dark:text-slate-100">{t('guideStep3Title')}</strong>
                            <span className="text-sm">{t('guideStep3Desc')}</span>
                        </div>
                    </li>
                </ul>
                <button onClick={onClose} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                    {t('guideButton')}
                </button>
            </div>
        </div>
    );
}