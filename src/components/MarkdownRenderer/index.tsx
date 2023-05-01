import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

type MarkdownProps = {
  children: string;
};

function Markdown({ children }: MarkdownProps): JSX.Element {
  return <ReactMarkdown components={{ code: CodeBlock }}>{children}</ReactMarkdown>;
}

export default Markdown;
