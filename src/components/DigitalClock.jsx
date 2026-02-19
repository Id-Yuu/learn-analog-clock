export default function DigitalClock({ time }) {
    const formatDigitalTime = (totalSecs) => {
        const h = Math.floor(totalSecs / 3600) % 24;
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = Math.floor(totalSecs % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center">
            <div className="border-[5px] border-slate-800 rounded-2xl px-10 py-8 bg-white shadow-xl w-full max-w-[320px] text-center">
                <div className="text-5xl font-black text-slate-800 tracking-wider font-mono">
                    {formatDigitalTime(time)}
                </div>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-slate-800">Clock</h3>
        </div>
    );
}