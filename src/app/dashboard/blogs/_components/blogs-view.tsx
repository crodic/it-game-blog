'use client';

import { getAllBlogs } from '@/services/apis/blogs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, Row, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/table-pagination';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useDeleteBlogMutation } from '../mutations';
import { toast } from '@/hooks/use-toast';
import { Blog } from '@prisma/client';

export default function BlogsView() {
    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: getAllBlogs,
    });
    const queryClient = useQueryClient();
    const { mutateAsync } = useDeleteBlogMutation();

    const handleDelete = (row: Row<Blog>) => {
        mutateAsync(row.original.id, {
            onSuccess: (data) => {
                if (data.error) {
                    toast({
                        title: 'Lỗi! ',
                        description: data.error,
                        variant: 'destructive',
                    });
                } else {
                    queryClient.invalidateQueries({
                        queryKey: ['blogs'],
                    });
                    toast({
                        title: 'Thành công! ',
                        description: 'Xoá bài viết ' + row.original.title + ' thành công',
                    });
                }
            },
        });
    };

    const table = useReactTable({
        columns: [
            ...columns,
            {
                id: 'actions',
                size: 50,
                cell: ({ row }) => {
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Sửa bài viết
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={() => handleDelete(row)}>
                                    <Trash className="mr-2 h-4 w-4 text-destructive" />
                                    Xoá bài viết
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        data: data ?? [],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </>
    );
}
