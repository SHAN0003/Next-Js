"use client";

function page() {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 px-6 py-10 bg-gray-900">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="group w-80 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <a href="#">
                <img
                  className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300"
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt="Blog thumbnail"
                />
              </a>
              <div className="p-6">
                <a href="#">
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
                    Noteworthy technology acquisitions 2021
                  </h3>
                </a>
                <p className="text-gray-400 text-sm mb-5">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  See more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default page;
