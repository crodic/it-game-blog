'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContributeSchema, contributeSchema } from '@/validations/contribute.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sendContribution } from '../actions';
import { toast } from '@/hooks/use-toast';

export default function ContactForm() {
    const form = useForm<ContributeSchema>({
        resolver: zodResolver(contributeSchema),
        defaultValues: {
            email: '',
            content: '',
        },
    });

    const onSubmit = async (values: ContributeSchema) => {
        const result = await sendContribution(values);
        if (result.status === 200) {
            toast({
                description: result.message,
                variant: 'default',
            });
            form.reset();
        } else {
            toast({
                description: result.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="font-semibold text-secondary-foreground text-2xl">📩 Đóng góp ý kiến về nội dung</h2>
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle>Gửi ý kiến của bạn cho chúng tôi.</CardTitle>
                    <CardDescription>Chúng tôi sẽ đọc và trả lời bạn sớm nhất có thể.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ý kiến</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Gửi</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
