import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

// ParticlesBackground renders animated particles as a section background.
// Ensure the parent container has `position: relative` or `absolute` for correct overlay.
// Usage: Wrap your section content with ParticlesBackground for a seamless background integration.
export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="particles-bg-wrapper" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: 'transparent' },
          fpsLimit: 60,
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: ['#60a5fa', '#818cf8', '#34d399', '#fbbf24'] },
            shape: { type: 'circle' },
            opacity: { value: 0.4 },
            size: { value: { min: 2, max: 4 } },
            move: { enable: true, speed: 1, direction: 'none', outModes: { default: 'out' } },
            links: {
              enable: true,
              distance: 120,
              color: '#a5b4fc',
              opacity: 0.3,
              width: 1,
            },
          },
          detectRetina: true,
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
