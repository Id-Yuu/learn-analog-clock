import { useState, useEffect } from 'react';
import SecondDial from './components/SecondDial';
import MinuteDial from './components/MinuteDial';
import HourDial from './components/HourDial';
import DigitalClock from './components/DigitalClock';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
    const [time, setTime] = useState(0);
    const [activeDrag, setActiveDrag] = useState(null);
    const [practiceMode, setPracticeMode] = useState(false);
    const [targetTime, setTargetTime] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    const resetToCurrent = () => {
        const now = new Date();
        setTime(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    };

    useEffect(() => resetToCurrent(), []);

    useEffect(() => {
        if (practiceMode && targetTime !== null) {
            const currentHM = Math.floor(time / 60) % 720; 
            const targetHM = Math.floor(targetTime / 60) % 720;
            setIsSuccess(currentHM === targetHM);
        }
    }, [time, practiceMode, targetTime]);

    const generatePractice = () => {
        const h = Math.floor(Math.random() * 12) + 1; 
        const m = Math.floor(Math.random() * 12) * 5; 
        setTargetTime(h * 3600 + m * 60);
        setIsSuccess(false);
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

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen flex flex-col items-center py-12 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="w-full max-w-5xl flex justify-between items-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
                        Time Learning Clock
                    </h1>
                    <ThemeToggle 
                        isDarkMode={isDarkMode} 
                        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
                    />
                </div>
                <div className="h-14 flex items-center mb-6">
                    {activeDrag ? (
                        <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-lg bg-indigo-50 dark:bg-indigo-900/50 px-4 py-2 rounded-full shadow-sm transition-colors">
                            💡 Dragging the {activeDrag} hand...
                        </span>
                    ) : (
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-lg transition-colors">
                            Hover and drag any hand to explore how time works!
                        </span>
                    )}
                </div>
                <div className="mb-10 w-full max-w-3xl flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <button 
                        onClick={togglePractice}
                        className={`px-6 py-2 rounded-xl font-bold text-white transition-colors ${practiceMode ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                    >
                        {practiceMode ? "End Practice" : "Start Practice Mode"}
                    </button>
                    {practiceMode && targetTime !== null && (
                        <div className="flex items-center gap-4 text-xl">
                            <span className="font-medium text-slate-600 dark:text-slate-300">Set the clock to: 
                                <strong className="ml-2 text-2xl text-slate-800 dark:text-white">{formatPracticeLabel(targetTime)}</strong>
                            </span>
                            {isSuccess ? (
                                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold px-4 py-1 rounded-lg">Correct! 🎉</span>
                            ) : (
                                <button onClick={generatePractice} className="text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-3 py-1 rounded-lg text-slate-600 dark:text-slate-300 font-semibold transition-colors">Skip</button>
                            )}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-y-16 md:gap-x-32 mb-12 items-center justify-items-center">
                    <SecondDial isDarkMode={isDarkMode} totalSeconds={time} setTotalSeconds={setTime} activeDrag={activeDrag} setActiveDrag={setActiveDrag} />
                    <HourDial isDarkMode={isDarkMode} totalSeconds={time} setTotalSeconds={setTime} activeDrag={activeDrag} setActiveDrag={setActiveDrag} />
                    <MinuteDial isDarkMode={isDarkMode} totalSeconds={time} setTotalSeconds={setTime} activeDrag={activeDrag} setActiveDrag={setActiveDrag} />
                    <DigitalClock time={time} />
                </div>
                <button 
                    onClick={resetToCurrent}
                    className="mt-4 px-8 py-4 bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                    Reset to Current Time
                </button>
            </div>
        </div>
    );
}