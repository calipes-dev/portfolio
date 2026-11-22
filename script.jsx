import { siReact, siTypescript, siNextdotjs, siDjango, siPostgresql, siMysql, siArduino, siEspressif, siBootstrap, siTailwindcss, siPhp } from 'simple-icons'
import resumeFile from './resume.txt?url&inline'
import csc from './CSC_Certificate.PNG?inline'
import cyber from './Cybersecurity_Certificates.jfif?inline'
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUp, Code2, Command, FileText, Folder, GitBranch, Mail, Menu, MessageCircle,
  Moon, Pause, Play, Plus, Sparkles, Sun, UserRound, X,
} from 'lucide-react'
import './chat.css'

const topics = [
  { id: 'resume', name: 'Resume', detail: 'Education & experience', Icon: FileText, pattern: /\b(resum[eé]|cv|education|experience|qualifications?|degree|university)\b/i },
  { id: 'about', name: 'About me', detail: 'Get to know Bryan', Icon: UserRound, pattern: /\b(about|who|background|bio|bryan|research(er)?|student)\b/i },
  { id: 'skills', name: 'Skills', detail: 'Tools & technologies', Icon: Code2, pattern: /\b(skills?|stack|tools?|technolog\w*|react|typescript|next\b|django|postgres(?:ql)?|arduino|esp32|mysql|bootstrap|tailwind|php|frameworks?|languages?)\b/i },
  { id: 'projects', name: 'Projects', detail: 'Explore what I’ve built', Icon: Folder, pattern: /\b(projects?|portfolio|work|built|build|apps?|codoria|aralaro)\b/i },
  { id: 'certificates', name: 'Certificates', detail: 'View credentials', Icon: FileText, pattern: /\b(certificates?|certifications?|credentials?|csc|cybersecurity)\b/i },
  { id: 'contact', name: 'Contact', detail: 'Say hello', Icon: Mail, pattern: /\b(contact|reach|email|mail|github|facebook|connect|collaborat\w*|hire|socials?|get in touch)\b/i },
]

const projectLinks = [
  { name: 'Codoria', url: 'https://codoria.vercel.app/', Icon: Code2 },
  { name: 'Aralaro', url: 'https://aralaro.vercel.app/', Icon: Command },
]

const contacts = [
  { name: 'Email', detail: 'bryankimcalipes@gmail.com', url: 'mailto:bryankimcalipes@gmail.com', Icon: Mail },
  { name: 'GitHub', detail: 'calipes-dev', url: 'https://github.com/calipes-dev', Icon: GitBranch },
  { name: 'Facebook', detail: 'calipesbryankim', url: 'https://facebook.com/calipesbryankim', Icon: UserRound },
]

const skills = [
  ['React', siReact],
  ['TypeScript', siTypescript],
  ['Next.js', siNextdotjs],
  ['Django', siDjango],
  ['PostgreSQL', siPostgresql],
  ['MySQL', siMysql],
  ['Arduino', siArduino],
  ['ESP32', siEspressif],
  ['Bootstrap', siBootstrap],
  ['Tailwind CSS', siTailwindcss],
  ['PHP', siPhp]
]

