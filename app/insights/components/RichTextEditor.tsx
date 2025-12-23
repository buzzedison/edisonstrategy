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
        image: function (this: any) {
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
          border-bottom: 1px solid #F5F5F4 !important;
          background-color: #FAFAF9;
          padding: 12px 20px !important;
        }
        
        .ql-container {
          border: none !important;
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          line-height: 1.7;
        }
        
        .ql-editor {
          min-height: 500px;
          padding: 40px 60px;
          color: #262626;
        }
        
        .ql-editor.ql-blank::before {
          color: #A8A29E;
          font-style: italic;
          left: 60px;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar button:focus,
        .ql-toolbar button.ql-active {
          color: #D4AF37 !important;
        }
        
        .ql-toolbar .ql-stroke {
          stroke: #57534E;
        }
        
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #D4AF37;
        }
        
        .ql-editor h1, .ql-editor h2, .ql-editor h3 {
          font-family: 'Playfair Display', serif;
          margin-bottom: 1.5rem;
          color: #262626;
        }

        .ql-editor h1 { font-size: 3rem; font-weight: 500; }
        .ql-editor h2 { font-size: 2.25rem; font-weight: 500; margin-top: 2rem; }
        .ql-editor h3 { font-size: 1.75rem; font-weight: 500; margin-top: 1.5rem; }
        
        .ql-editor p {
          margin-bottom: 1.25rem;
          font-weight: 300;
        }
        
        .ql-editor blockquote {
          border-left: 3px solid #D4AF37;
          background-color: #FAFAF9;
          padding: 2rem 3rem;
          margin: 3rem 0;
          font-style: italic;
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: #57534E;
        }

        .ql-editor img {
          border-radius: 2rem;
          margin: 3rem 0;
          box-shadow: 0 4px 20px -10px rgba(0,0,0,0.1);
          transition: all 0.5s ease;
        }
        
        .ql-editor img:hover {
          transform: scale(1.01);
          box-shadow: 0 10px 30px -15px rgba(0,0,0,0.15);
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
