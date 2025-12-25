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
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 z-50 flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                        <Download size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">Install App</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Install Z-Events for a better experience with offline access and notifications.
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            <div className="flex gap-2 justify-end">
                <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                >
                    Not now
                </button>
                <button
                    onClick={handleInstallClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors shadow-sm"
                >
                    Install
                </button>
            </div>
        </div>
    );
}
