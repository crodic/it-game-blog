/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { categorySchema, CategorySchema } from '@/validations/category.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createCategory } from '../actions';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCategoryFormState } from '@/services/stores/category-form-state';
import { useEffect } from 'react';
import { useUpdateCategoryMutation } from '../mutations';

export default function CategoryForm() {
    const isOpen = useCategoryFormState((state) => state.isOpen);
    const editData = useCategoryFormState((state) => state.editData);
    const openForm = useCategoryFormState((state) => state.open);
    const closeForm = useCategoryFormState((state) => state.close);
    const form = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            description: '',
            color: '#000000',
        },
    });
    const { mutateAsync } = useMutation({
        mutationFn: createCategory,
    });
    const { mutateAsync: updateCategory } = useUpdateCategoryMutation();
    const queryClient = useQueryClient();

    const onSubmit = async (values: CategorySchema) => {
        if (editData) {
            const { error, data } = await updateCategory({ id: editData.id, values });
            if (error) {
                toast({
                    title: 'Lỗi!!!',
                    description: error,
                    variant: 'destructive',
                });
            }
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: ['categories'],
                });
                closeForm();
                form.reset({
                    color: '#000000',
                    description: '',
                    name: '',
                });
                toast({
                    title: 'Thành công!',
                    description: 'Danh mục ' + data.name + ' đã được cập nhật thành công',
                    variant: 'default',
                });
            }
        } else {
            const { error, data } = await mutateAsync(values);
            if (error) {
                toast({
                    title: 'Lỗi!!!',
                    description: error,
                    variant: 'destructive',
                });
            }

            if (data) {
                queryClient.invalidateQueries({
                    queryKey: ['categories'],
                });
                closeForm();
                form.reset({
                    color: '#000000',
                    description: '',
                    name: '',
                });
                toast({
                    title: 'Thành công!',
                    description: 'Danh mục ' + data.name + ' đa da thành công',
                    variant: 'default',
                });
            }
        }
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            openForm();
        } else {
            closeForm();
            form.reset({
                color: '#000000',
                description: '',
                name: '',
            });
        }
    };

    useEffect(() => {
        if (editData) {
            form.reset({
                name: editData.name,
                description: editData.description as string,
                color: editData.color,
            });
        }
    }, [editData, form]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="size-4" />
                    <span>Thêm Danh Mục</span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                aria-describedby="dialog-category"
                aria-description="dialog-category"
            >
                <DialogDescription className="sr-only">Danh mục cho các bài viết</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Danh Mục</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên danh mục</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tên danh mục..." {...field} />
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
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Nhập mô tả..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="color"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Màu sắc</FormLabel>
                                        <FormControl>
                                            <Input className="w-[50px]" type="color" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Huỷ bỏ
                                </Button>
                            </DialogClose>

                            <Button type="submit">Lưu</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
