'use client';

import { getAllBlogs } from '@/services/apis/blogs';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';
import { DataTable } from '@/components/data-table/data-table';

export default function BlogsView() {
    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: getAllBlogs,
    });

    const table = useReactTable({
        columns: columns,
        data: data ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <DataTable table={table} />
        </>
    );
}
