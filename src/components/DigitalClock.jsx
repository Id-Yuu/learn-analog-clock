export default function DigitalClock({ time }) {
    const formatDigitalTime = (totalSecs) => {
        const h = Math.floor(totalSecs / 3600) % 24;
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = Math.floor(totalSecs % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center">
            <div className="border-[5px] border-slate-800 dark:border-slate-600 rounded-2xl px-8 py-6 bg-white dark:bg-slate-800 shadow-xl w-full max-w-[300px] text-center transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-wider font-mono transition-colors">
                    {formatDigitalTime(time)}
                </div>
            </div>
        </div>
    );
}