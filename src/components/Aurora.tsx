'use client';

/** Ambient animated background: drifting aurora blobs over a masked tech grid. */
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 soft-wash" />

      <div
        className="absolute -left-[12%] -top-[18%] h-[52vw] w-[52vw] rounded-full blur-[110px] animate-drift"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.30), transparent 65%)' }}
      />
      <div
        className="absolute -right-[14%] top-[6%] h-[46vw] w-[46vw] rounded-full blur-[120px] animate-drift"
        style={{
          background: 'radial-gradient(circle, rgb(var(--accent-2) / 0.26), transparent 65%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[22%] h-[48vw] w-[48vw] rounded-full blur-[130px] animate-drift"
        style={{
          background: 'radial-gradient(circle, rgb(var(--accent) / 0.20), transparent 70%)',
          animationDelay: '-14s',
        }}
      />

      {/* horizon glow */}
      <div
        className="absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            'linear-gradient(to bottom, rgb(var(--accent) / 0.08), transparent 80%)',
        }}
      />
    </div>
  );
}
