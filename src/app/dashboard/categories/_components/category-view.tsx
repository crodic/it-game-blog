/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { columns } from './columns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '@/services/apis/categories';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/table-pagination';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useDeleteCategoryMutation } from '../mutations';
import { toast } from '@/hooks/use-toast';
import { Category } from '@prisma/client';
import { useCategoryFormState } from '@/services/stores/category-form-state';

export default function CategoryView() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
    const queryClient = useQueryClient();
    const { mutateAsync } = useDeleteCategoryMutation();
    const { setEditData, open } = useCategoryFormState();

    const handleDelete = (row: Row<Category>) => {
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
                        queryKey: ['categories'],
                    });
                    toast({
                        title: 'Thành công! ',
                        description: 'Xoá danh mục ' + row.original.name + ' thành công',
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
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        open();
                                        setEditData(row.original);
                                    }}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Sửa danh mục
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={() => handleDelete(row)}>
                                    <Trash className="mr-2 h-4 w-4 text-destructive" />
                                    Xoá danh mục
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        data: data ?? [],
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </>
    );
}
