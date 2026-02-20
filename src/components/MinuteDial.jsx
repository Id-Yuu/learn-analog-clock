import useDragClock from '../hooks/useDragClock';

export default function MinuteDial({ totalSeconds, setTotalSeconds, activeDrag, setActiveDrag, isDarkMode }) {
    const type = 'minutes';
    const { svgRef, handlePointerDown } = useDragClock({ type, setTotalSeconds, activeDrag, setActiveDrag, step: 6, secondsPerRevolution: 3600 });

    const angle = ((totalSeconds % 3600) / 60) * 6;
    const handColor = isDarkMode ? '#e2e8f0' : '#1e293b'; 
    const thickColor = isDarkMode ? '#e2e8f0' : '#1e293b';
    const thinColor = isDarkMode ? '#475569' : '#94a3b8';
    const radius = 35;

    const ticks = Array.from({ length: 60 }).map((_, i) => {
        const isThick = i % 5 === 0;
        return (
            <line key={i} x1="50" y1={isThick ? "10" : "6"} x2="50" y2="2" stroke={isThick ? thickColor : thinColor} strokeWidth={isThick ? "3" : "1"} transform={`rotate(${i * 6} 50 50)`} />
        );
    });

    return (
        <div className="flex flex-col items-center group">
            <div 
                className="clock-dial relative rounded-full shadow-xl dark:shadow-slate-900/50 border-[5px] cursor-grab active:cursor-grabbing hover:scale-105 transition-all duration-300 bg-white dark:bg-slate-800 border-slate-800 dark:border-slate-700"
                style={{ width: '220px', height: '220px' }}
                onPointerDown={handlePointerDown} ref={svgRef} title="Drag to change minutes"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
                    {ticks}
                    <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '50px 50px', transition: activeDrag === type ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <line x1="50" y1="50" x2="50" y2={50 - radius} stroke={handColor} strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="50" cy={50 - radius} r="3.5" fill={handColor} />
                    </g>
                    <circle cx="50" cy="50" r="4" fill={handColor} />
                </svg>
            </div>
            <h3 className="mt-5 text-2xl font-bold capitalize text-slate-800 dark:text-slate-200 transition-colors">Minutes</h3>
        </div>
    );
}