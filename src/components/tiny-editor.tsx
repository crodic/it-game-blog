/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMiceEditorProps {
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
    initialValue?: string;
}

export default function TinyMiceEditor({ onChange, value, disabled, initialValue = '' }: TinyMiceEditorProps) {
    const editorRef = useRef<any>(null);
    const [isUploading, setUploading] = useState(false);
    const filePickerCallback = (
        callback: (value: string, meta?: Record<string, any>) => void,
        value: string,
        meta: Record<string, any>
    ) => {
        if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = async function () {
                const file = (this as any).files[0];

                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // replace with your upload preset
                    try {
                        setUploading(true);
                        console.log('>>> Uploading image to Cloudinary...', isUploading);
                        const response = await fetch(
                            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // replace with your cloud name
                            {
                                method: 'POST',
                                body: formData,
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        const imageUrl = data.secure_url;

                        // Insert the uploaded image URL into TinyMCE
                        callback(imageUrl, { title: file.name });
                    } catch (error) {
                        console.error('Error uploading image to Cloudinary:', error);
                    } finally {
                        setUploading(false);
                        console.log('>>> Finished uploading image to Cloudinary...', isUploading);
                    }
                }
            };

            input.click();
        }
    };

    return (
        <>
            {isUploading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-[5000000]">
                    <div className="flex items-center gap-2 p-3 bg-white shadow-lg rounded">
                        <svg
                            className="animate-spin h-5 w-5 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Đang tải hình ảnh...</span>
                    </div>
                </div>
            )}
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={initialValue}
                value={value}
                onEditorChange={(content) => {
                    onChange(content);
                }}
                disabled={disabled}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'help',
                        'wordcount',
                        'linkchecker',
                        'codesample',
                    ],
                    toolbar:
                        'fullscreen | undo redo | blocks | image ' +
                        'bold italic underline forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help | codesample | media',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    codesample_languages: [
                        { text: 'HTML/XML', value: 'markup' },
                        { text: 'JavaScript', value: 'javascript' },
                        { text: 'CSS', value: 'css' },
                        { text: 'PHP', value: 'php' },
                        { text: 'Typescript', value: 'typescript' },
                    ],
                    file_picker_callback: filePickerCallback,
                }}
            />
        </>
    );
}
