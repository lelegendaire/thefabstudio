import { dirtyline } from "./fonts"
export default function NotFound() {
  return (
    <div className="h-screen bg-[url(/medias/bg_final.webp)] bg-center bg-no-repeat bg-cover text-white flex flex-col items-center justify-center text-center gap-8">
      <h1 className={`${dirtyline.className} text-9xl font-bold`}>404</h1>
      <p>We are lost.</p>
        <a href="/" className="underline text-lg">Go back home</a>
    </div>
  )
}
