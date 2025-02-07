'use client';

import { subscribe } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

export default function Hero() {
    const [state, action] = useFormState(subscribe, null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.message) {
            toast({
                title: 'Thành công!',
                description: state.message,
            });
        }
    }, [state]);

    return (
        <div className="flex justify-center items-center flex-col gap-3 py-24">
            <h4 className="text-xl font-semibold text-primary" style={{ fontFamily: 'var(--font-dancing-script)' }}>
                Animazing Blogs
            </h4>
            <h2 className="font-semibold text-4xl uppercase text-center">Front end and Game</h2>
            <p className="text-center">
                Blog chia sẽ về kiến thức lập trình front-end và thông tin về các tựa game hay hiện nay.
            </p>
            <div className="mt-8">
                <form
                    ref={formRef}
                    action={(data) => {
                        action(data);
                        formRef.current?.reset();
                    }}
                    className="flex justify-center items-start gap-3 flex-wrap"
                >
                    <div className="space-y-2">
                        <Input name="email" type="email" placeholder="Enter your email" className="w-80" />
                        {state?.error ? (
                            <p className="text-red-500 text-xs">{state.error}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Nhận thông báo khi có bài viết mới.</p>
                        )}
                    </div>
                    <Button type="submit">Đăng ký</Button>
                </form>
            </div>
        </div>
    );
}
