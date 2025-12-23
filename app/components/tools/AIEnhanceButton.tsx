'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Check, AlertCircle } from 'lucide-react';

interface AIEnhanceButtonProps {
    content: string;
    fieldName: string;
    onEnhanced: (enhancedContent: string) => void;
    disabled?: boolean;
    className?: string;
}

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({
    content,
    fieldName,
    onEnhanced,
    disabled = false,
    className = ''
}) => {
    const [state, setState] = useState<ButtonState>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEnhance = async () => {
        if (!content.trim()) {
            setErrorMessage('Add some content first');
            setState('error');
            setTimeout(() => setState('idle'), 2000);
            return;
        }

        setState('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'enhance',
                    content,
                    fieldName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Enhancement failed');
            }

            onEnhanced(data.result);
            setState('success');
            setTimeout(() => setState('idle'), 2000);

        } catch (error) {
            console.error('Enhancement error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Enhancement failed');
            setState('error');
            setTimeout(() => setState('idle'), 3000);
        }
    };

    const getButtonContent = () => {
        switch (state) {
            case 'loading':
                return (
                    <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        <span>Enhancing...</span>
                    </>
                );
            case 'success':
                return (
                    <>
                        <Check className="w-3 h-3 mr-1" />
                        <span>Enhanced!</span>
                    </>
                );
            case 'error':
                return (
                    <>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        <span>{errorMessage || 'Error'}</span>
                    </>
                );
            default:
                return (
                    <>
                        <Sparkles className="w-3 h-3 mr-1" />
                        <span>Enhance with AI</span>
                    </>
                );
        }
    };

    const getButtonStyles = () => {
        const baseStyles = 'inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200';

        switch (state) {
            case 'loading':
                return `${baseStyles} bg-blue-100 text-blue-600 cursor-wait`;
            case 'success':
                return `${baseStyles} bg-green-100 text-green-700`;
            case 'error':
                return `${baseStyles} bg-red-100 text-red-700`;
            default:
                return `${baseStyles} bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`;
        }
    };

    return (
        <button
            onClick={handleEnhance}
            disabled={disabled || state === 'loading'}
            className={`${getButtonStyles()} ${className}`}
            title="Use AI to improve this content"
        >
            {getButtonContent()}
        </button>
    );
};

export default AIEnhanceButton;
