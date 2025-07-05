import { Button } from '@/Components/ui/button';
import { WorryTreeStartResponse } from '@/types/worry-tree';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { easeOut, motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const worryTreeStartFormSchema = z.object({
    message: z.string().min(3).max(350),
});

type WorryTreeStartFormSchemaType = z.infer<typeof worryTreeStartFormSchema>;

type WorryTreeStartProps = {
    onComplete: (data: WorryTreeStartResponse) => void;
};

export function WorryTreeStart({ onComplete }: WorryTreeStartProps) {
    const form = useForm<WorryTreeStartFormSchemaType>({
        resolver: zodResolver(worryTreeStartFormSchema),
        defaultValues: {
            message: '',
        },
    });

    const onSubmit = async ({ message }: WorryTreeStartFormSchemaType) => {
        const createTreeResponse = await axios.post(route('trees.store'));
        const {
            data: { id: tree },
        } = createTreeResponse;

        const generatorResponse = await axios.post<{
            response: WorryTreeStartResponse;
        }>(route('trees.generate', { tree }), { message });

        const {
            data: { response },
        } = generatorResponse;

        onComplete(response);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.p
                    className="text-xl font-bold"
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: easeOut,
                    }}
                >
                    What's on your mind?
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: easeOut,
                    }}
                >
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.7,
                        ease: easeOut,
                    }}
                >
                    <Button type="submit" loading={form.formState.isSubmitting}>
                        Start
                    </Button>
                </motion.div>
            </form>
        </Form>
    );
}
