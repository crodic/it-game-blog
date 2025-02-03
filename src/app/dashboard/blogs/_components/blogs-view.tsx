'use client';

import { getAllBlogs } from '@/services/apis/blogs';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/table-pagination';

export default function BlogsView() {
    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: getAllBlogs,
    });

    const table = useReactTable({
        columns: columns,
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
