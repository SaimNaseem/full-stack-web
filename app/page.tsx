"use client";

import Link from "next/link";

const products = [
  {
    src: "/assets/products/iPhone 18 Max.png",
    alt: "iPhone 18 Max",
    className:
      "right-[8%] top-[7%] w-[110px] rotate-[9deg] md:w-[140px] lg:w-[165px]",
  },
  {
    src: "/assets/products/Macbook Pro M5 2025.png",
    alt: "MacBook Pro",
    className:
      "right-[1%] bottom-[8%] w-[240px] rotate-[6deg] md:w-[320px] lg:w-[390px]",
  },
  {
    src: "/assets/products/apple-mac-mini-m4.png",
    alt: "Mac Mini",
    className:
      "left-[7%] bottom-[5%] w-[150px] -rotate-[8deg] md:w-[190px] lg:w-[230px]",
  },
  {
    src: "/assets/products/LG Mouse.png",
    alt: "LG Mouse",
    className:
      "left-[10%] top-[42%] w-[100px] rotate-[14deg] md:w-[125px] lg:w-[150px]",
  },

  // Add these images later
  {
    src: "/assets/products/laakers.png",
    alt: "Lakers Jersey",
    className:
      "left-[22%] top-[6%] w-[170px] rotate-[7deg] md:w-[210px] lg:w-[250px]",
  },
  {
    src: "/assets/products/nike.png",
    alt: "Nike Shoe",
    className:
      "right-[6%] bottom-[2%] w-[200px] -rotate-[13deg] md:w-[260px] lg:w-[310px]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] p-4 md:p-6">
      <div className="relative min-h-[calc(100vh-32px)] overflow-hidden rounded-[28px] border border-black/5 bg-white md:min-h-[calc(100vh-48px)]">
        {/* TOP BAR */}
        <header className="relative z-40 flex items-center justify-between border-b border-black/5 px-6 py-5 md:px-10">
          <img
            src="/assets/TradifyLOGO.png"
            alt="Tradify"
            className="w-[125px] object-contain md:w-[145px]"
          />

          <Link
            href="/dashboard"
            className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#f5f5f3]"
          >
            Dashboard
          </Link>
        </header>

        {/* LIME BACKGROUND ACCENTS */}
        <div className="pointer-events-none absolute left-[18%] top-[14%] h-[220px] w-[220px] rounded-full bg-[#b5ff00]/15 blur-[80px]" />

        <div className="pointer-events-none absolute bottom-[5%] right-[12%] h-[260px] w-[260px] rounded-full bg-[#b5ff00]/15 blur-[90px]" />

        {/* PRODUCTS */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {products.map((product) => (
            <img
              key={product.alt}
              src={product.src}
              alt={product.alt}
              className={`absolute select-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.10)] ${product.className}`}
            />
          ))}
        </div>

        {/* CENTER */}
        <section className="relative z-30 flex min-h-[calc(100vh-105px)] items-center justify-center px-5 py-20">
          <div className="w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-white/85 px-8 py-12 text-center shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl md:px-16 md:py-16">
              {/* LIME TOP LINE */}
              <div className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-full bg-[#b5ff00]" />

              {/* BADGE */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f3] px-4 py-2 text-xs font-medium text-black/60">
                <span className="h-2 w-2 rounded-full bg-[#b5ff00]" />
                Marketplace Platform
              </div>

              {/* LOGO */}
              <img
                src="/assets/TradifyLOGO.png"
                alt="Tradify"
                className="mx-auto w-[240px] object-contain md:w-[330px]"
              />

              <h1 className="mx-auto mt-8 max-w-2xl text-4xl font-medium tracking-[-0.04em] text-black md:text-6xl">
                Discover products.
                <br />
                Trade smarter.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/45 md:text-lg">
                Buy, sell and manage products from one simple marketplace.
              </p>

              <div className="mt-9 flex justify-center">
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-4 rounded-full bg-[#b5ff00] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#a7eb00]"
                >
                  To Dashboard
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              <div className="mx-auto mt-12 grid max-w-md grid-cols-3 border-t border-black/5 pt-8">
                <div>
                  <p className="text-lg font-semibold text-black">Fast</p>
                  <p className="mt-1 text-xs text-black/35">
                    Product discovery
                  </p>
                </div>

                <div className="border-x border-black/5">
                  <p className="text-lg font-semibold text-black">Simple</p>
                  <p className="mt-1 text-xs text-black/35">
                    Product management
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-black">Smart</p>
                  <p className="mt-1 text-xs text-black/35">AI powered</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-black/25">
          Tradify Marketplace
        </div>
      </div>
    </main>
  );
}
