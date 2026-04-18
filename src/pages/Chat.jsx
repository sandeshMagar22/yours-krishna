import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { sendToLLM, getWelcomeMessage, getSuggestionChips } from '../utils/aiResponder';

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderMessageText(text) {
    return text.split('\n').map((line, i) => {
        // Split by links, bold, or italic
        const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
        const rendered = parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                return <em key={j}>{part.slice(1, -1)}</em>;
            }
            const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
                return <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--saffron-light)', textDecoration: 'underline' }}>{linkMatch[1]}</a>;
            }
            return part;
        });
        return (
            <React.Fragment key={i}>
                {rendered}
                {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        );
    });
}

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: getWelcomeMessage(),
            time: new Date(),
            isLLM: false,
        }
    ]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingText, setStreamingText] = useState('');
    const [suggestions, setSuggestions] = useState(() => getSuggestionChips());
    const [lastModel, setLastModel] = useState(null);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingText, isStreaming]);

    const handleSend = async (text) => {
        const trimmed = (text || input).trim();
        if (!trimmed || isStreaming) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: trimmed,
            time: new Date(),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsStreaming(true);
        setStreamingText('');
        setSuggestions([]);
        setLastModel(null);

        if (textareaRef.current) {
            textareaRef.current.style.height = '24px';
        }

        try {
            const conversationHistory = updatedMessages.map(m => ({
                sender: m.sender,
                text: m.text,
            }));

            const result = await sendToLLM(conversationHistory, (partialText) => {
                setStreamingText(partialText);
            });

            const responseText = typeof result === 'string' ? result : result.text;
            const isLLM = typeof result === 'object' ? result.isLLM : false;
            const model = typeof result === 'object' ? result.model : null;

            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: responseText,
                time: new Date(),
                isLLM: isLLM,
            };

            setMessages(prev => [...prev, aiMsg]);
            setStreamingText('');
            setLastModel(model);
            setSuggestions(getSuggestionChips(responseText));
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "Forgive me, dear one — my voice was briefly lost in the cosmic winds. Please try once more. I am here. 🙏",
                time: new Date(),
                isLLM: false,
            };
            setMessages(prev => [...prev, errorMsg]);
            setSuggestions(getSuggestionChips());
        } finally {
            setIsStreaming(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTextareaChange = (e) => {
        setInput(e.target.value);
        e.target.style.height = '24px';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    };

    const handleSuggestionClick = (text) => {
        handleSend(text);
    };

    return (
        <div className="chat-page">
            {/* Messages */}
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble chat-bubble-${msg.sender}`}>
                        {msg.sender === 'ai' && (
                            <div className="chat-bubble-avatar">🦚</div>
                        )}
                        <div>{renderMessageText(msg.text)}</div>
                        <div className="chat-bubble-meta">
                            <span className="chat-bubble-time">{formatTime(msg.time)}</span>
                            {msg.sender === 'ai' && msg.isLLM && (
                                <span className="chat-llm-badge">✨ Live</span>
                            )}
                        </div>
                    </div>
                ))}

                {/* Streaming response */}
                {isStreaming && streamingText && (
                    <div className="chat-bubble chat-bubble-ai chat-bubble-streaming">
                        <div className="chat-bubble-avatar">🦚</div>
                        <div>{renderMessageText(streamingText)}</div>
                        <span className="chat-llm-badge streaming">✨ Krishna is speaking...</span>
                    </div>
                )}

                {/* Typing indicator */}
                {isStreaming && !streamingText && (
                    <div className="typing-indicator">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <span className="typing-label">Krishna is listening...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {suggestions.length > 0 && !isStreaming && (
                <div className="suggestion-chips-wrapper">
                    <div className="suggestion-chips-label">
                        <Sparkles size={14} /> You might want to ask Krishna:
                    </div>
                    <div className="suggestion-chips">
                        {suggestions.map((chip, i) => (
                            <button
                                key={i}
                                className="suggestion-chip"
                                onClick={() => handleSuggestionClick(chip.text)}
                            >
                                {chip.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="chat-input-wrapper">
                <div className="chat-input-container">
                    <textarea
                        ref={textareaRef}
                        className="chat-input"
                        placeholder="Speak to Krishna... share what is in your heart..."
                        value={input}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={isStreaming}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isStreaming}
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="chat-disclaimer">
                    🛡️ This is an AI companion inspired by Krishna's wisdom — not a replacement for professional care.
                    If you're in crisis, please reach out to a professional.
                </div>
            </div>
        </div>
    );
}
