export default function Custom404() {
  return (
    <>
      <section className="section--wrapper h-full">
        <div className="section--container h-full">
          <div className="flex flex-wrap justify-center w-full h-full">
            <div className="w-full text-center py-20">
              <h1 className="text-8xl font-bold block text-gradient bg-gradient-to-r from-pink-600 via-red-400 to-red-600">
                Oops!
              </h1>
              <p className="text-xl font-bold block my-4">
                We can&lsquo;t seem to find the page you&lsquo;re looking for.
                <span role="img" aria-label="Sad Emoji">
                  😔
                </span>
              </p>
              <span className="text-gray-500">Status Code: 404</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
