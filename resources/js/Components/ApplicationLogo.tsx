import { cn } from '@/lib/utils';

export default function ApplicationLogo({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'h-12 w-12 rounded-2xl bg-emerald-400 p-3',
                className,
            )}
        >
            <svg
                width="95"
                height="95"
                viewBox="0 0 95 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full"
            >
                <path
                    d="M15.3113 20.5789C30.1042 5.78503 56.1295 -1.6824 88.3086 0.320192L89.07 0.369352L89.2094 0.380199C92.1285 0.642719 94.4349 2.99205 94.6308 5.9304C96.7994 38.462 89.332 64.7831 74.4225 79.6934C66.8745 87.2416 57.4913 91.7523 46.9071 92.4477C37.6585 93.0554 27.8617 90.7296 17.9172 85.5298L10.1927 93.2518C7.86036 95.5833 4.07953 95.5827 1.74805 93.2502C-0.583394 90.9177 -0.582558 87.1367 1.7498 84.8051L9.47303 77.0844C4.27461 67.1402 1.94974 57.3438 2.5575 48.0955C3.25307 37.5109 7.76349 28.1272 15.3113 20.5789ZM82.9787 12.0215C54.9172 11.0986 34.567 18.2122 23.7561 29.0238C18.1094 34.6709 14.9668 41.3857 14.4744 48.8787C14.0972 54.619 15.2613 61.0913 18.4077 68.1495L35.5275 51.0265C37.8592 48.6943 41.64 48.694 43.9721 51.0258C46.3042 53.3577 46.3045 57.1387 43.9728 59.4709L26.8519 76.5951C33.9107 79.7426 40.3835 80.9075 46.1241 80.5303C53.6167 80.038 60.331 76.8954 65.9778 71.2483C76.7888 60.4367 83.9017 40.085 82.9787 12.0215Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
}
