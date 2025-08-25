import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { pull } from 'langchain/hub';
import { AgentExecutor, createReactAgent} from 'langchain/agents';
import { TavilySearch } from '@langchain/tavily';

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Initialize OpenAI model
const model = new ChatOpenAI({
  model: "gpt-4.1",
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

// Initialize Tavily search tool
const searchTool = new TavilySearchResults({
  maxResults: 3,
  topic :"general",
  apiKey: process.env.TAVILY_API_KEY,
  includeImages : false,
});

// Tools array
const tools = [searchTool];

// Pull the ReAct prompt from LangChain Hub
let reactPrompt: any;

async function getReactPrompt() {
  if (!reactPrompt) {
    reactPrompt = await pull("hwchase17/react-chat");
  }
  return reactPrompt;
}

// Create the ReAct agent with AgentExecutor
async function createAgent() {
  const prompt = await getReactPrompt();
  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });
  
  return new AgentExecutor({
    agent,
    tools,
    verbose: true,
    maxIterations: 3,
    returnIntermediateSteps: true,
    handleParsingErrors: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if API keys are configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    if (!process.env.TAVILY_API_KEY) {
      return NextResponse.json(
        { error: 'Tavily API key not configured' },
        { status: 500 }
      );
    }

    // Create the agent executor
    const agentExecutor = await createAgent();

    // Format chat history for the ReAct prompt
    const formattedHistory = chatHistory
      .slice(-6) // Keep last 6 messages for context (3 exchanges)
      .map((msg: ChatMessage) => {
        return msg.isBot 
          ? `Assistant: ${msg.text}`
          : `Human: ${msg.text}`;
      })
      .join('\n');

    // Enhanced system prompt for Xbox gaming focus
    const enhancedMessage = `ROG Xbox Ally and Xbox Ally X  gaming question: ${message}`;

    // Execute the agent with chat history
    const result = await agentExecutor.invoke({
      input: enhancedMessage,
      chat_history: formattedHistory,
    });

    // Extract the final response
    const response = result.output;

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('ReAct Agent Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    // Check if it's a parsing error and extract the actual LLM output
    if (error instanceof Error && error.message.includes('Could not parse LLM output:')) {
      const outputMatch = error.message.match(/Could not parse LLM output: ([\s\S]*)/);
      if (outputMatch && outputMatch[1]) {
        const cleanOutput = outputMatch[1].replace(/\n\nTroubleshooting URL:.*$/, '').trim();
        return NextResponse.json({ 
          response: cleanOutput,
          timestamp: new Date().toISOString(),
          fallback: false,
        });
      }
    }
    
    // Fallback response if agent fails
    const fallbackResponses = [
      "I'm having trouble connecting to my search tools right now. Based on what I know, the Xbox handheld console is expected to feature custom AMD hardware for optimal gaming performance on the go!",
      "Sorry, I'm experiencing some technical difficulties with my research capabilities. However, the Xbox handheld is rumored to support Xbox Game Pass natively, giving you access to hundreds of games instantly.",
      "I'm temporarily unable to access my search tools. From leaked information, the device might have excellent battery life, potentially 6-8 hours for most games.",
    ];
    
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return NextResponse.json({ 
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Xbox Handheld Gaming Console ReAct Agent API is running',
    status: 'healthy',
    model: 'GPT-4',
    features: ['ReAct Agent', 'Chat History', 'Tavily Search', 'Xbox Gaming Expertise'],
    tools: ['TavilySearchResults'],
  });
}
