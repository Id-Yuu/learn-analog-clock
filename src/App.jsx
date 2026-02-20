import { useState, useEffect } from 'react';
import SecondDial from './components/SecondDial';
import MinuteDial from './components/MinuteDial';
import HourDial from './components/HourDial';
import FullClockDial from './components/FullClockDial';
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
            <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
                        Time Learning Clock
                    </h1>
                    <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-8 transition-colors text-center">
                    {activeDrag ? (
                        <span className="text-indigo-600 dark:text-indigo-400">💡 Dragging the {activeDrag} hand...</span>
                    ) : (
                        "Hover and drag any hand to explore how time works!"
                    )}
                </p>

                <div className="mb-12 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300 min-h-[72px]">
                    <button 
                        onClick={togglePractice}
                        className={`px-6 py-2 rounded-xl font-bold text-white transition-colors w-full md:w-auto ${practiceMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                    >
                        {practiceMode ? "End Practice Mode" : "Start Practice Mode"}
                    </button>

                    {practiceMode && targetTime !== null && (
                        <div className="flex items-center gap-4 mt-4 md:mt-0 px-4">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16 items-center justify-items-center w-full max-w-4xl">
                    <SecondDial isDarkMode={isDarkMode} totalSeconds={time} setTotalSeconds={setTime} activeDrag={activeDrag} setActiveDrag={setActiveDrag} />
                    <MinuteDial isDarkMode={isDarkMode} totalSeconds={time} setTotalSeconds={setTime} activeDrag={activeDrag} setActiveDrag={setActiveDrag} />
                    <HourDial isDarkMode={isDarkMode} totalSeconds={time} setTotalSeconds={setTime} activeDrag={activeDrag} setActiveDrag={setActiveDrag} />
                </div>

                <div className="relative w-full max-w-4xl border border-slate-300 dark:border-slate-600 rounded-xl p-8 pt-12 mb-12 bg-transparent">
                    <span className="absolute -top-3 left-6 bg-slate-50 dark:bg-slate-900 px-3 text-sm font-semibold text-slate-500 dark:text-slate-400 transition-colors">
                        Output
                    </span>
                    
                    <div className="flex flex-col md:flex-row items-center justify-around gap-12">
                        <div className="flex flex-col items-center">
                            <FullClockDial time={time} isDarkMode={isDarkMode} />
                            <h3 className="mt-5 text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors">Clock</h3>
                        </div>

                        <div className="flex flex-col items-center">
                            <DigitalClock time={time} isDarkMode={isDarkMode} />
                            <h3 className="mt-5 text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors">Clock</h3>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={resetToCurrent}
                    className="px-8 py-4 bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                    Reset to Current Time
                </button>
            </div>
        </div>
    );
}