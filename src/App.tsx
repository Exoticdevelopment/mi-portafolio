import { useState, useEffect, useRef } from 'react'
import exoticdevLogo from '@/imports/EXOTICDEV_LOGO.png'
import cvFile from '@/assets/CV_Miguel_Angel_Gonzalez_Zuluaga.pdf?url'

const PROJECTS = [
  {
    id: '01',
    name: 'NeuralMesh',
    desc: 'Distributed inference engine for LLMs on heterogeneous GPU clusters. Zero-copy tensor routing with custom CUDA kernels.',
    tags: ['Rust', 'CUDA', 'Python'],
    stars: 2841,
    status: 'active',
    color: '#00ffcc',
    url: '#',
  },
  {
    id: '02',
    name: 'Phantasm',
    desc: 'WebGPU-accelerated generative art engine. Procedural noise + shader graphs, exports to SVG, WebM, or live canvas.',
    tags: ['TypeScript', 'WebGPU', 'WGSL'],
    stars: 1204,
    status: 'active',
    color: '#a855f7',
    url: '#',
  },
  {
    id: '03',
    name: 'Helix DB',
    desc: 'Append-only columnar store with DNA-inspired encoding. Sub-millisecond range queries on 10B row datasets.',
    tags: ['Go', 'C', 'Assembly'],
    stars: 987,
    status: 'archived',
    color: '#00ff88',
    url: '#',
  },
]

const SKILLS = ['Rust', 'Go', 'TypeScript', 'Python', 'C/C++', 'Zig', 'WASM', 'CUDA', 'WebGPU', 'k8s', 'Linux', 'gRPC']

