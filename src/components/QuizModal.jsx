import { useTranslation } from 'react-i18next';
import QuizPanel from './QuizPanel';

export default function QuizModal({ isOpen, onClose }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 max-w-5xl w-full max-h-[92vh] rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 pl-2">{t('quizTitle')}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 font-bold rounded-lg transition-colors"
            title={t('quizClose')}
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-2 md:p-4">
          <QuizPanel />
        </div>
      </div>
    </div>
  );
}