function SkillCarousel() {
  const [paused, setPaused] = useState(false)
  const action = paused ? 'Play skill carousel' : 'Pause skill carousel'
  const Icon = paused ? Play : Pause
  return <div className="skill-carousel">
    <div className="skill-window">
      <div className="skill-track" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
        {[0, 1].map(copy => <ul key={copy} aria-label="Technical skills" aria-hidden={copy === 1}>
          {skills.map(([name, icon]) => <li key={name}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>
            <span>{name}</span>
          </li>)}
        </ul>)}
      </div>
    </div>
    <button type="button" className="chip motion-control" aria-label={action} title={action} onClick={() => setPaused(value => !value)}>
      <Icon size={18} aria-hidden="true" />
    </button>
  </div>
}
const themeKey = 'bryan-portfolio-theme'
const getSavedTheme = () => {
  try {
    const saved = localStorage.getItem(themeKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function matchTopic(question) {
  const exact = topics.find(({ name }) => name.toLowerCase() === question.toLowerCase())
  if (exact) return exact.id
  const prioritized = ['certificates', 'contact', 'resume', 'projects', 'skills', 'about']
  return prioritized.find(id => topics.find(topic => topic.id === id).pattern.test(question)) ?? (/\b(how are you|how.s it going)\b/i.test(question) ? 'wellbeing' : /\b(hi|hello|hey|hiya|good morning|good afternoon|good evening)\b/i.test(question) ? 'greeting' : 'fallback')
}

function Reply({ topic }) {
  const [expanded, setExpanded] = useState(false)
  switch (topic) {
    case 'wellbeing': return <p>I’m doing well, thanks for asking! What would you like to explore?</p>
    case 'greeting': return <p>Hello! Welcome to my portfolio. What would you like to know about me?</p>
    case 'about':
      return <section className="biography"><h4>From Curiosity to Code: My Journey So Far</h4>
                            <p>My name is Bryan Kim Calipes, I'm 22 years old, and my story with technology didn't start with lines of code—it started with curiosity.</p>
                            {expanded && <div className="biography-more"><p>I remember staring at apps and websites, wondering what really lived behind those smooth animations and pretty user interfaces. Everyone sees the buttons, the colors, the effects—but I wanted to know what makes them work. That simple question slowly pulled me into the world of Information Technology.</p>
                            <p>I enrolled in BSIT not because I already knew everything, but because I didn't. I was curious. Curious about how websites talk to databases, how a login form decides whether to let you in or keep you out, and how games react instantly to every click and move. Speaking of games—when I'm not coding, you'll probably find me playing Mobile Legends, Albion Online, or DOTA 2. Games taught me something important early on: systems matter. Balance matters. And behind every "fun experience" is solid logic.</p>
                            <p>My first real steps into development were raw and hands-on. I built websites using direct PHP with HTML and MySQL, breaking things more often than fixing them—but learning every time. Later, I moved into Python with Django, where structure started to make sense and projects began to feel more real. I even explored desktop development using Blend for Visual Studio 2015, just to understand how software behaves beyond the browser.</p>
                            <p>Eventually, all those experiments led to something I'm proud of: Paulicode. It's more than just a project—it's proof of growth. I developed it as a platform where programming and cybersecurity learning can happen interactively between teachers and students. Every feature, from dashboards to anti-cheating mechanisms, reflects my mindset: build something useful, and build it responsibly.</p>
                            <p>Right now, I'm still a student—but I don't see that as a limitation. I see it as momentum. I'm actively learning modern frameworks like React and Next.js, pushing myself closer to industry standards. At the same time, I'm deeply focused on security, aiming to apply maximum protection in every system I build. For me, a beautiful website means nothing if it isn't safe.</p>
                            <p>What keeps me going isn't just the goal of becoming an expert web developer—it's the joy of figuring things out. I enjoy asking "why," digging through documentation, reading other people's code, and sometimes discovering answers hidden deep inside my own projects. Some details about me aren't written in words at all—they're written inside my code.</p>
                            <p>Tutoring my niece in Grade 6 math inspired Aralaro. Designing its diagrams and games gave me another way to explore how students learn.</p><p>This journey is far from over. I'm still learning, still experimenting, still breaking things and rebuilding them better. But one thing is certain: curiosity brought me here, and curiosity will take me further.</p>
                            <p><strong>And this? This is just the beginning.</strong></p></div>}
        <button className="bio-toggle" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Continue reading'} <span aria-hidden="true">{expanded ? '⌄' : '⌃'}</span>
        </button></section>
    case 'resume':
      return <>
        <p>Here’s a quick overview of my education and development work.</p>
        <div className="reply-card">
          <div className="flex items-center gap-3">
            <span className="tile"><FileText size={18} /></span>
            <div><h3>Bryan Kim Calipes</h3><p className="muted">Student, researcher, and developer</p></div>
          </div>
          <dl className="resume-details">
            <dt>Education</dt><dd>BS Information Technology</dd>
            <dt>Selected projects</dt><dd>Codoria and Aralaro</dd>
          </dl><a className="text-link inline-flex min-h-11 items-center" href={resumeFile} download="Bryan-Kim-Calipes-Resume.txt">Download résumé (.txt)</a>
        </div>
      </>
    case 'certificates':
      return <><p>Here are my certificates. Select a preview to see the full image.</p>
        <div className="reply-grid">{[['CSC', csc], ['Cybersecurity', cyber]].map(([name, image]) =>
          <details key={name} className="reply-card certificate"><summary><img src={image} alt="" /><strong>{name} Certificate</strong></summary><p className="my-2">{name === 'CSC' ? 'I took the CSC exam without studying beforehand and passed.' : 'On March 28, 2026, my team placed second in the Philippine Army’s TRON Cyber Defense Competition. We went toe-to-toe with the winning team and finished just behind them on points.'}</p>
            <a href={image} download={name + (name === 'CSC' ? '.png' : '.jpg')}>Download full image</a>
          </details>)}</div></>
    case 'skills':
      return <>
        <p>I work with these tools across web development, databases, and embedded projects.</p>
        <SkillCarousel />
      </>
    case 'projects':
      return <>
        <p>Here are two projects you can explore live.</p>
        <div className="reply-grid">
          {projectLinks.map(({ name, url, Icon }) => <article key={name} className="reply-card">
            <span className="tile"><Icon size={18} /></span>
            <h3 className="mt-3">{name}</h3>{name === 'Codoria' ? <p>My capstone project.</p> : <><p>I built Aralaro after tutoring my niece in Grade 6 math. Color highlights, diagrams, and math games help students work through each idea.</p><dl className="resume-details"><dt>Tester username</dt><dd><code>tester</code></dd><dt>Tester password</dt><dd><code>Iamtester.123</code></dd></dl></>}
            <a className="text-link inline-flex min-h-11 items-center" href={url} target="_blank" rel="noreferrer">Visit {name}</a>
          </article>)}
        </div>
      </>
    case 'contact':
      return <>
        <p>Send me an email or find me on GitHub and Facebook.</p>
        <ul className="contact-list">
          {contacts.map(({ name, detail, url, Icon }) => <li key={name}>
            <a href={url} target={name === 'Email' ? undefined : '_blank'} rel="noreferrer">
              <span className="tile"><Icon size={16} /></span>
              <span><strong>{name}</strong><span className="muted block">{detail}</span></span>
            </a>
          </li>)}
        </ul>
      </>
    default:
      return <p>I’m not sure which part of Bryan’s portfolio you’re looking for. Try “What has Bryan built?” or pick a topic below.</p>
  }
}

function App() {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [theme, setTheme] = useState(getSavedTheme)
  const [systemDark, setSystemDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches)
  const [menuOpen, setMenuOpen] = useState(false)
  const dialog = useRef(null)
  const menuButton = useRef(null)
  const scrollArea = useRef(null)
  const timer = useRef(null)
  const nextId = useRef(0)
  const activeTheme = theme ?? (systemDark ? 'dark' : 'light')

  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)')
    const update = event => setSystemDark(event.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme
  }, [activeTheme])

  useEffect(() => {
    if (menuOpen) dialog.current.showModal()
    else if (dialog.current.open) dialog.current.close()
  }, [menuOpen])

  useEffect(() => {
    const area = scrollArea.current
    const turn = area.querySelector('.turn:last-child')
    if (turn) area.scrollTop += turn.getBoundingClientRect().top - area.getBoundingClientRect().top
  }, [messages, pending])

  useEffect(() => () => clearTimeout(timer.current), [])

  function toggleTheme() {
    const next = activeTheme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem(themeKey, next) } catch {}
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function send(value) {
    const question = value.trim()
    if (!question || timer.current !== null) return
    const id = nextId.current++
    const topic = matchTopic(question)
    setDraft('')
    setMessages(previous => [...previous, { id, question }])
    setPending(true)
    closeMenu()
    timer.current = setTimeout(() => {
      setMessages(previous => previous.map(message => message.id === id ? { ...message, topic } : message))
      setPending(false)
      timer.current = null
    }, 610)
  }

  function reset() {
    clearTimeout(timer.current)
    timer.current = null
    setMessages([])
    setDraft('')
    setPending(false)
    closeMenu()
  }

  function navigation() {
    return <>
      <div className="brand flex items-center gap-3">
        <span className="brand-monogram" aria-hidden="true">BC</span>
        <div><strong>Bryan Calipes</strong><span>Personal Portfolio</span></div>
      </div>
      <button type="button" className="new-chat flex items-center gap-2.5" onClick={reset}><Plus size={18} /> New conversation</button>
      <nav aria-label="Portfolio topics" className="mt-8">
        <p className="nav-label">Explore</p>
        {topics.map(({ id, name, Icon }) => <button key={id} type="button" onClick={() => send(name)} disabled={pending} className="nav-button flex w-full items-center gap-3">
          <Icon size={17} /> {name}
        </button>)}
      </nav>
      <div className="sidebar-footer mt-auto flex items-center gap-2.5"><span>@{new Date().getFullYear()}</span></div>
    </>
  }

  return <div className="app-shell flex">
    <aside className="sidebar hidden flex-col lg:flex">{navigation()}</aside>
    <dialog ref={dialog} className="mobile-drawer" aria-label="Portfolio navigation" onClose={() => {
      setMenuOpen(false)
      if (menuButton.current?.getClientRects().length) menuButton.current.focus()
    }} onClick={event => { if (event.target === event.currentTarget) closeMenu() }}>
      <div className="drawer-content flex h-full flex-col">
        <button type="button" className="icon-button drawer-close" aria-label="Close navigation" onClick={closeMenu}><X size={20} /></button>
        {navigation()}
      </div>
    </dialog>
    <main className="main-layout min-w-0 flex-1">
      <header className="topbar flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <button ref={menuButton} type="button" className="icon-button lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
          <span className="header-label flex items-center gap-2"><MessageCircle size={17} /> <span>Ask Me</span></span>
        </div>
        <button type="button" className="theme-button flex items-center gap-2" onClick={toggleTheme} aria-label={activeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {activeTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          <span className="hidden sm:inline">{activeTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </header>

      <div className="scroll-area min-w-0" ref={scrollArea} role="region" aria-label="Conversation">
        {messages.length === 0 ? <section className="welcome content-width" aria-labelledby="welcome-title">
          <div className="cube-stage" aria-hidden="true"><div className="cube"><b>BC</b><b><Code2 /></b><b><Sparkles /></b></div></div>
          <h1 id="welcome-title">Hey, I’m <span>Bryan.</span></h1>
          <p className="intro">I’m a student, researcher, and developer. Ask me about my work or start with a topic below.</p>
          <div className="starter-grid">
            {topics.map(({ id, name, detail, Icon }) => <button key={id} className="starter text-left" type="button" onClick={() => send(name)}>
              <span className="tile"><Icon size={18} /></span>
              <strong>{name}</strong><span>{detail}</span>
            </button>)}
          </div>
        </section> : <section className="thread content-width" aria-label="Portfolio messages" aria-live="polite" aria-relevant="additions text">
          {messages.map(({ id, question, topic }) => <article key={id} className="turn">
            <div className="question-row"><p><span className="sr-only">You: </span>{question}</p></div>
            <div className="answer-row">
              <span className="tile assistant-mark"><Sparkles size={18} /></span>
              <div className="answer min-w-0">
                <h2>Bryan</h2>
                {topic ? <>
                  <Reply topic={topic} />
                  <div className="suggestions flex flex-wrap gap-2" aria-label="Follow-up suggestions">
                    {topics.filter(item => item.id !== topic).slice(0, topic === 'fallback' ? 5 : 3).map(({ id: key, name }) => <button className="chip" key={key} type="button" onClick={() => send(name)} disabled={pending}>{name}</button>)}
                  </div>
                </> : <div className="typing" role="status"><span className="sr-only">Preparing reply</span><i /><i /><i /></div>}
              </div>
            </div>
          </article>)}
        </section>}
      </div>

      <footer className="composer-area">
        <div className="content-width">
          <form className="composer flex items-center gap-2" onSubmit={event => { event.preventDefault(); send(draft) }}>
            <label htmlFor="question" className="sr-only">Ask a question about Bryan</label>
            <input id="question" className="min-w-0 flex-1" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask me anything about Bryan…" autoComplete="off" />
            <button className="send-button" type="submit" disabled={pending || !draft.trim()} aria-label="Send message"><ArrowUp size={21} /></button>
          </form>
          <p className="composer-note">Try “What has Bryan built?”</p>
        </div>
      </footer>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
