import useDragClock from '../hooks/useDragClock';

export default function MinuteDial({ totalSeconds, setTotalSeconds, activeDrag, setActiveDrag }) {
    const type = 'minutes';
    const { svgRef, handlePointerDown } = useDragClock({
        type, setTotalSeconds, activeDrag, setActiveDrag, 
        step: 6,
        secondsPerRevolution: 3600
    });

    const angle = ((totalSeconds % 3600) / 60) * 6;
    const handColor = '#1e293b'; 
    const radius = 35;

    const ticks = Array.from({ length: 60 }).map((_, i) => {
        const isThick = i % 5 === 0;
        return (
            <line key={i} x1="50" y1={isThick ? "10" : "6"} x2="50" y2="2" stroke={isThick ? "#1e293b" : "#94a3b8"} strokeWidth={isThick ? "3" : "1"} transform={`rotate(${i * 6} 50 50)`} />
        );
    });

    return (
        <div className="flex flex-col items-center group">
            <div 
                className="clock-dial relative rounded-full bg-white shadow-xl border-[5px] border-slate-800 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200"
                style={{ width: '220px', height: '220px' }}
                onPointerDown={handlePointerDown} ref={svgRef} title="Drag to change minutes"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
                    {ticks}
                    <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '50px 50px', transition: activeDrag === type ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <line x1="50" y1="50" x2="50" y2={50 - radius} stroke={handColor} strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="50" cy={50 - radius} r="3.5" fill={handColor} />
                    </g>
                    <circle cx="50" cy="50" r="4" fill="#1e293b" />
                </svg>
            </div>
            <h3 className="mt-5 text-2xl font-bold capitalize text-slate-800">Minutes</h3>
        </div>
    );
}