import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Blog } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: 'title',
        header: 'Tên Bài Viết',
        cell: ({ row }) => (
            <a className="hover:text-primary" href={`/blogs/${row.original.id}`} target="_blank">
                {row.original.title.length > 50 ? row.original.title.slice(0, 50) + '...' : row.original.title}
            </a>
        ),
    },
    {
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => (
            <Image
                src={row.original.thumbnail}
                alt={row.original.title}
                width={500}
                height={500}
                className="object-cover aspect-square object-top w-full"
            />
        ),
        size: 100,
    },
    {
        accessorKey: 'description',
        header: 'Mô Tả',
        size: 200,
        enableHiding: true,
        cell: ({ row }) =>
            row.original.title.length > 100 ? row.original.title.slice(0, 100) + '...' : row.original.title,
    },
    {
        accessorKey: 'isPublished',
        header: 'Công Khai',
        cell: ({ row }) => (row.original.isPublished ? 'Yes' : 'No'),
    },
    {
        accessorKey: 'views',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lượt Xem" />,
        cell: ({ row }) => row.original.views,
        maxSize: 100,
        enableSorting: true,
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày Đăng',
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString('vi-VN'),
    },
    {
        accessorKey: 'updatedAt',
        header: 'Cập Nhật Gần Nhất',
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString('vi-VN'),
    },
];
