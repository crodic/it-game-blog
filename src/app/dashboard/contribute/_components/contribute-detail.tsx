'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { getContribute, seenContribute } from '@/services/apis/contribute';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ContributeDetail({
    contributeId,
    open,
    onOpenChange,
}: {
    contributeId: string | undefined;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['contribute', contributeId],
        queryFn: () => getContribute(contributeId),
        enabled: !!contributeId,
    });

    const { mutateAsync } = useMutation({
        mutationFn: seenContribute,
    });

    const onSeen = async () => {
        await mutateAsync(contributeId, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['contributes'],
                });
                toast({
                    title: 'Đã xem',
                });
                onOpenChange(false);
            },
            onError: () => {
                toast({
                    title: 'Thất bại!',
                    description: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                    variant: 'destructive',
                });
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chi tiết</DialogTitle>
                    <DialogDescription>Ý kiến đóng góp của {data?.email}</DialogDescription>
                </DialogHeader>
                <p>{data?.content}</p>
                <DialogFooter>
                    <Button variant="default" onClick={onSeen}>
                        Đã đọc
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
