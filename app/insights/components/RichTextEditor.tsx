// app/insights/components/RichTextEditor.tsx

"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  onChange, 
  value = '', 
  placeholder = "Start writing your post..." 
}) => {
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: function(this: any) {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = () => {
            const file = input.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const range = this.quill.getSelection();
                this.quill.insertEmbed(range.index, 'image', e.target?.result);
              };
              reader.readAsDataURL(file);
            }
          };
        }
      }
    },
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: true
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'blockquote', 'code-block',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <style jsx global>{`
        .ql-toolbar {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background-color: #f9fafb;
        }
        
        .ql-container {
          border: none !important;
          font-family: inherit;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .ql-editor {
          min-height: 300px;
          padding: 20px;
          color: #374151;
        }
        
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
        }
        
        .ql-toolbar .ql-picker-label:hover,
        .ql-toolbar .ql-picker-item:hover {
          color: #2563eb;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar button:focus {
          color: #2563eb;
        }
        
        .ql-toolbar button.ql-active,
        .ql-toolbar .ql-picker-label.ql-active {
          color: #2563eb;
        }
        
        .ql-toolbar .ql-stroke {
          stroke: currentColor;
        }
        
        .ql-toolbar .ql-fill {
          fill: currentColor;
        }
        
        .ql-editor h1 {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 1.5rem 0 1rem 0;
        }
        
        .ql-editor h2 {
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 1.25rem 0 0.75rem 0;
        }
        
        .ql-editor h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 1rem 0 0.5rem 0;
        }
        
        .ql-editor h4 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0.75rem 0 0.5rem 0;
        }
        
        .ql-editor h5 {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0.75rem 0 0.25rem 0;
        }
        
        .ql-editor h6 {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0.5rem 0 0.25rem 0;
        }
        
        .ql-editor p {
          margin: 0 0 1rem 0;
          line-height: 1.7;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #2563eb;
          background-color: #f8fafc;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #475569;
        }
        
        .ql-editor code {
          background-color: #f1f5f9;
          color: #e11d48;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        
        .ql-editor pre {
          background-color: #1e293b;
          color: #f1f5f9;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .ql-editor ul, .ql-editor ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .ql-editor li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .ql-editor a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .ql-editor a:hover {
          color: #1d4ed8;
        }
      `}</style>
      
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ backgroundColor: 'white' }}
      />
    </div>
  );
};

export default RichTextEditor;
