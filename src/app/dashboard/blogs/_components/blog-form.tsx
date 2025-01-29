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
import { createBlog } from '../create/actions';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const TinyMiceEditor = dynamic(() => import('@/components/tiny-editor'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
});

export default function BlogForm() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const form = useForm<BlogSchema>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            content: '',
            categoriesId: '',
            isPublished: true,
            tags: [],
            thumbnail: '',
        },
    });

    const isLoadingForm = form.formState.isSubmitting;

    const onSubmit = async (values: BlogSchema) => {
        const { error } = await createBlog(values);
        if (!error) {
            form.reset();
            setPreviewImage(null);
            toast({
                title: 'Thành công!!!',
                variant: 'default',
            });
        } else {
            toast({
                title: 'Lỗi!!!',
                description: error,
                variant: 'destructive',
            });
        }
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
                                    <Input disabled={isLoadingForm} placeholder="Nhập tiêu đề..." {...field} />
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
                                                return (
                                                    <Button
                                                        disabled={isLoadingForm}
                                                        type="button"
                                                        onClick={() => open()}
                                                    >
                                                        Tải Lên Hình Ảnh
                                                    </Button>
                                                );
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
                                    <TinyMiceEditor
                                        disabled={isLoadingForm}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
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
                                name="categoriesId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Danh Mục</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={isLoadingForm}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
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
                                                disabled={isLoadingForm}
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
                        <Button className="w-full" type="submit" disabled={isLoadingForm}>
                            {isLoadingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Tạo Bài Viết'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
