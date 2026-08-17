import Link from "next/link";
export default function NotFound(){ return <div className="system-page dark-section"><p className="eyebrow text-brass">404 · Not found</p><h1>This route is outside the atlas.</h1><p>The page may have moved or the address may be incomplete.</p><Link className="button brass" href="/">Return home</Link></div>; }
