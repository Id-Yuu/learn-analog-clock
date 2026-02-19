import useDragClock from '../hooks/useDragClock';

export default function HourDial({ totalSeconds, setTotalSeconds, activeDrag, setActiveDrag }) {
    const type = 'hours';
    const { svgRef, handlePointerDown } = useDragClock({
        type, setTotalSeconds, activeDrag, setActiveDrag, 
        step: 30,
        secondsPerRevolution: 43200
    });

    const angle = ((totalSeconds % 43200) / 43200) * 360;
    const handColor = '#1e293b'; 
    const radius = 25;

    const ticks = Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="50" y1="10" x2="50" y2="2" stroke="#1e293b" strokeWidth="3" transform={`rotate(${i * 30} 50 50)`} />
    ));

    const numbers = Array.from({ length: 12 }).map((_, i) => {
        const num = i + 1;
        const rad = ((num * 30) - 90) * (Math.PI / 180);
        return (
            <text key={num} x={50 + 32 * Math.cos(rad)} y={50 + 32 * Math.sin(rad)} textAnchor="middle" dominantBaseline="central" fontSize="8" fill="#1e293b" fontWeight="bold">
                {num}
            </text>
        );
    });

    return (
        <div className="flex flex-col items-center group">
            <div 
                className="clock-dial relative rounded-full bg-white shadow-xl border-[5px] border-slate-800 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200"
                style={{ width: '220px', height: '220px' }}
                onPointerDown={handlePointerDown} ref={svgRef} title="Drag to change hours"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
                    {ticks}
                    {numbers}
                    <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '50px 50px', transition: activeDrag === type ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <line x1="50" y1="50" x2="50" y2={50 - radius} stroke={handColor} strokeWidth="4" strokeLinecap="round" />
                        <circle cx="50" cy={50 - radius} r="3.5" fill={handColor} />
                    </g>
                    <circle cx="50" cy="50" r="4" fill="#1e293b" />
                </svg>
            </div>
            <h3 className="mt-5 text-2xl font-bold capitalize text-slate-800">Hours</h3>
        </div>
    );
}