import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SecondDial from './components/SecondDial';
import MinuteDial from './components/MinuteDial';
import HourDial from './components/HourDial';
import FullClockDial from './components/FullClockDial';
import DigitalClock from './components/DigitalClock';
import ThemeToggle from './components/ThemeToggle';
import GuideModal from './components/GuideModal';
import FloatingButtonGroup from './components/FloatingButtonGroup';
import VideoModal from './components/VideoModal';
import QuizModal from './components/QuizModal';

function getCurrentTotalSeconds() {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

export default function App() {
  const { t } = useTranslation();
  const [time, setTime] = useState(() => getCurrentTotalSeconds());
  const [activeDrag, setActiveDrag] = useState(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [targetTime, setTargetTime] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(() => !localStorage.getItem('timeClock_hasSeenGuide'));
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const resetToCurrent = () => {
    setTime(getCurrentTotalSeconds());
    setIsAutoPlayEnabled(true);
  };

  const handleActiveDragChange = (draggingPart) => {
    setActiveDrag(draggingPart);
    if (draggingPart) {
      setIsAutoPlayEnabled(false);
    }
  };

  useEffect(() => {
    if (!isAutoPlayEnabled) return;

    const timerId = setInterval(() => {
      setTime((prevTime) => (prevTime + 1) % 86400);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isAutoPlayEnabled]);

  const closeGuide = () => {
    setIsGuideOpen(false);
    localStorage.setItem('timeClock_hasSeenGuide', 'true');
  };

  const generatePractice = () => {
    const h = Math.floor(Math.random() * 12) + 1;
    const m = Math.floor(Math.random() * 12) * 5;
    setTargetTime(h * 3600 + m * 60);
  };

  const togglePractice = () => {
    if (!practiceMode) generatePractice();
    setPracticeMode(!practiceMode);
  };

  const formatPracticeLabel = (totalSecs) => {
    let h = Math.floor(totalSecs / 3600) % 12;
    if (h === 0) h = 12;
    const m = Math.floor((totalSecs % 3600) / 60);
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  const isSuccess =
    practiceMode &&
    targetTime !== null &&
    Math.floor(time / 60) % 720 === Math.floor(targetTime / 60) % 720;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative">
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-6 gap-4 mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
            {t('appTitle')}
          </h1>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
        </div>

        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-8 transition-colors text-center">
          {activeDrag ? (
            <span className="text-indigo-600 dark:text-indigo-400">
              {t('dragging', { hand: t(activeDrag === 'seconds' ? 'second' : activeDrag) })}
            </span>
          ) : (
            t('hoverDrag')
          )}
        </p>

        <div className="mb-12 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300 min-h-[72px] gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={togglePractice}
              className="px-6 py-2 rounded-xl font-bold text-white transition-colors w-full md:w-auto bg-indigo-500 hover:bg-indigo-600"
            >
              {practiceMode ? t('endPractice') : t('startPractice')}
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-6 py-2 rounded-xl font-bold text-white transition-colors w-full md:w-auto bg-emerald-500 hover:bg-emerald-600"
            >
              {t('openQuiz')}
            </button>
          </div>

          {practiceMode && targetTime !== null && (
            <div className="flex items-center gap-4 mt-2 md:mt-0 px-1 md:px-4">
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {t('setClockTo')}
                <strong className="ml-2 text-2xl text-slate-800 dark:text-white">{formatPracticeLabel(targetTime)}</strong>
              </span>
              {isSuccess ? (
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold px-4 py-1 rounded-lg">
                  {t('correct')}
                </span>
              ) : (
                <button
                  onClick={generatePractice}
                  className="text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-3 py-1 rounded-lg text-slate-600 dark:text-slate-300 font-semibold transition-colors"
                >
                  {t('skip')}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16 items-center justify-items-center w-full max-w-4xl">
          <SecondDial
            isDarkMode={isDarkMode}
            totalSeconds={time}
            setTotalSeconds={setTime}
            activeDrag={activeDrag}
            setActiveDrag={handleActiveDragChange}
          />
          <MinuteDial
            isDarkMode={isDarkMode}
            totalSeconds={time}
            setTotalSeconds={setTime}
            activeDrag={activeDrag}
            setActiveDrag={handleActiveDragChange}
          />
          <HourDial
            isDarkMode={isDarkMode}
            totalSeconds={time}
            setTotalSeconds={setTime}
            activeDrag={activeDrag}
            setActiveDrag={handleActiveDragChange}
          />
        </div>

        <div className="relative w-full max-w-4xl border border-slate-300 dark:border-slate-600 rounded-xl p-8 pt-12 mb-12 bg-transparent">
          <span className="absolute -top-3 left-6 bg-slate-50 dark:bg-slate-900 px-3 text-sm font-semibold text-slate-500 dark:text-slate-400 transition-colors">
            {t('output')}
          </span>

          <div className="flex flex-col md:flex-row items-center justify-around gap-12">
            <div className="flex flex-col items-center">
              <FullClockDial time={time} isDarkMode={isDarkMode} />
              <h3 className="mt-5 text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors">{t('clock')}</h3>
            </div>

            <div className="flex flex-col items-center">
              <DigitalClock time={time} />
              <h3 className="mt-5 text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors">{t('clock')}</h3>
            </div>
          </div>
        </div>

        <button
          onClick={resetToCurrent}
          className="px-8 py-4 bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          {t('reset')}
        </button>

        <FloatingButtonGroup onOpenGuide={() => setIsGuideOpen(true)} onOpenVideo={() => setIsVideoOpen(true)} />
        <GuideModal isOpen={isGuideOpen} onClose={closeGuide} />
        <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </div>
    </div>
  );
}