'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export default function FromComp() {
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e?.target?.value);
    }
    
    const handleSubmit =  async(e: FormEvent)=> {
        e.preventDefault();
        if(!inputValue.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const data = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mood: inputValue }),
            };

            const response = await fetch("http://localhost:5065/api/mood", data);
            
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error saving mood!")
            }

            setInputValue("")
        }catch (err) {
            console.error("something went wrong",err);
            setError(err instanceof Error ? err.message : "Failed to save mood")
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(()=> console.log(inputValue), [inputValue])
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 mx-auto">
            <label htmlFor="moodAsk" className="font-bold text-3xl mb-8 -mt-8">How do you feel today?</label>
            <div>
                <input type="text" value={inputValue} placeholder="Enter your mood body..." onChange={(e) => handleChange(e)} id="moodAsk" className="bg-white rounded-l-3xl px-3 py-4 text-background font-medium outline-none" />
                <button type="submit" disabled={isSubmitting} className="rounded-e-3xl px-3 py-4 bg-secondary text-text font-semibold cursor-pointer hover:bg-accent duration-300 disabled:cursor-">Mood</button>
            </div>
            {error && <p className="text-red-500 -pt-4">{error}</p>}
        </form>
    ) 
}