import { useEffect, useRef } from 'react';

export default function useDragClock({ type, setTotalSeconds, activeDrag, setActiveDrag, step, secondsPerRevolution }) {
    const svgRef = useRef(null);
    const prevAngleRef = useRef(0);

    const handlePointerDown = (e) => {
        e.preventDefault();
        setActiveDrag(type);
        const rect = svgRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        
        let rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        prevAngleRef.current = Math.round(rawAngle / step) * step;
    };

    useEffect(() => {
        if (activeDrag !== type) return;

        const handlePointerMove = (e) => {
            const rect = svgRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            
            let rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            let snappedAngle = Math.round(rawAngle / step) * step;

            let delta = snappedAngle - prevAngleRef.current;
            if (delta === 0) return;

            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;
            prevAngleRef.current = snappedAngle;

            let secondsDelta = delta * (secondsPerRevolution / 360);

            setTotalSeconds(prev => {
                let next = prev + secondsDelta;
                if (next < 0) next += 86400;
                return next % 86400;
            });
        };

        const handlePointerUp = () => setActiveDrag(null);

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [activeDrag, type, step, secondsPerRevolution, setTotalSeconds]);

    return { svgRef, handlePointerDown };
}