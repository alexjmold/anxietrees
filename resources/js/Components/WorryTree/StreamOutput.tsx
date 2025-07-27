import { AnimatePresence, motion } from 'motion/react';

export function StreamOutput({ data }: { data: string }) {
    const chars = data.split('');

    return (
        <AnimatePresence>
            {data && (
                <motion.div
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    className="rounded-2xl bg-white p-3 text-left transition-all"
                >
                    <p>
                        {chars.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
