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
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Choose Your Style</h2>
                            <p className="text-gray-500">Select a template structure for your pitch deck.</p>
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
                                <p className="text-sm text-gray-500">The gold standard for Series A.</p>
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
                                <p className="text-sm text-gray-500">Minimalist for seed stage.</p>
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
                                <p className="text-sm text-gray-500">High impact dark mode.</p>
                            </button>
                        </div>

                        {/* Industry Selection */}
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">What&apos;s your industry?</h3>
                            <p className="text-gray-500 text-sm">This helps AI generate more relevant content (optional)</p>
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
                                Continue with {template === 'yc' ? 'Y Combinator' : template.charAt(0).toUpperCase() + template.slice(1)} Template
                                <span className="ml-2">&rarr;</span>
                            </button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <WizardStep
                        title="Company Basics"
                        description="Let's start with the fundamentals of your startup."
                        currentStep={1}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                        isNextDisabled={!formData.companyName}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableInput('companyName', 'Company Name', 'e.g. Acme Corp')}
                            {renderEnhanceableInput('tagline', 'One-Liner / Tagline', 'e.g. The Uber for Dog Walking')}
                        </div>
                    </WizardStep>
                );
            case 2:
                return (
                    <WizardStep
                        title="The Problem & Solution"
                        description="Define the pain point and how you solve it."
                        currentStep={2}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('problem', 'The Problem', 'What is the specific pain point your customers face?')}
                            {renderEnhanceableTextarea('solution', 'Your Solution', 'How does your product solve this problem uniquely?')}
                        </div>
                    </WizardStep>
                );
            case 3:
                return (
                    <WizardStep
                        title="Market & Competition"
                        description="Show the opportunity and who else is playing."
                        currentStep={3}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('market', 'Market Opportunity', 'Who is your target audience? How big is the market (TAM/SAM/SOM)?', 3)}
                            {renderEnhanceableTextarea('competition', 'Competition', 'Who are your competitors and why are you better?', 3)}
                        </div>
                    </WizardStep>
                );
            case 4:
                return (
                    <WizardStep
                        title="Business Model & Go-to-Market"
                        description="How you make money and get customers."
                        currentStep={4}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('businessModel', 'Business Model', 'How do you make money? (e.g. SaaS subscription, marketplace fee)', 3)}
                            {renderEnhanceableTextarea('goToMarket', 'Go-to-Market Strategy', 'How will you acquire customers? (e.g. SEO, Direct Sales, Partnerships)', 3)}
                        </div>
                    </WizardStep>
                );
            case 5:
                return (
                    <WizardStep
                        title="Traction & Milestones"
                        description="Prove that people want what you're building."
                        currentStep={5}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('traction', 'Key Metrics / Traction', 'Revenue, active users, retention rate, partnerships, or key product milestones.', 5)}
                        </div>
                    </WizardStep>
                );
            case 6:
                return (
                    <WizardStep
                        title="Team & Ask"
                        description="Who is building this and what do you need?"
                        currentStep={6}
                        totalSteps={totalSteps}
                        onNext={handleNext}
                        onBack={handleBack}
                    >
                        <div className="space-y-6">
                            {renderEnhanceableTextarea('team', 'The Team', 'Key founders and their relevant experience.', 3)}
                            {renderEnhanceableTextarea('ask', 'The Ask', 'How much are you raising and what will you use it for?', 3)}
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
                            <span className="text-xs font-bold tracking-wide uppercase">AI-Powered Generator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                            Build Your <span className="text-blue-600">Perfect Pitch</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Answer a few questions and we&apos;ll generate a structured, investor-ready pitch deck outline for you.
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
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Auto-Generate with AI
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
                                    Clear Draft
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
