import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  const parseMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    // Split by code blocks first (```...```)
    const codeBlockRegex = /```([a-zA-Z]*)?\\n?([\\s\\S]*?)```/g;
    const parts: { type: 'text' | 'codeblock'; content: string; language?: string }[] = [];
    
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      
      // Add code block
      parts.push({ 
        type: 'codeblock', 
        content: match[2].trim(), 
        language: match[1] || undefined 
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }
    
    // If no code blocks found, treat entire content as text
    if (parts.length === 0) {
      parts.push({ type: 'text', content: text });
    }

    // Process each part
    parts.forEach((part, partIndex) => {
      if (part.type === 'codeblock') {
        // Render code block
        elements.push(
          <div key={`code-${partIndex}`} className="my-4 rounded-lg bg-muted/80 border border-border/50 overflow-hidden shadow-sm">
            <div className="px-4 py-2 bg-muted border-b border-border/30 text-xs text-muted-foreground font-mono flex items-center justify-between">
              <span>{part.language || 'Code'}</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="font-mono text-foreground/90 leading-relaxed block">
                {part.content}
              </code>
            </pre>
          </div>
        );
      } else {
        // Process text content
        const textElements = parseTextContent(part.content, partIndex);
        elements.push(...textElements);
      }
    });

    return elements;
  };

  const parseTextContent = (text: string, baseIndex: number): JSX.Element[] => {
    // Split text into paragraphs
    const paragraphs = text.split(/\\n\\s*\\n/).filter(p => p.trim());
    const elements: JSX.Element[] = [];
    
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return;
      
      // Check if it's a list item
      const listItemMatch = trimmedParagraph.match(/^([*-]|\\d+\\.)\\s+(.*)/);
      const lines = trimmedParagraph.split('\\n');
      
      if (listItemMatch || lines.some(line => line.match(/^([*-]|\\d+\\.)\\s+/))) {
        // Process as list
        const listItems: JSX.Element[] = [];
        let currentItem = '';
        
        lines.forEach((line, lineIndex) => {
          const itemMatch = line.match(/^([*-]|\\d+\\.)\\s+(.*)/);
          if (itemMatch) {
            if (currentItem) {
              listItems.push(
                <li key={`item-${paragraphIndex}-${listItems.length}`} className="mb-1">
                  {parseInlineFormatting(currentItem, `${baseIndex}-${paragraphIndex}-${listItems.length}`)}
                </li>
              );
            }
            currentItem = itemMatch[2];
          } else if (line.trim()) {
            currentItem += ' ' + line.trim();
          }
        });
        
        if (currentItem) {
          listItems.push(
            <li key={`item-${paragraphIndex}-${listItems.length}`} className="mb-1">
              {parseInlineFormatting(currentItem, `${baseIndex}-${paragraphIndex}-${listItems.length}`)}
            </li>
          );
        }
        
        const isNumbered = lines[0]?.match(/^\\d+\\./);
        elements.push(
          <div key={`list-${baseIndex}-${paragraphIndex}`} className="my-3">
            {isNumbered ? (
              <ol className="list-decimal list-inside space-y-1 text-foreground/90">
                {listItems}
              </ol>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                {listItems}
              </ul>
            )}
          </div>
        );
      } else {
        // Process as regular paragraph
        elements.push(
          <p key={`para-${baseIndex}-${paragraphIndex}`} className="mb-4 last:mb-0 leading-relaxed text-foreground/90">
            {parseInlineFormatting(trimmedParagraph, `${baseIndex}-${paragraphIndex}`)}
          </p>
        );
      }
    });
    
    return elements;
  };
  
  const parseInlineFormatting = (text: string, baseKey: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let currentText = text;
    let elementIndex = 0;
    
    // Process inline code first (`code`)
    const inlineCodeRegex = /`([^`]+)`/g;
    const codeParts: { start: number; end: number; content: string }[] = [];
    let match;
    
    while ((match = inlineCodeRegex.exec(text)) !== null) {
      codeParts.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[1]
      });
    }
    
    // Split text around inline code
    const parts: { type: 'text' | 'inlinecode'; content: string }[] = [];
    let lastIndex = 0;
    
    codeParts.forEach(code => {
      if (code.start > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, code.start) });
      }
      parts.push({ type: 'inlinecode', content: code.content });
      lastIndex = code.end;
    });
    
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }
    
    if (parts.length === 0) {
      parts.push({ type: 'text', content: text });
    }
    
    // Process each part
    parts.forEach((part, partIndex) => {
      if (part.type === 'inlinecode') {
        elements.push(
          <code key={`${baseKey}-code-${partIndex}`} className="px-1.5 py-0.5 rounded bg-muted/80 text-sm font-mono text-foreground border border-border/30">
            {part.content}
          </code>
        );
      } else {
        // Process bold text in regular text
        const boldElements = parseBoldInText(part.content, `${baseKey}-${partIndex}`);
        elements.push(...boldElements);
      }
    });
    
    return elements;
  };
  
  const parseBoldInText = (text: string, baseKey: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const boldRegex = /\\*\\*(.*?)\\*\\*/g;
    let lastIndex = 0;
    let match;
    let elementIndex = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        if (beforeText) {
          elements.push(
            <span key={`${baseKey}-text-${elementIndex++}`} className="whitespace-pre-wrap">
              {beforeText}
            </span>
          );
        }
      }

      // Add bold text
      elements.push(
        <strong key={`${baseKey}-bold-${elementIndex++}`} className="font-semibold text-foreground">
          {match[1]}
        </strong>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      if (remainingText) {
        elements.push(
          <span key={`${baseKey}-text-${elementIndex++}`} className="whitespace-pre-wrap">
            {remainingText}
          </span>
        );
      }
    }

    // If no bold text found, return the original text
    if (elements.length === 0) {
      elements.push(
        <span key={`${baseKey}-text-0`} className="whitespace-pre-wrap">
          {text}
        </span>
      );
    }

    return elements;
  };

  const parsedElements = parseMarkdown(content);

  return (
    <div className={`max-w-none ${className}`}>
      <div className="text-sm lg:text-base leading-relaxed">
        {parsedElements.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};
