"use client";

import Image from "next/image";
import { themeColors } from "@/components/invite/decoratives";
import type { Couple } from "@/components/invite/types";

interface Props {
  groom: Couple | null;
  bride: Couple | null;
}

export default function PhotoboothSection({ groom, bride }: Props) {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="flex items-center justify-end gap-2">
        <p
          className="-mt-55 flex-1 shrink-0 text-right font-display leading-tight italic"
          style={{ color: themeColors.primary, fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          We can&apos;t
          <br />
          wait to
          <br />
          celebrate
          <br />
          with you!
        </p>
        <div className="relative shrink-0">
          <Image
            src="/images/photobooth.png"
            alt="Photo Booth"
            width={1291}
            height={2512}
            className="h-auto w-[70vw] max-w-none object-contain -mr-[17vw] drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
          />
        </div>
      </div>
      <p className="mt-4 -translate-y-40 -ml-36 text-center font-italianno leading-none" style={{ color: themeColors.primary, letterSpacing: "-0.02em", fontSize: "clamp(2rem, 6vw, 4rem)" }}>
        {bride?.nickname || bride?.full_name || "________"} &amp; {groom?.nickname || groom?.full_name || "________"}
      </p>
      <Image
        src="/images/hiasanphoto.png"
        alt=""
        width={798}
        height={686}
        className="ml-16 -mt-6 w-24 object-contain sm:ml-32 sm:w-32"
      />
    </section>
  );
}