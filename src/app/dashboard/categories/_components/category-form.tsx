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
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

export default function CategoryForm() {
    const [open, setOpen] = useState(false);
    const form = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            description: '',
            color: '#000000',
        },
    });

    const onSubmit = async (values: CategorySchema) => {
        const { error, data } = await createCategory(values);
        if (error) {
            toast({
                title: 'Lỗi!!!',
                description: error,
                variant: 'destructive',
            });
        }

        if (data) {
            onClose();
            toast({
                title: 'Thành công!',
                description: 'Danh mục ' + data.name + ' đa da thành công',
                variant: 'default',
            });
        }
    };

    const onClose = () => {
        form.reset({});
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open);
                if (!open) {
                    form.reset({});
                }
            }}
        >
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
