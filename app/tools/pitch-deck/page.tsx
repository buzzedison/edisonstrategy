'use client';

import React, { useState, useEffect, useCallback } from 'react';
import WizardStep from '@/app/components/tools/WizardStep';
import DeckPreview from '@/app/components/tools/DeckPreview';
import AIEnhanceButton from '@/app/components/tools/AIEnhanceButton';
import { Sparkles, LayoutTemplate, Target, Save, Loader2 } from 'lucide-react';

const STORAGE_KEY = 'pitch-deck-draft';

interface FormData {
    companyName: string;
    tagline: string;
    problem: string;
    solution: string;
    market: string;
    competition: string;
    businessModel: string;
    goToMarket: string;
    traction: string;
    team: string;
    ask: string;
}

const initialFormData: FormData = {
    companyName: '',
    tagline: '',
    problem: '',
    solution: '',
    market: '',
    competition: '',
    businessModel: '',
    goToMarket: '',
    traction: '',
    team: '',
    ask: ''
};

// Industry presets for quick start
const INDUSTRY_PRESETS = [
    { id: 'saas', name: 'SaaS / B2B Software', icon: '💻', description: 'Enterprise software, productivity tools' },
    { id: 'fintech', name: 'Fintech', icon: '💳', description: 'Payments, banking, crypto' },
    { id: 'healthtech', name: 'HealthTech', icon: '🏥', description: 'Digital health, biotech, wellness' },
    { id: 'ecommerce', name: 'E-Commerce / D2C', icon: '🛒', description: 'Online retail, marketplaces' },
    { id: 'edtech', name: 'EdTech', icon: '📚', description: 'Learning platforms, skill development' },
    { id: 'ai', name: 'AI / ML', icon: '🤖', description: 'Artificial intelligence, automation' },
    { id: 'climate', name: 'Climate Tech', icon: '🌱', description: 'Sustainability, clean energy' },
    { id: 'consumer', name: 'Consumer App', icon: '📱', description: 'Social, entertainment, lifestyle' },
];

