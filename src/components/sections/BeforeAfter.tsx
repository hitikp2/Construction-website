'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';

/* ------------------------------------------------------------------ */
/*  Project Data                                                       */
/* ------------------------------------------------------------------ */

const projects = [
  {
    before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=60',
    name: 'Modern Kitchen Remodel',
    loc: 'Pasadena, CA \u00b7 Full tear-out & rebuild',
    cost: '$87,000',
    meta: '8 weeks \u00b7 280 sqft',
    label: 'Kitchen',
  },
  {
    before: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&q=60',
    name: 'Luxury Spa Bathroom',
    loc: 'Newport Beach, CA \u00b7 Complete renovation',
    cost: '$62,000',
    meta: '6 weeks \u00b7 120 sqft',
    label: 'Bath',
  },
  {
    before: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=60',
    name: 'Open-Concept Living Room',
    loc: 'Long Beach, CA \u00b7 Wall removal & refinish',
    cost: '$45,000',
    meta: '5 weeks \u00b7 400 sqft',
    label: 'Living',
  },
  {
    before: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=60',
    name: 'Complete Exterior Facelift',
    loc: 'Rancho Cucamonga, CA \u00b7 Stucco, paint & landscape',
    cost: '$38,000',
    meta: '4 weeks \u00b7 2,200 sqft',
    label: 'Exterior',
  },
  {
    before: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=60',
    name: 'Detached ADU \u2014 650 sqft',
    loc: 'Irvine, CA \u00b7 New build, 1BD/1BA + patio',
    cost: '$195,000',
    meta: '7 months \u00b7 650 sqft',
    label: 'ADU',
  },
];

/* ------------------------------------------------------------------ */
/*  Spark Particle                                                     */
/* ------------------------------------------------------------------ */

