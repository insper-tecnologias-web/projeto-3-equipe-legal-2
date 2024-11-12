'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Clock() {
  const router = useRouter();
  const [time, setTime] = useState(60);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push('/mudar');
    }, 60000);

    return () => {
      clearInterval(timerId);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="font-semibold pt-9 text-xl text-center border-2 border-zinc-700 min-w-[6rem] min-h-[6rem] rounded-full">
      {time}
    </div>
  );
}
