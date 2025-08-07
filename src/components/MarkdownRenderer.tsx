import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  const { theme } = useTheme();
  const [copiedBlocks, setCopiedBlocks] = useState<Set<number>>(new Set());

  const copyToClipboard = async (text: string, blockIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBlocks(prev => new Set(prev).add(blockIndex));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockIndex);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Language detection and mapping
  const detectLanguage = (lang?: string): string => {
    if (!lang) return 'text';

    // Common language mappings
    const langMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'rb': 'ruby',
      'sh': 'bash',
      'yml': 'yaml',
      'md': 'markdown',
      'html': 'markup',
      'jsx': 'jsx',
      'tsx': 'tsx'
    };

    return langMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  const parseMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    // Split by code blocks first (```...```)
    const codeBlockRegex = /```([a-zA-Z]*)?[\r\n]?([\s\S]*?)```/g;
    const parts: { type: 'text' | 'codeblock'; content: string; language?: string }[] = [];
    
    let lastIndex = 0;
    let match;
    
    // Reset regex lastIndex to prevent infinite loops
    codeBlockRegex.lastIndex = 0;
    
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
        // Render code block with syntax highlighting
        const detectedLanguage = detectLanguage(part.language);
        const isDark = theme === 'dark';

        elements.push(
          <div key={`code-${partIndex}`} className="my-4 rounded-lg overflow-hidden shadow-sm border border-border/50">
            <div className="px-4 py-2 bg-muted border-b border-border/30 text-xs text-muted-foreground font-mono flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="capitalize">{part.language || detectedLanguage}</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(part.content, partIndex)}
                className="h-6 w-6 p-0 hover:bg-muted-foreground/10"
              >
                {copiedBlocks.has(partIndex) ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <div className="relative">
              <SyntaxHighlighter
                language={detectedLanguage}
                style={isDark ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  padding: '16px',
                  background: 'transparent',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                  }
                }}
              >
                {part.content}
              </SyntaxHighlighter>
            </div>
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
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
    const elements: JSX.Element[] = [];
    
    if (paragraphs.length === 0) {
      paragraphs.push(text);
    }
    
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return;
      
      // Check if it's a list item
      const lines = trimmedParagraph.split('\n');
      const hasListItems = lines.some(line => /^([*-]|\d+\.)\s+/.test(line));
      
      if (hasListItems) {
        // Process as list
        const listItems: JSX.Element[] = [];
        let currentItem = '';
        let isNumbered = false;
        
        lines.forEach((line, lineIndex) => {
          const itemMatch = line.match(/^([*-]|\d+\.)\s+(.*)/);
          if (itemMatch) {
            if (currentItem) {
              listItems.push(
                <li key={`item-${paragraphIndex}-${listItems.length}`} className="mb-1">
                  {parseInlineFormatting(currentItem, `${baseIndex}-${paragraphIndex}-${listItems.length}`)}
                </li>
              );
            }
            currentItem = itemMatch[2];
            isNumbered = /^\d+\./.test(itemMatch[1]);
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
    
    // Process inline code first (`code`)
    const inlineCodeRegex = /`([^`]+)`/g;
    const codeParts: { start: number; end: number; content: string }[] = [];
    let match;
    
    // Reset regex to prevent infinite loops
    inlineCodeRegex.lastIndex = 0;
    
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
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    let elementIndex = 0;

    // Reset regex to prevent infinite loops
    boldRegex.lastIndex = 0;

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
