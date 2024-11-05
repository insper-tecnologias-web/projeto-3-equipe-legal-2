import { useState } from "react";

export default function InviteButton({ url }: { url: string }) {
    const [copiou ,setCopiou] = useState(false);
    const copia = () =>{
        navigator.clipboard.writeText(url);
        setCopiou(!copiou);
    };
    return ( 
        <>
            {
                copiou ? 
                // (<p className="motion-safe:animate-bounce w-[220px] h-[220px] border-2 border-zinc-900 flex items-center justify-center p-4 font-semibold text-xl">Link copiado!</p>): 
                (<>
                    <button className="w-[220px] h-[220px] border-2 border-zinc-900 flex items-center justify-center p-4 font-semibold text-xl hover:underline">Convidar</button>
                    <div className="animate-slide-linear p-4 font-semibold text-xl text-zinc-600" onAnimationEnd={copia}>
                        Copiado
                    </div>
                </>): 
                (<button className="w-[220px] h-[220px] border-2 border-zinc-900 flex items-center justify-center p-4 font-semibold text-xl hover:underline" onClick={copia}>Convidar</button>)
            }
        </>
    ); 
}
