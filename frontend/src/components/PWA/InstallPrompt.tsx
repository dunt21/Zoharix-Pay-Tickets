import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Update UI notify the user they can install the PWA
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        await deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // We've used the prompt, so clear it
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[9999] animate-in slide-in-from-right-5 fade-in duration-300">
            <div className="flex items-center gap-6 bg-white dark:bg-zinc-800 border-l-[6px] border-purple-600 shadow-2xl rounded-r-xl p-8 pr-10 w-[95vw] md:w-auto md:min-w-[500px] max-w-2xl">
                <div className="text-purple-600 dark:text-purple-400">
                    <Download size={32} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-xl">Install App</h3>
                    <div className="flex gap-6 mt-2">
                        <button
                            onClick={handleInstallClick}
                            className="text-lg font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors py-1"
                        >
                            Install Now
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="text-lg font-semibold text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors py-1"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors -mr-4 -mt-4 p-3"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
}
