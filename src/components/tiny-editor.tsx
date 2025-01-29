/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMiceEditorProps {
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
}

export default function TinyMiceEditor({ onChange, value, disabled }: TinyMiceEditorProps) {
    const editorRef = useRef<any>(null);
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
                    }
                }
            };

            input.click();
        }
    };

    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue=""
            value={value}
            onEditorChange={(content) => {
                console.log('Content was updated:', content);
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
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                    'linkchecker',
                ],
                toolbar:
                    'undo redo | blocks | image ' +
                    'bold italic underline forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                file_picker_callback: filePickerCallback,
            }}
        />
    );
}
