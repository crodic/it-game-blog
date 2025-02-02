import { Blog } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: 'title',
        header: 'Tên Bài Viết',
    },
    {
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => (
            <Image
                src={row.original.thumbnail}
                alt={row.original.title}
                width={100}
                height={100}
                className="object-cover aspect-square object-top w-full"
            />
        ),
        size: 100,
    },
    {
        accessorKey: 'description',
        header: 'Mô Tả',
        size: 200,
        cell: ({ row }) => row.original.description.slice(0, 100) + '...',
    },
    {
        accessorKey: 'isPublished',
        header: 'Công Khai',
        cell: ({ row }) => (row.original.isPublished ? 'Yes' : 'No'),
    },
    {
        accessorKey: 'views',
        header: 'Lượt Xem',
        cell: ({ row }) => row.original.views,
        maxSize: 100,
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
