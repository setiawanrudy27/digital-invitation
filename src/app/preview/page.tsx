import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split-Screen Invitation Preview",
};

export default function PreviewPage() {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Left side: Hero image fullscreen */}
      <div className="flex-1 relative overflow-hidden hidden lg:block bg-gradient-to-br from-rose-900 to-pink-900">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Demo content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Hero Image Area</h1>
              <p className="text-xl">Left side: Fullscreen (flex-1)</p>
              <p className="text-xl">Resize to see responsive behavior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Mobile invitation frame */}
      <div className="w-[430px] flex flex-col relative z-10 shadow-2xl overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto invitation-theme bg-white p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="font-quicksand text-3xl text-rose-700" style={{ fontWeight: 200 }}>
              The Wedding Of
            </p>
          </div>

          {/* Names */}
          <div className="text-center mb-8">
            <h1
              className="font-corinthia text-5xl leading-tight text-rose-700 mb-4"
              style={{ fontFamily: "Corinthia, cursive" }}
            >
              Bride Name
            </h1>
            <div className="flex items-center justify-center gap-4 py-3 mb-4">
              <span className="block h-px w-16 bg-gradient-to-r from-transparent via-rose-700 to-transparent" />
              <span className="text-2xl text-rose-700">&amp;</span>
              <span className="block h-px w-16 bg-gradient-to-r from-transparent via-rose-700 to-transparent" />
            </div>
            <h1
              className="font-corinthia text-5xl leading-tight text-rose-700"
              style={{ fontFamily: "Corinthia, cursive" }}
            >
              Groom Name
            </h1>
          </div>

          {/* Date */}
          <div className="text-center mb-8">
            <p className="text-sm tracking-widest italic text-rose-700">
              Saturday, June 14, 2025
            </p>
          </div>

          {/* Greeting Card */}
          <div className="mb-8 p-6 text-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <p className="text-xs mb-2 text-rose-700">
              Dear Guest,
            </p>
            <p className="text-lg font-bold tracking-wide text-rose-700 my-2">
              Kami mengharap kehadiran Anda
            </p>
            <p className="text-xs text-rose-700 leading-relaxed">
              untuk merayakan momen istimewa kami
            </p>
          </div>

          {/* Open Button */}
          <button
            className="w-full py-3 rounded-full bg-gradient-to-r from-rose-700 to-pink-600 text-white font-medium tracking-widest text-sm mb-8"
          >
            ✉ BUKA UNDANGAN
          </button>

          {/* Additional sections to show scrolling */}
          <div className="space-y-6">
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-rose-700 mb-3">Acara Pernikahan</h2>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Resepsi:</strong> Pukul 10:00 - 22:00
              </p>
              <p className="text-sm text-gray-600">
                Lokasi: Grand Ballroom, Jakarta
              </p>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-rose-700 mb-3">Galeri Foto</h2>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-gray-300 rounded"></div>
                <div className="aspect-square bg-gray-300 rounded"></div>
                <div className="aspect-square bg-gray-300 rounded"></div>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-rose-700 mb-3">RSVP</h2>
              <p className="text-sm text-gray-600 mb-4">
                Silakan konfirmasi kehadiran Anda sebelum tanggal 1 Juni 2025
              </p>
              <button className="w-full py-2 px-4 border border-rose-700 text-rose-700 rounded-lg text-sm font-medium">
                Konfirmasi Hadir
              </button>
            </section>

            <section className="border-t border-gray-200 pt-6 pb-8">
              <h2 className="text-xl font-semibold text-rose-700 mb-3">Hadiah</h2>
              <p className="text-sm text-gray-600 mb-4">
                Silakan transfer hadiah ke rekening yang telah disediakan
              </p>
              <div className="bg-gray-100 p-3 rounded text-sm text-gray-700">
                Bank Mandiri: 123 456 789
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Mobile view notice for screens < 1024px */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="text-center text-white p-8">
          <h1 className="text-2xl font-bold mb-4">Desktop View Required</h1>
          <p className="text-lg mb-4">
            This split-screen layout is designed for laptops and desktops.
          </p>
          <p className="text-sm">
            Resize your window to at least 1024px width to see the split-screen layout.
          </p>
          <div className="mt-6 text-xs text-gray-400">
            <p>Current resolution: {typeof window !== "undefined" ? window.innerWidth : "N/A"}px</p>
          </div>
        </div>
      </div>
    </div>
  );
}
