import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// System prompts for different AI actions
const SYSTEM_PROMPTS = {
    enhance: `You are an elite pitch deck consultant who has helped startups raise over $10B in funding from top VCs like Sequoia, a16z, and Y Combinator.

Your job is to transform startup pitch content into investor-grade copy that:
- Opens with impact (hook the reader in the first sentence)
- Uses specific numbers and metrics when possible
- Employs power verbs and confident language
- Removes filler words and redundancy
- Follows the "So what?" test - every sentence must matter
- Maintains authenticity while maximizing persuasion

IMPORTANT: Return ONLY the enhanced text. No explanations, no quotes, no formatting markers.`,

    suggest: `You are an expert pitch deck consultant. Based on the partial input provided, 
suggest how to complete or improve this section. Be specific, actionable, and investor-focused.
Return 2-3 bullet points of suggestions, each on a new line starting with "• "`,

    narrative: `You are creating a pitch deck narrative. Transform the provided content into 
a compelling story that flows naturally and captures investor attention.
Keep it concise but impactful. Return ONLY the narrative text.`,

    generateSlide: `You are an elite pitch deck consultant creating content for a startup fundraising deck.

Generate compelling, investor-ready content that:
- Is specific and avoids generic statements
- Uses concrete examples and metrics where appropriate
- Demonstrates deep market understanding
- Shows clear differentiation and competitive advantage
- Balances confidence with credibility

IMPORTANT: Return ONLY the slide content. No explanations, headers, or formatting markers.`,

    generateComplete: `You are an elite pitch deck consultant helping a startup create their fundraising deck.

Based on the company information provided, generate compelling content for the specified section.
Make reasonable assumptions based on the industry and company type, but keep content realistic and achievable.

Guidelines by section:
- Problem: Paint a vivid picture of the pain point. Use "imagine" or real scenarios.
- Solution: Focus on the unique approach and key differentiators.
- Market: Include realistic TAM/SAM/SOM estimates with sources.
- Competition: Position against 2-3 key competitors with clear differentiation.
- Business Model: Be specific about pricing, unit economics, and revenue streams.
- Go-to-Market: Outline specific channels and early traction strategies.
- Traction: If early stage, focus on validation signals and milestones.
- Team: Highlight relevant experience and why this team wins.
- Ask: Be specific about amount, use of funds, and milestones to achieve.

IMPORTANT: Return ONLY the content. No section headers, explanations, or formatting markers.`
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, content, context, fieldName } = body;

        // Use environment variable for API key
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                {
                    error: 'No API key configured',
                    message: 'Server API key not configured. Please contact the administrator.'
                },
                { status: 401 }
            );
        }

        if (!action || !content) {
            return NextResponse.json(
                { error: 'Missing required fields: action and content' },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let prompt = '';
        const systemPrompt = SYSTEM_PROMPTS[action as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.enhance;

        switch (action) {
            case 'enhance':
                prompt = `${systemPrompt}\n\nSection: ${fieldName || 'General'}\nOriginal content:\n"${content}"\n\nEnhanced version:`;
                break;

            case 'suggest':
                prompt = `${systemPrompt}\n\nField: ${fieldName || 'General'}\nContext: ${context || 'Startup pitch deck'}\nCurrent input: ${content}\n\nSuggestions:`;
                break;

            case 'narrative':
                prompt = `${systemPrompt}\n\nPitch deck data:\n${JSON.stringify(content, null, 2)}\n\nNarrative:`;
                break;

            case 'generateSlide':
            case 'generateComplete':
                const sectionPrompt = SYSTEM_PROMPTS.generateComplete;
                prompt = `${sectionPrompt}\n\nSection to generate: ${fieldName}\n\nCompany Information:\n${context || 'A tech startup'}\n\nAdditional context: ${content}\n\nGenerate compelling content for the ${fieldName} section:`;
                break;

            default:
                prompt = `${systemPrompt}\n\n${content}`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            success: true,
            result: text.trim(),
            action
        });

    } catch (error: unknown) {
        console.error('Gemini API error:', error);

        // Handle specific error types
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key not valid')) {
            return NextResponse.json(
                {
                    error: 'Invalid API key',
                    message: 'Server API key is invalid. Please contact the administrator.'
                },
                { status: 401 }
            );
        }

        if (errorMessage.includes('RATE_LIMIT') || errorMessage.includes('quota')) {
            return NextResponse.json(
                {
                    error: 'Rate limit exceeded',
                    message: 'API rate limit reached. Please wait a moment and try again.'
                },
                { status: 429 }
            );
        }

        return NextResponse.json(
            {
                error: 'AI generation failed',
                message: 'Failed to generate content. Please try again.'
            },
            { status: 500 }
        );
    }
}