function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className="font-mono text-sm leading-relaxed"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {text}
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: '#00ff88',
    archived: '#4a4a6a',
    wip: '#f59e0b',
  }

  return (
    <span
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: colors[status] ?? '#4a4a6a',
        boxShadow: status === 'active' ? `0 0 6px ${colors[status]}` : 'none',
        marginRight: 6,
      }}
    />
  )
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0]; index?: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-glow"
      style={{
        background: hovered ? '#141426' : '#0f0f1a',
        border: `1px solid ${hovered ? project.color + '44' : '#1e1e38'}`,
        borderRadius: 2,
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 2,
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          transition: 'width 0.3s ease',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: project.color,
            opacity: 0.7,
            letterSpacing: '0.1em',
          }}
        >
          [{project.id}]
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusDot status={project.status} />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: '#4a4a6a',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <h3
        style={{
          fontFamily: 'Pixelify Sans, monospace',
          fontSize: 22,
          fontWeight: 600,
          color: hovered ? '#ffffff' : '#e2e2f0',
          marginBottom: 10,
          transition: 'color 0.2s',
          letterSpacing: '0.02em',
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          color: '#8888aa',
          lineHeight: 1.65,
          marginBottom: 16,
        }}
      >
        {project.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 1,
              border: `1px solid ${project.color}33`,
              color: project.color,
              letterSpacing: '0.08em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#4a4a6a' }}>
          ★ {project.stars.toLocaleString()}
        </span>

        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: hovered ? '#ffffff' : '#4a4a6a',
            transition: 'color 0.2s',
            letterSpacing: '0.08em',
          }}
        >
          view_repo →
        </span>
      </div>
    </div>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  color: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 20px',
        background: hovered ? '#141426' : '#0f0f1a',
        border: `1px solid ${hovered ? color + '55' : '#1e1e38'}`,
        borderRadius: 2,
        textDecoration: 'none',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          background: color + '18',
          border: `1px solid ${color}33`,
          color,
          flexShrink: 0,
          fontSize: 16,
          transition: 'box-shadow 0.2s',
          boxShadow: hovered ? `0 0 12px ${color}44` : 'none',
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#4a4a6a',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 2,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            color: hovered ? '#ffffff' : '#e2e2f0',
            transition: 'color 0.2s',
          }}
        >
          {value}
        </div>
      </div>

      {hovered && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      )}
    </a>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nameGlitching, setNameGlitching] = useState(false)
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // En pantallas táctiles no existe un "mouseleave" real, así que si dependemos
  // solo de :hover el efecto glitch se queda pegado tras el toque. Con esto,
  // en touch el glitch se activa un instante y se apaga solo.
  const triggerNameGlitch = () => {
    setNameGlitching(true)
    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current)
    glitchTimeoutRef.current = setTimeout(() => setNameGlitching(false), 700)
  }

  useEffect(() => {
    return () => {
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const filters = ['all', 'active', 'wip', 'archived']
  const filtered =
    activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.status === activeFilter)

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: '#07070f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.25,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #00ffcc08 0, transparent 30%), radial-gradient(circle at 80% 80%, #a855f708 0, transparent 30%)',
        }}
      />

      <div
        style={{
          position: 'fixed',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00ffcc08 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(#1e1e3811 1px, transparent 1px), linear-gradient(90deg, #1e1e3811 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 0',
            borderBottom: '1px solid #1e1e38',
            marginBottom: 80,
          }}
        >
          <div className="nav-links" style={{ display: 'flex', gap: 24 }}>
            {['work', 'stack', 'contact', 'cv'].map((item) => (
              <a
                key={item}
                href={item === 'cv' ? cvFile : `#${item}`}
                {...(item === 'cv'
                  ? { download: 'CV_Miguel_Angel_Gonzalez_Zuluaga.pdf' }
                  : {})}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  color: '#4a4a6a',
                  textDecoration: 'none',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#4a4a6a')}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <section className="hero-grid" style={{ marginBottom: 100 }}>
          <div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: '#00ffcc',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#00ffcc' }} />
              EXOTICDEV
            </div>

            <h1
              className={`glitch-text${nameGlitching ? ' is-glitching' : ''}`}
              data-text="Miguel Angel"
              onClick={triggerNameGlitch}
              onTouchStart={triggerNameGlitch}
              style={{
                fontFamily: 'Pixelify Sans, monospace',
                fontSize: 'clamp(40px, 9vw, 88px)',
                fontWeight: 700,
                color: '#e2e2f0',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}
            >
              Miguel
              <br />
              <span style={{ color: '#00ffcc' }}>Angel</span>
            </h1>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                color: '#8888aa',
                lineHeight: 1.7,
                maxWidth: 420,
                marginBottom: 36,
              }}
            >
              Systems engineer obsessed with performance, distributed systems, and the intersection of compilers and creative tools. I build things that run fast and last.
            </p>

            <div
              className="hero-buttons"
              style={{
                display: 'flex',
                gap: 12,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12,
              }}
            >
              <a
                href="#contact"
                style={{
                  padding: '10px 24px',
                  background: '#00ffcc',
                  color: '#07070f',
                  textDecoration: 'none',
                  borderRadius: 1,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px #00ffcc55')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = 'none')
                }
              >
                contact_me()
              </a>

              <a
                href="https://github.com/Exoticdevelopment"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 24px',
                  background: 'transparent',
                  color: '#00ffcc',
                  textDecoration: 'none',
                  borderRadius: 1,
                  border: '1px solid #00ffcc44',
                  letterSpacing: '0.08em',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#ffffff'
                  el.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#00ffcc44'
                  el.style.color = '#00ffcc'
                }}
              >
                github →
              </a>
            </div>
          </div>

          <div
            className="hero-terminal"
            style={{
              background: '#0f0f1a',
              border: '1px solid #1e1e38',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#141426',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: '1px solid #1e1e38',
              }}
            >
              {['#f43f5e', '#f59e0b', '#00ff88'].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#4a4a6a', marginLeft: 8 }}>
                exoticdev ~ terminal
              </span>
            </div>

            <div style={{ padding: '20px 20px', lineHeight: 2 }}>
              <TerminalLine text="$ whoami" delay={200} />
              <TerminalLine text={`> exoticdev // systems_engineer`} delay={600} />
              <TerminalLine text=" " delay={800} />
              <TerminalLine text="$ cat stack.txt" delay={1000} />

              {SKILLS.map((s, i) => (
                <TerminalLine key={s} text={`> ${s}`} delay={1200 + i * 80} />
              ))}

              <TerminalLine text=" " delay={2200} />

              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#00ffcc' }}>
                <TerminalLine text="$ _" delay={2400} />
              </div>
            </div>
          </div>
        </section>

        <div
          className="stats-grid"
          style={{
            background: '#1e1e38',
            marginBottom: 100,
            borderRadius: 2,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {[
            { label: 'projects shipped', value: '3' },
            { label: 'github stars', value: '8.4k' },
            { label: 'years coding', value: '3' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#0f0f1a', padding: '24px', textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Pixelify Sans, monospace',
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#00ffcc',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  color: '#4a4a6a',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <section id="work" style={{ marginBottom: 100 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  color: '#4a4a6a',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                // selected work
              </div>

              <h2
                style={{
                  fontFamily: 'Pixelify Sans, monospace',
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#e2e2f0',
                  letterSpacing: '0.02em',
                }}
              >
                Projects
              </h2>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    padding: '6px 14px',
                    borderRadius: 1,
                    border: `1px solid ${activeFilter === f ? '#ffffff' : '#1e1e38'}`,
                    background: activeFilter === f ? '#ffffff18' : 'transparent',
                    color: activeFilter === f ? '#ffffff' : '#4a4a6a',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'all 0.15s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 16,
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        <section id="stack" style={{ marginBottom: 100 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: '#4a4a6a',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            // tools & technologies
          </div>

          <h2
            style={{
              fontFamily: 'Pixelify Sans, monospace',
              fontSize: 36,
              fontWeight: 700,
              color: '#e2e2f0',
              letterSpacing: '0.02em',
              marginBottom: 32,
            }}
          >
            Stack
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { name: 'Rust', level: 95 },
              { name: 'Go', level: 90 },
              { name: 'TypeScript', level: 88 },
              { name: 'Python', level: 85 },
              { name: 'C/C++', level: 82 },
              { name: 'Zig', level: 70 },
              { name: 'Elixir', level: 72 },
              { name: 'CUDA', level: 68 },
              { name: 'WebGPU', level: 75 },
              { name: 'WASM', level: 80 },
              { name: 'Linux', level: 92 },
              { name: 'Docker', level: 88 },
              { name: 'Kubernetes', level: 80 },
              { name: 'PostgreSQL', level: 85 },
              { name: 'Redis', level: 82 },
              { name: 'gRPC', level: 84 },
            ].map(({ name, level }) => (
              <div
                key={name}
                style={{
                  background: '#0f0f1a',
                  border: '1px solid #1e1e38',
                  borderRadius: 2,
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = '#ffffff55')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = '#1e1e38')
                }
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12,
                    color: '#e2e2f0',
                  }}
                >
                  {name}
                </span>

                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: 12,
                        borderRadius: 1,
                        background: i < Math.round(level / 20) ? '#00ffcc' : '#1e1e38',
                        boxShadow: i < Math.round(level / 20) ? '0 0 4px #00ffcc88' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" style={{ marginBottom: 80 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: '#4a4a6a',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            // reach out
          </div>

          <h2
            style={{
              fontFamily: 'Pixelify Sans, monospace',
              fontSize: 36,
              fontWeight: 700,
              color: '#e2e2f0',
              letterSpacing: '0.02em',
              marginBottom: 32,
            }}
          >
            Contact
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 12,
              marginBottom: 48,
            }}
          >
            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              }
              label="github"
              value="github.com/Exotic"
              href="https://github.com/Exoticdevelopment"
              color="#e2e2f0"
            />

            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
              label="email"
              value="exoticdev777@gmail.com"
              href="mailto:exoticdev777@gmail.com"
              color="#00ffcc"
            />

            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 12.84 12.84 0 0 1 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15h-.08z" />
                </svg>
              }
              label="phone"
              value="+57 3159020723"
              href="tel:+573159020723"
              color="#a855f7"
            />

            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.134 18.113a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              }
              label="discord"
              value="exoticdev."
              href="#"
              color="#5865f2"
            />

            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
              label="linkedin"
              value="linkedin.com/in/miguel-gonzalez"
              href="https://www.linkedin.com/in/miguel-angel-gonzalez-zuluaga-675504247/"
              color="#0a66c2"
            />
          </div>

          <div
            className="cta-block"
            style={{
              background: '#0f0f1a',
              border: '1px solid #1e1e38',
              borderRadius: 2,
              padding: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #00ffcc0a 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div>
              <h3
                style={{
                  fontFamily: 'Pixelify Sans, monospace',
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#e2e2f0',
                  marginBottom: 8,
                }}
              >
                Got a project in mind?
              </h3>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: '#8888aa',
                }}
              >
                Let's build something that actually performs.
              </p>
            </div>

            <a
              href="mailto:exoticdev777@gmail.com"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 13,
                padding: '12px 28px',
                background: '#00ffcc',
                color: '#07070f',
                textDecoration: 'none',
                borderRadius: 1,
                fontWeight: 600,
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px #00ffcc55')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = 'none')
              }
            >
              send_message() →
            </a>
          </div>
        </section>

        <footer
          style={{
            borderTop: '1px solid #1e1e38',
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: '#4a4a6a',
              letterSpacing: '0.1em',
            }}
          >
            © 2026 exoticdev — built with ♥ and caffeine
          </span>

          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: '#4a4a6a',
              letterSpacing: '0.1em',
            }}
          >
            <span style={{ color: '#00ffcc' }}>●</span> open to work
          </span>
        </footer>
      </div>
    </div>
  )
}