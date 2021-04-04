export default function Footer() {
  return (
    <footer className="flex w-full mt-10">
      <div className="relative px-8 w-full">
        <div className="container flex items-center justify-center text-center py-5 px-20 mx-auto max-w-7xl">
          <h2 className="relative z-10 text-sm font-bold text-gray-700">
            Crafted using Next.js and Tailwind CSS{' '}
            <span className="inline-block animate-pulse" role="img" aria-label="heart">
              ❤️
            </span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