export default function PitchDeckGenerator() {
    const [step, setStep] = useState(0);
    const [template, setTemplate] = useState<'sequoia' | 'yc' | 'modern'>('sequoia');
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

    const totalSteps = 6;

    // Load saved data on mount
    useEffect(() => {
        const savedDraft = localStorage.getItem(STORAGE_KEY);
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                setFormData(parsed.formData || initialFormData);
                setTemplate(parsed.template || 'sequoia');
                setStep(parsed.step || 0);
                setLastSaved(parsed.savedAt ? new Date(parsed.savedAt) : null);
            } catch {
                console.error('Failed to load saved draft');
            }
        }
    }, []);

    // Auto-save on change
    const saveToLocalStorage = useCallback(() => {
        const data = {
            formData,
            template,
            step,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLastSaved(new Date());
    }, [formData, template, step]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (formData.companyName || formData.problem || formData.solution) {
                saveToLocalStorage();
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [formData, saveToLocalStorage]);

    const handleNext = () => {
        if (step < totalSteps + 1) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEnhanced = (fieldName: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleClearDraft = () => {
        localStorage.removeItem(STORAGE_KEY);
        setFormData(initialFormData);
        setStep(0);
        setLastSaved(null);
    };

    // Build comprehensive context from all filled fields
    const buildContext = useCallback(() => {
        const parts = [];
        
        // Add industry context first
        if (selectedIndustry) {
            const industry = INDUSTRY_PRESETS.find(i => i.id === selectedIndustry);
            if (industry) {
                parts.push(`Industry: ${industry.name} (${industry.description})`);
            }
        }
        
        if (formData.companyName) parts.push(`Company: ${formData.companyName}`);
        if (formData.tagline) parts.push(`Tagline: ${formData.tagline}`);
        if (formData.problem) parts.push(`Problem: ${formData.problem}`);
        if (formData.solution) parts.push(`Solution: ${formData.solution}`);
        if (formData.market) parts.push(`Market: ${formData.market}`);
        if (formData.businessModel) parts.push(`Business Model: ${formData.businessModel}`);
        if (formData.competition) parts.push(`Competition: ${formData.competition}`);
        if (formData.traction) parts.push(`Traction: ${formData.traction}`);
        if (formData.team) parts.push(`Team: ${formData.team}`);
        
        return parts.join('\n') || 'A tech startup';
    }, [formData, selectedIndustry]);

    const handleGenerateWithAI = async () => {
        setIsGenerating(true);

        // Order matters - generate in logical sequence so later fields can use earlier ones
        const fieldOrder: (keyof FormData)[] = [
            'tagline', 'problem', 'solution', 'market', 
            'competition', 'businessModel', 'goToMarket', 
            'traction', 'team', 'ask'
        ];

        const fieldsToGenerate = fieldOrder.filter(field => !formData[field]?.trim());

        for (const field of fieldsToGenerate) {
            try {
                // Build fresh context including any newly generated fields
                const context = buildContext();
                
                const response = await fetch('/api/gemini', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'generateComplete',
                        content: `Generate content for a ${template} style pitch deck`,
                        fieldName: field,
                        context
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(prev => ({ ...prev, [field]: data.result }));
                }
            } catch (error) {
                console.error(`Failed to generate ${field}:`, error);
            }
        }

        setIsGenerating(false);
    };

    // Render input field with AI enhance button
    const renderEnhanceableTextarea = (
        name: keyof FormData,
        label: string,
        placeholder: string,
        rows: number = 4
    ) => (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <AIEnhanceButton
                    content={formData[name]}
                    fieldName={label}
                    onEnhanced={(value) => handleEnhanced(name, value)}
                />
            </div>
            <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={rows}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder={placeholder}
            />
        </div>
    );

    const renderEnhanceableInput = (
        name: keyof FormData,
        label: string,
        placeholder: string
    ) => (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <AIEnhanceButton
                    content={formData[name]}
                    fieldName={label}
                    onEnhanced={(value) => handleEnhanced(name, value)}
                />
            </div>
            <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    );

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
                        {/* Template Selection */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Pick a Deck Style</h2>
                            <p className="text-gray-500">Choose the layout that fits your startup story.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {/* Sequoia Template */}
                            <button
                                onClick={() => setTemplate('sequoia')}
                                className={`group relative p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl ${template === 'sequoia' ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-200' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                            >
                                <div className="mb-3 h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                                    <LayoutTemplate className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Sequoia Capital</h3>
                                <p className="text-sm text-gray-500">Clear structure for serious fundraising.</p>
                            </button>

                            {/* YC Template */}
                            <button
                                onClick={() => setTemplate('yc')}
                                className={`group relative p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl ${template === 'yc' ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-200' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                            >
                                <div className="mb-3 h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Y Combinator</h3>
                                <p className="text-sm text-gray-500">Simple and focused for early-stage founders.</p>
                            </button>

                            {/* Modern Template */}
                            <button
                                onClick={() => setTemplate('modern')}
                                className={`group relative p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl ${template === 'modern' ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-200' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                            >
                                <div className="mb-3 h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Modern Bold</h3>
                                <p className="text-sm text-gray-500">Bold visuals with a modern look.</p>
                            </button>
                        </div>

                        {/* Industry Selection */}
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">What do you build?</h3>
                            <p className="text-gray-500 text-sm">Optional, but this helps AI write better first drafts.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {INDUSTRY_PRESETS.map((industry) => (
                                <button
                                    key={industry.id}
                                    onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                                        selectedIndustry === industry.id 
                                            ? 'border-purple-500 bg-purple-50' 
                                            : 'border-gray-100 bg-white hover:border-purple-200'
                                    }`}
                                >
                                    <span className="text-2xl mb-2 block">{industry.icon}</span>
                                    <h4 className="font-semibold text-gray-900 text-sm">{industry.name}</h4>
                                    <p className="text-xs text-gray-500">{industry.description}</p>
                                </button>
                            ))}
                        </div>

                        {/* Continue Button */}
                        <div className="text-center">
                            <button
                                onClick={handleNext}
                                className="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                Continue with {template === 'yc' ? 'Y Combinator' : template.charAt(0).toUpperCase() + template.slice(1)} style
                                <span className="ml-2">&rarr;</span>
                            </button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <WizardStep
                        title="Company basics"
                        description="Start with the key details."
                        currentStep={1}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                        isNextDisabled={!formData.companyName}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableInput('companyName', 'Company name', 'e.g. Acme')}
                            {renderEnhanceableInput('tagline', 'One-line pitch', 'e.g. We help teams ship faster')}
                        </div>
                    </WizardStep>
                );
            case 2:
                return (
                    <WizardStep
                        title="Problem and solution"
                        description="What problem do you solve, and how?"
                        currentStep={2}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('problem', 'Problem', 'What pain are your customers dealing with?')}
                            {renderEnhanceableTextarea('solution', 'Solution', 'How does your product solve it better?')}
                        </div>
                    </WizardStep>
                );
            case 3:
                return (
                    <WizardStep
                        title="Market and competition"
                        description="Who is this for, and who else is in the market?"
                        currentStep={3}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('market', 'Market', 'Who are your customers and how big is the market?', 3)}
                            {renderEnhanceableTextarea('competition', 'Competition', 'Who else is solving this, and what is your edge?', 3)}
                        </div>
                    </WizardStep>
                );
            case 4:
                return (
                    <WizardStep
                        title="Revenue and growth plan"
                        description="How you make money and win customers."
                        currentStep={4}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('businessModel', 'Business model', 'How do you make money? (e.g. subscription, transaction fee)', 3)}
                            {renderEnhanceableTextarea('goToMarket', 'Go-to-market', 'How will people discover and buy from you?', 3)}
                        </div>
                    </WizardStep>
                );
            case 5:
                return (
                    <WizardStep
                        title="Traction and progress"
                        description="Show proof that people want this."
                        currentStep={5}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('traction', 'Traction', 'Share revenue, users, retention, partnerships, or key wins.', 5)}
                        </div>
                    </WizardStep>
                );
            case 6:
                return (
                    <WizardStep
                        title="Team and fundraise ask"
                        description="Who is building this, and what are you raising?"
                        currentStep={6}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('team', 'Team', 'Who are the founders and why are they right for this?', 3)}
                            {renderEnhanceableTextarea('ask', 'Ask', 'How much are you raising, and where will it go?', 3)}
                        </div>
                    </WizardStep>
                );
            default:
                return <DeckPreview data={formData} template={template} onReset={() => setStep(0)} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {step <= totalSteps && (
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-6 border border-blue-200">
                            <Sparkles className="w-4 h-4 mr-2" />
                            <span className="text-xs font-bold tracking-wide uppercase">AI Deck Helper</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                            Build Your <span className="text-blue-600">Pitch Deck</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Answer a few questions to create a clear pitch deck outline you can present.
                        </p>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {/* Generate with AI */}
                            <button
                                onClick={handleGenerateWithAI}
                                disabled={isGenerating || !formData.companyName}
                                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Writing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Fill Empty Sections with AI
                                    </>
                                )}
                            </button>

                            {/* Last Saved */}
                            {lastSaved && (
                                <span className="inline-flex items-center text-xs text-gray-500">
                                    <Save className="w-3 h-3 mr-1" />
                                    Saved {lastSaved.toLocaleTimeString()}
                                </span>
                            )}

                            {/* Clear Draft */}
                            {(formData.companyName || formData.problem) && (
                                <button
                                    onClick={handleClearDraft}
                                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Reset Form
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Wizard Content */}
                <div className="flex justify-center">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
}
