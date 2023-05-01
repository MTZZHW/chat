import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { ReactNode } from 'react-markdown/lib/ast-to-react';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import ClipboardJS from 'clipboard';

type CodeBlockProps = {
  inline?: boolean;
  className?: string;
  children: ReactNode & ReactNode[];
};
function CodeBlock({ inline, className, children, ...props }: CodeBlockProps): JSX.Element {
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false);

  const match = /language-(\w+)/.exec(className || '');
  const code = String(children).replace(/\n$/, '');

  const handleCopyCode = (): void => {
    ClipboardJS.copy(code);

    setIsCodeCopied(true);
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  return !inline && match ? (
    <div>
      <Box
        bgcolor={grey[800]}
        padding="8px 16px"
        color="white"
        display="flex"
        justifyContent="space-between"
        sx={{ borderTopLeftRadius: '0.3em', borderTopRightRadius: '0.3em' }}
      >
        {match[1]}
        <span style={{ cursor: isCodeCopied ? 'auto' : 'pointer' }} onClick={handleCopyCode}>
          {isCodeCopied ? 'Copied' : 'Copy code'}
        </span>
      </Box>
      <SyntaxHighlighter
        {...props}
        style={atomDark}
        language={match[1]}
        PreTag="div"
        customStyle={{ marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  );
}

export default CodeBlock;