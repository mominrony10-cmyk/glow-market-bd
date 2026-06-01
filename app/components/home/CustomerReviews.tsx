"use client";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Tania Chowdhury",
      comment: "I always buy my Beauty of Joseon sunscreen from Glow Market BD. 100% genuine imported items. Delivery inside Dhaka took less than 24 hours!",
      stars: 5,
      ref: "BOJ Sunscreen"
    },
    {
      name: "Nusrat Jahan",
      comment: "The Skin1004 Centella ampoule has restored my skin barriers beautifully. Free gift mask included on my 2k order made my day. Great service!",
      stars: 5,
      ref: "Skin1004 Ampoule"
    },
    {
      name: "Safayet Ahmed",
      comment: "Excellent original items. I cross-checked the QR seal and it verified perfectly. WhatsApp team guided my skin type selections easily.",
      stars: 5,
      ref: "COSRX Snail Mucin"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-lg font-black text-black tracking-wider uppercase">
          Customer Reviews
        </h3>
      </div>

      <div className="bg-[#FAF9F6] border border-zinc-200 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
        {reviews.map((rev, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-0.5 text-[#e11d48] text-xs select-none">
                {"★".repeat(rev.stars)}
              </div>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-gray-900">{rev.name}</span>
                  <span className="bg-[#EAFDF2] text-[#0b8043] border border-[#c5f4d7] font-bold text-[8px] px-1.5 py-0.2 rounded-full">✓ Verified</span>
                </div>
              </div>
              <span className="text-[9px] bg-rose-50 text-[#e11d48] border border-rose-100 font-black px-2 py-0.5 rounded uppercase">
                {rev.ref}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
