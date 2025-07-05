'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export default function FromComp() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e?.target?.value);
    }
    
    const handleSubmit =  async(e: FormEvent)=> {
        e.preventDefault();
        if(!inputValue.trim()) return;

        setError(null);
        setIsLoading(true)

        try {
            const data = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mood: inputValue }),
            };

            const response = await fetch(`http://localhost:${process.env.BACKEND_PORT?.toString() || '5065'}/api/mood/`, data);
            
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error saving mood")
            }
            const result = await response.json();
            console.log("Mood saved", result)

        }catch (err) {
            console.error("something went wrong",err);
            setError(err instanceof Error ? err.message : "Failed to save mood")
        } finally {
            setIsLoading(false);
            setInputValue("");
        }
    }

    useEffect(()=> console.log(inputValue), [inputValue])
    return (
        <>
            {isLoading && <span className="bg-accent/30 w-full h-full absolute z-50">
                <div className="size-5 animate-spin w-10 h-10 border-4 border-t-transparent border-secondary rounded-full absolute top-1/2 left-1/2 -translate-1/2"></div>
            </span>}
            
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 mx-auto relative">
                <label htmlFor="moodAsk" className="font-bold text-3xl mb-8 -mt-8">How do you feel today?</label>
                <div>
                    <input type="text" value={inputValue} placeholder="Enter your mood body..." onChange={(e) => handleChange(e)} id="moodAsk" className="bg-white rounded-l-3xl px-3 py-4 text-background font-medium outline-none" />
                    <button type="submit" className="rounded-e-3xl px-3 py-4 bg-secondary text-text font-semibold cursor-pointer hover:bg-accent duration-300 disabled:cursor-">Mood</button>
                </div>
                {error && <p className="absolute text-red-500 -bottom-10">{error}</p>}
            </form>
        </>
    ) 
}