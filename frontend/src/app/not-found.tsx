import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-xs tracking-[0.18em] text-amber-600 font-semibold">404</p>
      <h1 className="font-serif text-4xl font-bold mt-2">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you’re looking for doesn’t exist or was moved.</p>
      <Link href="/" className="mt-6 inline-flex h-10 px-6 items-center bg-slate-900 text-white text-sm font-medium">Back to home</Link>
    </div>
  );
}
