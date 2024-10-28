import { editor } from 'monaco-editor';
import React from 'react';

const Editor = ({ code, onChange }) => {
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (editorRef.current) {
      const _editor = editor.create(editorRef.current, {
        value: code,
        language: 'mdx',
        theme: 'vs-dark',
      });
      //   _editor.onDidChangeModelContent(() => {
      //     const value = _editor.getValue();
      //     onChange(value);
      //   });
      // 监听ctrl+s
      document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          const value = _editor.getValue();
          onChange(value);
          event.preventDefault();
          console.log('ctrl+s');
        }
      });
    }
  }, []);
  return <div ref={editorRef} style={{ height: '30vh', width: '100%' }}></div>;
};
export default Editor;
