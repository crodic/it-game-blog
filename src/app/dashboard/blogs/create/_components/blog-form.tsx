'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { blogSchema, BlogSchema } from '@/validations/blog.schema';
import { useForm } from 'react-hook-form';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/apis/categories';
import { useRouter } from 'next/navigation';
import { createBlog } from '../actions';
import ImagePreview from '@/components/image-preview';
import { TagsInput } from '@/components/tags-input';

const TinyMiceEditor = dynamic(() => import('@/components/tiny-editor'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
});

export default function BlogForm() {
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
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
    const { data } = useQuery({ queryKey: ['categories'], queryFn: getCategories });

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
            router.push('/dashboard/blogs');
        } else {
            toast({
                title: 'Lỗi!!!',
                description: error,
                variant: 'destructive',
            });
        }
    };

    const handleRemovePreviewImage = () => {
        setPreviewImage(null);
        form.setValue('thumbnail', '');
    };

    useEffect(() => {
        const alertBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', alertBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', alertBeforeUnload);
        };
    }, []);

    return (
        <Form {...form}>
            <form className="grid sm:grid-cols-[1fr_400px] grid-cols-1 gap-8" onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="uppercase">Bài Viết</CardTitle>
                        <CardDescription>Nhập đủ các nội dung yêu cầu để có thể tạo bài viết</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô Tả Bài Viết</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            disabled={isLoadingForm}
                                            placeholder="Nhập mô tả..."
                                            {...field}
                                        />
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
                                        <ImagePreview image={previewImage} removeCallback={handleRemovePreviewImage} />
                                    )}
                                    <FormControl>
                                        <div className="flex gap-4">
                                            {!previewImage && (
                                                <CldUploadWidget
                                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                                                    onSuccess={(result, { close }) => {
                                                        field.onChange(
                                                            (result.info as CloudinaryUploadWidgetInfo)?.secure_url
                                                        );
                                                        setPreviewImage(
                                                            (result.info as CloudinaryUploadWidgetInfo)?.secure_url
                                                        );
                                                        close();
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
                                            )}
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
                    </CardContent>
                </Card>
                <Card className="sticky top-10 h-max rounded-none">
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
                                                    <SelectValue placeholder="Chọn danh mục" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data &&
                                                        data.map((category) => (
                                                            <SelectItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
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
                                            <TagsInput
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="enter your used tech"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="isPublished"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>Trạng Thái</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-2 items-center">
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                <span>{field.value ? 'Công khai' : 'Không công khai'}</span>
                                            </div>
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
