// src/app/register/layout.tsx
import Image from "next/image";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex w/full max-w-[1280px] gap-8">
        {/* LEFT image shown only on lg+ */}
        <div className="relative hidden lg:flex w-[560px] lg:h-[85vh] lg:min-h-[760px] lg:max-h-[900px] overflow-hidden rounded-2xl shadow-sm">
          <Image src="/login-side.jpg" alt="Auth visual" fill className="object-cover" priority />
        </div>

        {/* RIGHT panel: fixed height only on lg+ */}
        <div className="w-full lg:w-[700px] lg:h-[85vh] lg:min-h-[760px] lg:max-h-[900px] flex">
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
