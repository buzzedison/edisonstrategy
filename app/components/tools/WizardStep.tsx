import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WizardStepProps {
    title: string;
    description: string;
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onBack: () => void;
    children: React.ReactNode;
    isNextDisabled?: boolean;
}

const WizardStep: React.FC<WizardStepProps> = ({
    title,
    description,
    currentStep,
    totalSteps,
    onNext,
    onBack,
    children,
    isNextDisabled = false,
}) => {
    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <div className="flex gap-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">{title}</h2>
                <p className="text-gray-500">{description}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                {children}
            </div>

            <div className="flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    disabled={currentStep === 1}
                    className={`text-gray-500 hover:text-gray-900 ${currentStep === 1 ? 'invisible' : ''}`}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <Button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-blue-200 transition-all hover:scale-105"
                >
                    {currentStep === totalSteps ? 'Generate Deck' : 'Next Step'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default WizardStep;
