import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useFsFlag } from "@flagship.io/react-sdk"

export default function ProductRecs() {
    const [rec, setRec] = useState('')
    const ref = useRef(null)
    const [isLoading, setLoading] = useState(true)
    const flagProductRecsVal = useFsFlag("flagProductRecs")
    const flagProductRecs = flagProductRecsVal.getValue('2dd95ccd-103c-4633-bca6-0c25a272096d')

    function cn(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        async function getRecs() {
            const res = await fetch(`https://client.experiences.get-potions.com/v1/715/experience/` + flagProductRecs)
            const data = await res.json()
            setRec(data)
        }
        getRecs()
    }, [])

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset
    }

    return (
        <div className='flex-col m-10'>
            <h2 className="mt-1 flex justify-center text-3xl font-bold uppercase text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl">{rec.name}</h2>
            <ul id='abtasty-recs' className='scroll-smooth overflow-hidden flex justify-center' ref={ref}>
                {rec.products?.map((item) => (
                    <li key={item.id} className="flex space-y-4 px-2 m-2 mt-10 flex-col">
                        <Link href={item.link}>
                            <div className='rounded-xl w-80 h-80 bg-gray-200 text-xl flex-col flex'>
                                <Image
                                    alt={item.title}
                                    src={item.img_link}
                                    width={400}
                                    height={400}
                                    style={{height: 'inherit'}}
                                    className={cn(
                                        'duration-700 ease-in-out group-hover:opacity-75',
                                        isLoading
                                        ? 'scale-110 blur-2xl grayscale'
                                        : 'scale-100 blur-0 grayscale-0'
                                    )}
                                    onLoadingComplete={() => setLoading(false)}
                                />
                            </div>
                        </Link>
                        <div className="flex items-start justify-between text-base font-normal text-gray-900">
                            <h3>{item.title}</h3>
                            <p className='font-base font-bold text-slate-600 tracking-wide'>{item.price}€</p>
                        </div>
                        <Link href={item.link}>
                            <button href='/' className="my-4 w-full flex items-center justify-center py-4 px-8 bg-slate-950 border border-slate-600 text-white text-bold text-sm rounded-full font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                                </svg>
                                Discover
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='flex justify-center items-center'>
                <span className='m-2 border-2 border-slate-600 justify-center flex'>
                    <button onClick={() => scroll(-307)} className='p-3 w-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7 py-1 rotate-180"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg> 
                    </button>
                </span>
                <span className='m-2 border-2 border-slate-600 justify-center flex'>
                    <button onClick={() => scroll(307)} className='p-3 w-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7 py-1"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg>
                    </button>
                </span>
            </div>
        </div>
    )
}