const Spark: React.FC<{ index: number }> = ({ index }) => {
  const top = `${(index * 17 + 7) % 100}%`;
  const duration = `${1.5 + (index * 0.3) % 2}s`;
  const delay = `${(index * 0.25) % 3}s`;
  const size = `${2 + (index % 3)}px`;

  return (
    <div
      className="absolute left-1/2 rounded-full bg-[#c8ff00] opacity-0"
      style={{
        top,
        width: size,
        height: size,
        boxShadow: '0 0 6px #c8ff00',
        animation: `sparkFloat ${duration} linear ${delay} infinite`,
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Stage (Before/After Comparison)                                    */
/* ------------------------------------------------------------------ */

interface StageProps {
  project: typeof projects[0];
  onInteract: () => void;
}

const Stage: React.FC<StageProps> = ({ project, onInteract }) => {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [fade, setFade] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Crossfade on project change and reset slider
  useEffect(() => {
    setFade(true);
    const t = setTimeout(() => {
      setPct(50);
      setFade(false);
    }, 250);
    return () => clearTimeout(t);
  }, [project]);

  const getPct = useCallback((clientX: number) => {
    if (!stageRef.current) return 50;
    const r = stageRef.current.getBoundingClientRect();
    return Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    onInteract();
    setPct(getPct(e.clientX));
  }, [getPct, onInteract]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    e.preventDefault();
    setPct(getPct(e.clientX));
  }, [dragging, getPct]);

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleStageClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-hit]')) return;
    onInteract();
    setPct(getPct(e.clientX));
  }, [getPct, onInteract]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPct(p => Math.max(2, p - 2)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPct(p => Math.min(98, p + 2)); }
  }, []);

  const posClass = pct < 12 ? 'low' : pct > 88 ? 'high' : '';

  return (
    <div
      ref={stageRef}
      className={`relative aspect-video rounded-[22px] overflow-hidden bg-[#0a0a0a] select-none cursor-default shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.6),0_0_120px_rgba(200,255,0,0.02)] hover:shadow-[0_0_0_1px_rgba(200,255,0,0.06),0_32px_100px_rgba(0,0,0,0.65),0_0_160px_rgba(200,255,0,0.03)] transition-all duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleStageClick}
      onKeyDown={handleKeyDown}
      onDragStart={e => e.preventDefault()}
      tabIndex={0}
      role="slider"
      aria-label="Before and after project comparison"
      aria-valuenow={Math.round(pct)}
    >
      {/* After layer (bottom) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${project.after}')` }}
      />

      {/* Before layer (top, clipped) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[2]"
        style={{
          backgroundImage: `url('${project.before}')`,
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
        }}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 -translate-x-1/2 pointer-events-none"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute inset-0 bg-[#c8ff00] rounded-full shadow-[0_0_8px_rgba(200,255,0,0.5),0_0_24px_rgba(200,255,0,0.15),0_0_64px_rgba(200,255,0,0.06)]" />
        {/* Sparks */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => <Spark key={i} index={i} />)}
        </div>
      </div>

      {/* Hit zone for dragging */}
      <div
        data-hit
        className="absolute top-0 bottom-0 w-14 -translate-x-1/2 z-20 cursor-col-resize touch-none"
        style={{ left: `${pct}%` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      />

      {/* Knob */}
      <div
        className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] max-sm:w-11 max-sm:h-11 rounded-full bg-[#c8ff00] z-[21] flex items-center justify-center gap-2 pointer-events-none transition-transform duration-150 ${dragging ? 'scale-115 shadow-[0_0_40px_rgba(200,255,0,0.5),0_8px_32px_rgba(0,0,0,0.6)]' : 'shadow-[0_0_24px_rgba(200,255,0,0.35),0_6px_20px_rgba(0,0,0,0.5)]'}`}
        style={{ left: `${pct}%` }}
      >
        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#060606]" />
        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-[#060606]" />
      </div>

      {/* Percentage readouts (visible while dragging) */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-[15] font-mono text-[0.68rem] font-semibold tracking-wide px-2.5 py-1 rounded-full pointer-events-none bg-black/65 text-white/60 backdrop-blur-lg transition-opacity duration-200 ${dragging ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${Math.max(0, pct - 12)}%` }}
      >
        {Math.round(pct)}%
      </div>
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-[15] font-mono text-[0.68rem] font-semibold tracking-wide px-2.5 py-1 rounded-full pointer-events-none bg-[#c8ff00]/12 text-[#c8ff00] backdrop-blur-lg transition-opacity duration-200 ${dragging ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${Math.min(88, pct + 3)}%` }}
      >
        {Math.round(100 - pct)}%
      </div>

      {/* Before / After tags */}
      <div
        className={`absolute z-[8] top-5 left-5 px-4 py-1.5 rounded-full font-mono text-[0.62rem] font-semibold tracking-[0.14em] uppercase backdrop-blur-[14px] pointer-events-none bg-black/50 text-white/60 border border-white/[0.06] transition-opacity duration-300 ${posClass === 'low' ? 'opacity-[0.15]' : ''}`}
      >
        Before
      </div>
      <div
        className={`absolute z-[8] top-5 right-5 px-4 py-1.5 rounded-full font-mono text-[0.62rem] font-semibold tracking-[0.14em] uppercase backdrop-blur-[14px] pointer-events-none bg-[#c8ff00]/10 text-[#c8ff00] border border-[#c8ff00]/[0.08] transition-opacity duration-300 ${posClass === 'high' ? 'opacity-[0.15]' : ''}`}
      >
        After
      </div>

      {/* Project info overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-[8] px-5 pb-5 pt-14 md:px-7 md:pb-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between pointer-events-none gap-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-[#f0efe9] font-sans">{project.name}</h3>
          <p className="text-xs md:text-sm text-[#a8a8a0] font-sans">{project.loc}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-base md:text-lg font-bold text-[#c8ff00]">{project.cost}</div>
          <div className="text-[0.68rem] text-[#5a5a54]">{project.meta}</div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

const BeforeAfter: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const project = projects[current];

  const stopAutoplay = useCallback(() => {
    setIsAutoplay(false);
    if (autoRef.current) {
      clearTimeout(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  const goTo = useCallback((i: number) => {
    stopAutoplay();
    setCurrent(i);
  }, [stopAutoplay]);

  const next = useCallback(() => setCurrent(i => (i + 1) % projects.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + projects.length) % projects.length), []);

  // Autoplay
  useEffect(() => {
    if (!isAutoplay) return;
    autoRef.current = setTimeout(() => {
      next();
    }, 5000);
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [isAutoplay, current, next]);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay(a => !a);
  }, []);

  const handleInteract = useCallback(() => {
    stopAutoplay();
  }, [stopAutoplay]);

  return (
    <section id="before-after" className="relative py-24 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(200,255,0,.018), transparent), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(0,180,216,.012), transparent)',
      }} />

      <div className="max-w-7xl mx-auto relative z-[2]">
        <SectionHeader
          label="Transformations"
          title={<>See the <span className="text-[#c8ff00]">Difference</span></>}
          subtitle="Drag to reveal the transformation — or sit back and watch. Real projects, real budgets, real results from across Southern California."
        />

        <div className="max-w-[1100px] mx-auto">
          {/* Stage */}
          <Stage project={project} onInteract={handleInteract} />

          {/* Drag hint */}
          <p className="text-center text-sm text-[#5a5a54] mt-3 font-sans">
            <span className="text-[#c8ff00] font-bold">&larr;</span> Drag the slider to reveal the transformation <span className="text-[#c8ff00] font-bold">&rarr;</span>
          </p>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative w-[88px] h-14 max-sm:w-16 max-sm:h-[42px] rounded-[10px] max-sm:rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 group ${
                  i === current
                    ? 'border-[#c8ff00] shadow-[0_0_16px_rgba(200,255,0,0.2)]'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={p.thumb}
                  alt={p.name}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-[filter] duration-300 ${
                    i === current ? 'brightness-100' : 'brightness-[0.6] group-hover:brightness-[0.85]'
                  }`}
                />
                <span className="absolute bottom-0.5 left-1.5 font-mono text-[0.55rem] text-white/50 font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-[0.62rem] font-bold text-[#f0efe9] uppercase tracking-wide opacity-0 bg-black/50 group-hover:opacity-100 transition-opacity duration-200">
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <button
              onClick={() => { stopAutoplay(); prev(); }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white/[0.06] text-[#5a5a54] bg-[#121212] hover:border-[#c8ff00]/20 hover:text-[#a8a8a0] transition-all flex items-center gap-1.5"
            >
              <span className="text-sm">&lsaquo;</span> Prev
            </button>

            <span className="font-mono text-[0.72rem] text-[#5a5a54] tracking-wide">
              {current + 1} / {projects.length}
            </span>

            {/* Autoplay progress bar */}
            {isAutoplay && (
              <div className="w-40 h-0.5 bg-[#171717] rounded-full overflow-hidden">
                <motion.div
                  key={current}
                  className="h-full bg-[#c8ff00] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </div>
            )}

            <button
              onClick={toggleAutoplay}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isAutoplay
                  ? 'border-[#c8ff00] text-[#c8ff00] bg-[#c8ff00]/5'
                  : 'border-white/[0.06] text-[#5a5a54] bg-[#121212] hover:border-[#c8ff00]/20 hover:text-[#a8a8a0]'
              }`}
            >
              <span className="text-sm">{isAutoplay ? '\u23f8' : '\u25b6'}</span>
              {isAutoplay ? 'Pause' : 'Autoplay'}
            </button>

            <button
              onClick={() => { stopAutoplay(); next(); }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white/[0.06] text-[#5a5a54] bg-[#121212] hover:border-[#c8ff00]/20 hover:text-[#a8a8a0] transition-all flex items-center gap-1.5"
            >
              Next <span className="text-sm">&rsaquo;</span>
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex mt-8 border border-white/[0.04] rounded-[14px] overflow-hidden bg-[#121212] max-sm:flex-wrap">
            {[
              { val: '523', lbl: 'Projects Delivered' },
              { val: '$47M+', lbl: 'Total Project Value' },
              { val: '98%', lbl: 'On-Time Rate' },
              { val: '4.9\u2605', lbl: 'Client Rating' },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex-1 max-sm:flex-[1_1_50%] text-center py-4 px-4 hover:bg-[#c8ff00]/[0.02] transition-colors ${
                  i < 3 ? 'border-r border-white/[0.04] max-sm:border-b' : 'max-sm:border-b'
                } ${i === 1 ? 'max-sm:border-r-0' : ''}`}
              >
                <div className="font-mono text-xl font-bold text-[#c8ff00]">{s.val}</div>
                <div className="text-[0.72rem] text-[#5a5a54] mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
