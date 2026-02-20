
export default function FullClockDial({ time, isDarkMode }) {
    const secondAngle = (time % 60) * 6;
    const minuteAngle = ((time % 3600) / 60) * 6;
    const hourAngle = ((time % 43200) / 43200) * 360;

    const mainColor = isDarkMode ? '#f8fafc' : '#1e293b';
    const thickTickColor = isDarkMode ? '#f8fafc' : '#1e293b';
    const thinTickColor = isDarkMode ? '#475569' : '#94a3b8';
    const secondColor = '#ef4444';

    const ticks = Array.from({ length: 60 }).map((_, i) => {
        const isThick = i % 5 === 0;
        return (
            <line 
                key={i} x1="50" y1={isThick ? "10" : "6"} x2="50" y2="2" 
                stroke={isThick ? thickTickColor : thinTickColor} 
                strokeWidth={isThick ? "3" : "1"} 
                transform={`rotate(${i * 6} 50 50)`} 
            />
        );
    });

    const numbers = Array.from({ length: 12 }).map((_, i) => {
        const num = i + 1;
        const rad = ((num * 30) - 90) * (Math.PI / 180);
        return (
            <text key={num} x={50 + 32 * Math.cos(rad)} y={50 + 32 * Math.sin(rad)} textAnchor="middle" dominantBaseline="central" fontSize="8" fill={mainColor} fontWeight="bold">
                {num}
            </text>
        );
    });

    return (
        <div className="flex flex-col items-center">
            <div 
                className="relative rounded-full shadow-xl border-[5px] bg-white dark:bg-slate-800 border-slate-800 dark:border-slate-600 transition-colors duration-300"
                style={{ width: '220px', height: '220px' }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {ticks}
                    {numbers}
                    
                    <g style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: '50px 50px', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <line x1="50" y1="50" x2="50" y2="25" stroke={mainColor} strokeWidth="4" strokeLinecap="round" />
                    </g>
                    
                    <g style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: '50px 50px', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <line x1="50" y1="50" x2="50" y2="15" stroke={mainColor} strokeWidth="2.5" strokeLinecap="round" />
                    </g>

                    <g style={{ transform: `rotate(${secondAngle}deg)`, transformOrigin: '50px 50px', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <line x1="50" y1="50" x2="50" y2="12" stroke={secondColor} strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="50" cy="12" r="2.5" fill={secondColor} />
                    </g>

                    <circle cx="50" cy="50" r="4" fill={mainColor} />
                    <circle cx="50" cy="50" r="1.5" fill={secondColor} />
                </svg>
            </div>
        </div>
    );
}