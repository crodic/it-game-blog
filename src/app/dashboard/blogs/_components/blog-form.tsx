'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { blogSchema, BlogSchema } from '@/validations/blog.schema';
import { useForm } from 'react-hook-form';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import TinyMiceEditor from '@/components/tiny-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TagInput, Tag } from 'emblor';
import dynamic from 'next/dynamic';

const TinyMiceEditor = dynamic(() => import('@/components/tiny-editor'), { loading: () => <div>Loading...</div> });

export default function BlogForm() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const form = useForm<BlogSchema>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            content: '',
            categoryId: '',
            isPublished: true,
            tags: [],
            thumbnail: '',
        },
    });

    const onSubmit = async (values: BlogSchema) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form className="grid sm:grid-cols-[1fr_400px] grid-cols-1 gap-8" onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-4">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tiêu Đề Bài Viết</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tiêu đề..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="thumbnail"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                {previewImage && (
                                    <div className="relative w-[200px] aspect-square">
                                        <Image
                                            src={previewImage}
                                            alt="preview"
                                            fill
                                            className="object-cover h-full w-full object-top"
                                        />
                                    </div>
                                )}
                                <FormControl>
                                    <div className="flex gap-4">
                                        <Input className="hidden" placeholder="Nhập link..." {...field} />
                                        <CldUploadWidget
                                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                                            onSuccess={(result) => {
                                                field.onChange((result.info as CloudinaryUploadWidgetInfo)?.secure_url);
                                                setPreviewImage(
                                                    (result.info as CloudinaryUploadWidgetInfo)?.secure_url
                                                );
                                            }}
                                            onError={(error) => {
                                                console.error(error);
                                            }}
                                        >
                                            {({ open }) => {
                                                return <Button onClick={() => open()}>Tải Lên Hình Ảnh</Button>;
                                            }}
                                        </CldUploadWidget>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="content"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội Dung Bài Viết</FormLabel>
                                <FormControl>
                                    {/* <Suspense fallback={<div>Loading...</div>}> */}
                                    <TinyMiceEditor onChange={field.onChange} value={field.value} />
                                    {/* </Suspense> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <Card className="sticky top-10 h-max">
                    <CardHeader>
                        <CardTitle>Danh Mục & Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                name="categoryId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Danh Mục</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">React</SelectItem>
                                                    <SelectItem value="2">Angular</SelectItem>
                                                    <SelectItem value="3">Vue</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="tags"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <TagInput
                                                {...field}
                                                tags={tags}
                                                placeholder="Nhập tag..."
                                                setTags={(newTags) => {
                                                    setTags(newTags);
                                                    form.setValue('tags', newTags as [Tag, ...Tag[]]);
                                                }}
                                                activeTagIndex={activeTagIndex}
                                                setActiveTagIndex={setActiveTagIndex}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Tạo Bài Viết</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
