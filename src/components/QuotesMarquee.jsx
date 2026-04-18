import React from 'react';
import { motivationalQuotes } from '../data/content';

export default function QuotesMarquee() {
    const doubled = [...motivationalQuotes, ...motivationalQuotes];

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {doubled.map((q, i) => (
                    <React.Fragment key={i}>
                        <span className="marquee-item">
                            ✦ &ldquo;{q.text}&rdquo; — {q.author}
                        </span>
                        <span className="marquee-separator" />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
