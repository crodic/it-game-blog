import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Category>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
        accessorKey: 'name',
        header: 'Tên Danh Mục',
    },
    {
        accessorKey: 'description',
        header: 'Mô Tả',
    },
    {
        accessorKey: 'color',
        header: 'Màu Sắc',
        cell: ({ row }) => (
            <div className="size-4 mx-auto rounded-full" style={{ backgroundColor: row.original.color }} />
        ),
    },
    {
        accessorKey: 'createdAt',
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString('vi-VN'),
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày Tạo" />,
        enableSorting: true,
    },
    {
        accessorKey: 'updatedAt',
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString('vi-VN'),
        header: ({ column }) => <DataTableColumnHeader column={column} title="Cập Nhật Gần Đây" />,
        enableSorting: true,
    },
];
