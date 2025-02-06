'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { Edit } from 'lucide-react';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useState } from 'react';
import { changeAvatar } from '../actions';
import { toast } from '@/hooks/use-toast';

export default function AvatarUpload({ user }: { user: Omit<User, 'password'> }) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleChangeAvatar = async () => {
        if (!previewImage) return;

        const data = await changeAvatar(previewImage);

        if (data) {
            toast({
                title: 'Thành công!',
                description: 'Cập nhật avatar thanh cong',
            });
        } else {
            toast({
                title: 'Lỗi!',
                description: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex flex-col justify-center gap-4 flex-shrink w-max">
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                onSuccess={(result, { close }) => {
                    setPreviewImage((result.info as CloudinaryUploadWidgetInfo)?.secure_url);
                    close();
                }}
                onError={(error) => {
                    console.error(error);
                }}
            >
                {({ open }) => {
                    return (
                        <Avatar className="size-36 cursor-pointer relative" onClick={() => open()}>
                            <AvatarFallback>CN</AvatarFallback>
                            <AvatarImage src={previewImage || user.avatar || ''} alt={user.name} />
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-200/25 opacity-0 hover:opacity-100 flex justify-center items-center z-[1000]">
                                <Button size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </div>
                        </Avatar>
                    );
                }}
            </CldUploadWidget>
            {previewImage && <Button onClick={handleChangeAvatar}>Cập nhật</Button>}
        </div>
    );
}
