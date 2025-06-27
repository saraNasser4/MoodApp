import FormComp from './components/FormComp'

export default function Home() {
  const styleObj = { 
    tl: "top-0 rounded-br-full", 
    br: "bottom-0 right-0 rounded-tl-full" 
  };
  const bubbles = (style: string) => <span className={`${style} absolute w-60 h-60 bg-primary opacity-60`}></span>;

  return (
    <div className="flex items-center justify-items-center min-h-screen min-w-screen font-[family-name:var(--font-geist-sans)] selection:bg-primary selection:text-background relative">
      <FormComp />
      {bubbles(styleObj.tl)}
      {bubbles(styleObj.br)}
    </div>
  );
}
