/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/apis/categories';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/table-pagination';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

export default function CategoryView() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
    const table = useReactTable({
        columns: columns,
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
