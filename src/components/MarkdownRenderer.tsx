import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  const parseMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let currentIndex = 0;

    // Split by code blocks first (```...```)
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const codeBlocks: { start: number; end: number; content: string; language?: string }[] = [];
    
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      codeBlocks.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[1].trim(),
        language: undefined // We could detect language here if needed
      });
    }

    // Process text between code blocks
    let textParts: { start: number; end: number; isCodeBlock: boolean; content: string }[] = [];
    
    if (codeBlocks.length === 0) {
      textParts.push({ start: 0, end: text.length, isCodeBlock: false, content: text });
    } else {
      // Add text before first code block
      if (codeBlocks[0].start > 0) {
        textParts.push({
          start: 0,
          end: codeBlocks[0].start,
          isCodeBlock: false,
          content: text.substring(0, codeBlocks[0].start)
        });
      }

      // Add code blocks and text between them
      codeBlocks.forEach((block, index) => {
        // Add the code block
        textParts.push({
          start: block.start,
          end: block.end,
          isCodeBlock: true,
          content: block.content
        });

        // Add text after this code block (if not the last one)
        const nextBlock = codeBlocks[index + 1];
        if (nextBlock) {
          textParts.push({
            start: block.end,
            end: nextBlock.start,
            isCodeBlock: false,
            content: text.substring(block.end, nextBlock.start)
          });
        } else if (block.end < text.length) {
          // Add text after the last code block
          textParts.push({
            start: block.end,
            end: text.length,
            isCodeBlock: false,
            content: text.substring(block.end)
          });
        }
      });
    }

    // Process each part
    textParts.forEach((part, partIndex) => {
      if (part.isCodeBlock) {
        // Render code block
        elements.push(
          <div key={`code-${partIndex}`} className="my-4 rounded-lg bg-muted/50 border overflow-hidden">
            <div className="px-4 py-2 bg-muted border-b text-xs text-muted-foreground font-mono">
              Code
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground leading-relaxed">
                {part.content}
              </code>
            </pre>
          </div>
        );
      } else {
        // Process bold text in regular text
        const boldElements = parseBoldText(part.content, partIndex);
        elements.push(...boldElements);
      }
    });

    return elements;
  };

  const parseBoldText = (text: string, baseIndex: number): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    let elementIndex = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        if (beforeText) {
          elements.push(
            <span key={`text-${baseIndex}-${elementIndex++}`} className="whitespace-pre-wrap">
              {beforeText}
            </span>
          );
        }
      }

      // Add bold text
      elements.push(
        <strong key={`bold-${baseIndex}-${elementIndex++}`} className="font-semibold text-foreground">
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
          <span key={`text-${baseIndex}-${elementIndex++}`} className="whitespace-pre-wrap">
            {remainingText}
          </span>
        );
      }
    }

    // If no bold text found, return the original text
    if (elements.length === 0) {
      elements.push(
        <span key={`text-${baseIndex}-0`} className="whitespace-pre-wrap">
          {text}
        </span>
      );
    }

    return elements;
  };

  const parsedElements = parseMarkdown(content);

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <div className="text-sm lg:text-base leading-relaxed">
        {parsedElements.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};
