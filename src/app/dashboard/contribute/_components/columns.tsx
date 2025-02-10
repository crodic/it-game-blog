import { Contributes } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Contributes>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'sendedAt',
        header: 'Gửi vào lúc',
        cell: ({ row }) => new Date(row.original.sendedAt).toLocaleString('vi-VN'),
    },
    {
        accessorKey: 'status',
        header: 'Trang Thái',
        cell: ({ row }) => (row.original.status ? 'Đã đọc' : 'Chưa đọc'),
    },
    {
        accessorKey: 'seenAt',
        header: 'Xem vào lúc',
        cell: ({ row }) => row.original.seenAt && new Date(row.original.seenAt).toLocaleString('vi-VN'),
    },
];
