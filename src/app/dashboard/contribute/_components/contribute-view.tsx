'use client';

import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/table-pagination';
import { getContributes } from '@/services/apis/contribute';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Eye, Trash } from 'lucide-react';
import { deleteContribute } from '../actions';
import { toast } from '@/hooks/use-toast';
import ContributeDetail from './contribute-detail';

export default function ContributeView() {
    const [contributeId, setContributeId] = useState<string>();
    const [openModal, setOpenModal] = useState(false);
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['contributes'],
        queryFn: getContributes,
    });

    const { mutateAsync: deleteMutationContribute } = useMutation({
        mutationFn: deleteContribute,
    });

    const handleDelete = async (id: string) => {
        await deleteMutationContribute(id, {
            onSuccess: (data) => {
                if (data.error) {
                    toast({
                        title: data.error,
                        variant: 'destructive',
                    });
                } else {
                    queryClient.invalidateQueries({
                        queryKey: ['contributes'],
                    });
                    toast({
                        title: 'Xoá ý kiến thành công',
                        variant: 'default',
                    });
                }
            },
        });
    };

    const table = useReactTable({
        data: data || [],
        columns: [
            ...columns,
            {
                id: 'actions',
                header: 'Thao tác',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                                setContributeId(row.original.id);
                                setOpenModal(true);
                            }}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDelete(row.original.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ),
            },
        ],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
            <ContributeDetail contributeId={contributeId} open={openModal} onOpenChange={setOpenModal} />
        </div>
    );
}
