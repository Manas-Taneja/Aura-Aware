/// <reference types="vite-plugin-pwa/client" />

import React, { useState, useEffect, useCallback } from 'react';

// This component now uses the standard browser Service Worker API
// to avoid the build issue with the virtual module.
function ReloadPrompt() {
    const [needRefresh, setNeedRefresh] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
    const [offlineReady, setOfflineReady] = useState(false);

    // This effect runs once on mount to set up the service worker listeners
    useEffect(() => {
        if (!('serviceWorker' in navigator)) {
            return;
        }

        // The 'vite-plugin-pwa' library dispatches custom events on the window object.
        // We can listen for these instead of importing the virtual module.
        const onOfflineReady = () => setOfflineReady(true);
        const onNeedRefresh = (event: CustomEvent) => {
            const registration = event.detail;
            if (registration && registration.waiting) {
                setWaitingWorker(registration.waiting);
                setNeedRefresh(true);
            }
        };

        window.addEventListener('pwa-offline-ready', onOfflineReady);
        window.addEventListener('pwa-need-refresh', onNeedRefresh as EventListener);
        
        // When the component unmounts, remove the event listeners
        return () => {
            window.removeEventListener('pwa-offline-ready', onOfflineReady);
            window.removeEventListener('pwa-need-refresh', onNeedRefresh as EventListener);
        };
    }, []);

    const handleReload = useCallback(() => {
        // The service worker is waiting for a message to activate.
        if (waitingWorker) {
            waitingWorker.postMessage({ type: 'SKIP_WAITING' });
            // The page will reload automatically after the new worker takes control.
            setNeedRefresh(false);
        }
    }, [waitingWorker]);

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (offlineReady || needRefresh) {
        return (
            <div className="fixed right-0 bottom-0 m-4 p-4 border rounded-lg shadow-lg bg-white z-50 max-w-sm">
                <div className="mb-2">
                    {offlineReady ? (
                        <span className="text-green-600 font-medium">App ready to work offline</span>
                    ) : (
                        <span className="text-blue-600 font-medium">New content available, click on reload button to update.</span>
                    )}
                </div>
                <div className="flex gap-2">
                    {needRefresh && (
                        <button
                            className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors"
                            onClick={handleReload}
                        >
                            Reload
                        </button>
                    )}
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={close}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return null;
}

export default ReloadPrompt;