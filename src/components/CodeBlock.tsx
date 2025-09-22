import React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <pre className={`language-${language}`}>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.javascript,
            language
          ),
        }}
      />
    </pre>
  );
};

export default CodeBlock;
