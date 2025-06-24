
export default function Home() {
  const styleObj = { tl: "top-0 rounded-br-full", br: "bottom-0 right-0 rounded-tl-full" } 
  const bubbles = (style: string) => <span className={`${style} absolute w-60 h-60 bg-primary opacity-60`}></span>;
  return (
    <div className="flex items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-geist-sans)] selection:bg-primary selection:text-background relative">
      <form className="flex flex-col gap-4 mx-auto">
        <label htmlFor="moodAsk" className="font-bold text-3xl mb-8 -mt-8">How do you feel today?</label>
        <div>
          <input type="text" id="moodAsk" className="bg-white rounded-l-3xl px-3 py-4 text-background font-medium outline-none" />
          <button className="rounded-e-3xl px-3 py-4 bg-secondary text-text font-semibold cursor-pointer hover:bg-accent duration-300">Mood</button>
        </div>
      </form>
      {bubbles(styleObj.tl)}
      {bubbles(styleObj.br)}
    </div>
  );
}
