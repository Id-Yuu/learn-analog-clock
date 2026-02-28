import { useState } from 'react';

export default function VideoModal({ isOpen, onClose, videoUrl = "https://www.youtube.com/embed/Ow63JHReZt4" }) {
    const [isMaximized, setIsMaximized] = useState(false);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-2 md:p-6 animate-in fade-in duration-200">
            <div className={`bg-white dark:bg-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isMaximized ? 'w-full h-full rounded-none' : 'max-w-4xl w-full aspect-video rounded-2xl border border-slate-200 dark:border-slate-700'}`}>
                <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 pl-2">How to Read a Clock</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setIsMaximized(!isMaximized)} className="w-8 h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-800 dark:text-slate-200 transition-colors" title={isMaximized ? "Restore Down" : "Maximize Width"}>
                            {isMaximized ? '🗗' : '🗖'}
                        </button>
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 font-bold rounded-lg transition-colors" title="Close Video">
                            ✕
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full h-full bg-black">
                    <iframe className="w-full h-full" src={videoUrl} title="YouTube video tutorial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
}