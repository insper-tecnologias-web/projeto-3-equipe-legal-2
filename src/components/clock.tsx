'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Clock() {
  const router = useRouter();
  const [time, setTime] = useState(60);

  useEffect(() => {
    setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    setTimeout(() => {
      router.push('/');
    }, 10000);
  }, []);

  return (
    <div className="font-semibold pt-9 text-xl text-center border-2 border-zinc-700 min-w-[6rem] min-h-[6rem] rounded-full">
      {time}
    </div>
  );
}
