// app/insights/components/RichTextEditor.tsx

"use client";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  return (
    <div className="mt-1">
      <ReactQuill
        theme="snow"
        onChange={onChange}
        className="bg-white"
      />
    </div>
  );
};

export default RichTextEditor;
