import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
// THEME ENGINE
// ═══════════════════════════════════════════════
function makeTheme(dark) {
  return {
    orange:"#FF5C00", orangeL:"#FF8A3D", orangePale:dark?"#2A1500":"#FFF3EB",
    dark:dark?"#F0E4D8":"#1A0F00", dark2:dark?"#D9C4B0":"#2E1A00",
    soft:dark?"#9A7A5A":"#9A6C3A", border:dark?"rgba(255,92,0,0.22)":"rgba(255,92,0,0.13)",
    bg:dark?"#100900":"#FDF8F5", card:dark?"#1C1008":"#FFFFFF",
    headerBg:dark?"#0A0500":"#1A0F00", inputBg:dark?"#1C1008":"#FFFFFF",
    shadow:dark?"0 8px 32px rgba(0,0,0,0.5)":"0 8px 32px rgba(255,92,0,0.10)",
    shadowMd:dark?"0 12px 40px rgba(0,0,0,0.6)":"0 12px 40px rgba(255,92,0,0.15)",
    isDark:dark,
  };
}

// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
const COURSES = [
  { id:1, emoji:"🐍", cat:"Tech", name:"Learn Python 3.9 | Start your Programming Career in 4 Hours", author:"CyberSkill Academy", price:89, rating:4.8, reviews:"3.4k", badge:"BESTSELLER", grad:"linear-gradient(135deg,#FF5C00,#FF8A3D)", lessons:32, hours:"4h", students:"12.1k", desc:"Learn Python in just 4 hours! Master the fundamentals, build practical skills, and start coding with this beginner-friendly course.", progress:0, url:"https://edubiz.com/courses/learn-python-39", telegram:"https://t.me/+BV0mkBqNuto1NGE0", locked:true },
  { id:2, emoji:"🤖", cat:"AI", name:"Artificial Intelligence A-Z™ 2023: Build an AI with ChatGPT4", author:"Hadelin de Ponteves, Kirill Eremenko", price:65, rating:4.9, reviews:"5.2k", badge:"HOT", grad:"linear-gradient(135deg,#1A0F00,#3D2200)", lessons:184, hours:"17.5h", students:"22.3k", desc:"Combine the power of Data Science, Machine Learning and Deep Learning to create powerful AI for Real-World applications!", progress:0, url:"https://edubiz.com/courses/ai-az-2023", telegram:"https://t.me/+BV0mkBqNuto1NGE0", locked:true },
  { id:3, emoji:"🏆", cat:"Tech", name:"100 Days of Code: The Complete Python Pro Bootcamp for 2023", author:"Dr. Angela Yu", price:78, rating:4.9, reviews:"8.7k", badge:"TOP RATED", grad:"linear-gradient(135deg,#FF8A3D,#FFB380)", lessons:229, hours:"60h", students:"45.6k", desc:"Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!", progress:0, url:"https://edubiz.com/courses/100-days-of-code", telegram:"https://t.me/+BV0mkBqNuto1NGE0", locked:true },
  { id:4, emoji:"⚛️", cat:"Tech", name:"Complete React Developer", author:"Andrei Neagoie, Yihua Zhang", price:50, rating:4.8, reviews:"6.1k", badge:"NEW", grad:"linear-gradient(135deg,#2E1A00,#7A4F20)", lessons:380, hours:"42.5h", students:"18.9k", desc:"Learn from React.js experts. The only React JS tutorial + projects course you need to learn React, build large-scale apps from scratch & get hired as a React Developer in 2024.", progress:0, url:"https://edubiz.com/courses/complete-react-developer", telegram:"https://t.me/+BV0mkBqNuto1NGE0", locked:true },
  { id:5, emoji:"📊", cat:"AI", name:"Python for Data Science and Machine Learning Bootcamp", author:"Jose Portilla", price:84.99, rating:4.8, reviews:"9.2k", badge:"BESTSELLER", grad:"linear-gradient(135deg,#1A0F00,#FF5C00)", lessons:165, hours:"25h", students:"31.4k", desc:"Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more! A complete data science bootcamp for beginners.", progress:0, url:"https://edubiz.com/courses/python-data-science-ml", telegram:"https://t.me/+BV0mkBqNuto1NGE0", locked:true },
];

const COMMUNITY_INIT = [
  { id:1, avatar:"👩🏾‍💼", name:"Amara Diallo", role:"Entrepreneur", time:"2m ago", content:"Just completed the Business Strategy course — the OKR framework completely changed how I run my team 🔥", likes:24, comments:8, liked:false },
  { id:2, avatar:"👨🏽‍💻", name:"Kwame Asante", role:"Developer", time:"15m ago", content:"Anyone want a weekly study session for the Python for Entrepreneurs course? Let's go! 💪", likes:17, comments:12, liked:false },
  { id:3, avatar:"👩🏻‍🏫", name:"Dr. Priya Mehta", role:"Educator", time:"1h ago", content:"Just dropped a bonus lesson on TikTok ads inside Growth Marketing Mastery. Free for all enrolled students 🎉", likes:89, comments:31, liked:true },
  { id:4, avatar:"👨🏾‍🎓", name:"Tolu Benson", role:"Student", time:"3h ago", content:"Passed my first quiz with 95%! The AI quiz feature is genuinely next level 💯", likes:45, comments:6, liked:false },
];

const NOTIFS_INIT = [
  { id:1, type:"course", emoji:"📊", title:"New lesson available", body:"Business Strategy: Module 4 — Competitive Analysis is now live.", time:"2m ago", read:false, action:"View Lesson" },
  { id:2, type:"community", emoji:"💬", title:"Kwame replied to your post", body:"\"Count me in for the study session! Saturday works great.\"", time:"8m ago", read:false, action:"Reply" },
  { id:3, type:"streak", emoji:"🔥", title:"Streak at risk!", body:"You haven't learned today. Keep your 7-day streak alive!", time:"1h ago", read:false, action:"Continue" },
  { id:4, type:"achievement", emoji:"🏆", title:"Badge Unlocked — Fast Finisher", body:"You completed a course in under 3 days!", time:"2h ago", read:true, action:"View Badge" },
  { id:5, type:"promo", emoji:"💸", title:"Flash Sale — 40% Off", body:"Growth Marketing Mastery is 40% off for 6 hours only.", time:"3h ago", read:true, action:"Get Deal" },
  { id:6, type:"system", emoji:"🤖", title:"AI Study Tip", body:"Based on your progress, revise Module 2 before taking the quiz.", time:"1d ago", read:true, action:"Study Now" },
];

const PLANS = [
  { id:"starter", name:"Starter", price:0, period:"Free forever", features:["5 free courses","Community access","Basic progress tracking","Mobile app"] },
  { id:"pro", name:"Pro", price:19, period:"per month", features:["Unlimited courses","AI Study Chatbot","Quiz generator","Certificates","Priority support"], popular:true },
  { id:"business", name:"Business", price:49, period:"per month", features:["Everything in Pro","Team dashboard (10 seats)","Custom learning paths","Analytics & reports","Dedicated manager"] },
];

const ONBOARDING_STEPS = [
  { id:"welcome", emoji:"👋", title:"Welcome to\nEduBiz Connect", subtitle:"Your all-in-one platform for education, business & growth.", type:"intro" },
  { id:"role", emoji:"🎭", title:"What's your role?", subtitle:"We'll personalise your experience based on who you are.", type:"choice", options:[{id:"student",emoji:"🎓",label:"Student",desc:"I want to learn new skills"},{id:"educator",emoji:"📚",label:"Educator",desc:"I want to teach and share"},{id:"entrepreneur",emoji:"💼",label:"Entrepreneur",desc:"I want to grow my business"},{id:"professional",emoji:"🏢",label:"Professional",desc:"I want to upskill my career"}] },
  { id:"interests", emoji:"🎯", title:"What interests you?", subtitle:"Pick topics you'd like to explore.", type:"multi", options:[{id:"business",emoji:"📊",label:"Business"},{id:"tech",emoji:"💻",label:"Technology"},{id:"marketing",emoji:"📣",label:"Marketing"},{id:"finance",emoji:"💰",label:"Finance"},{id:"design",emoji:"🎨",label:"Design"},{id:"leadership",emoji:"🧭",label:"Leadership"},{id:"ai",emoji:"🤖",label:"AI & Data"},{id:"startup",emoji:"🚀",label:"Startups"}] },
  { id:"level", emoji:"📈", title:"What's your level?", subtitle:"We'll recommend the right courses for you.", type:"choice", options:[{id:"beginner",emoji:"🌱",label:"Beginner",desc:"Just getting started"},{id:"intermediate",emoji:"⚡",label:"Intermediate",desc:"Some experience"},{id:"advanced",emoji:"🔥",label:"Advanced",desc:"Expert-level content"}] },
  { id:"goal", emoji:"🏆", title:"Set your weekly goal", subtitle:"Stay on track with a learning target.", type:"choice", options:[{id:"casual",emoji:"☕",label:"Casual",desc:"1–2 hrs/week"},{id:"regular",emoji:"📘",label:"Regular",desc:"3–5 hrs/week"},{id:"intensive",emoji:"🔥",label:"Intensive",desc:"6–10 hrs/week"}] },
  { id:"done", emoji:"🎉", title:"You're all set!", subtitle:"Your personalised learning journey begins now.", type:"done" },
];

const INSTRUCTOR_COURSES = [
  { id:1, name:"Business Strategy Fundamentals", students:8421, revenue:41260, rating:4.9, lessons:24, status:"published", completion:87, emoji:"📊", grad:"linear-gradient(135deg,#FF5C00,#FF8A3D)" },
  { id:2, name:"Advanced Entrepreneurship", students:3140, revenue:18840, rating:4.7, lessons:18, status:"published", completion:72, emoji:"🚀", grad:"linear-gradient(135deg,#1A0F00,#3D2200)" },
  { id:3, name:"Leadership Masterclass", students:0, revenue:0, rating:0, lessons:8, status:"draft", completion:0, emoji:"🧭", grad:"linear-gradient(135deg,#FF8A3D,#FFB380)" },
];

// ═══════════════════════════════════════════════
// SHARED UI
// ═══════════════════════════════════════════════
function Toast({ msg, T }) {
  if (!msg) return null;
  return <div style={{ position:"fixed",top:36,left:"50%",transform:"translateX(-50%)",background:T.headerBg,color:"white",padding:"13px 22px",borderRadius:50,fontSize:14,fontWeight:500,zIndex:9999,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",whiteSpace:"nowrap",pointerEvents:"none",border:"1px solid rgba(255,92,0,0.3)" }}>{msg}</div>;
}

function Toggle({ on, onToggle }) {
  return <div onClick={onToggle} style={{ width:50,height:28,borderRadius:50,background:on?"linear-gradient(135deg,#FF5C00,#FF8A3D)":"rgba(150,150,150,0.3)",cursor:"pointer",position:"relative",transition:"background 0.3s",flexShrink:0 }}><div style={{ position:"absolute",top:3,left:on?24:3,width:22,height:22,borderRadius:"50%",background:"white",boxShadow:"0 2px 6px rgba(0,0,0,0.25)",transition:"left 0.3s" }} /></div>;
}

function BottomNav({ screen, setScreen, T, unreadCount }) {
  const tabs = [
    { id:"home", icon:"🏠", label:"Home" },
    { id:"courses", icon:"📚", label:"Courses" },
    { id:"community", icon:"🤝", label:"Connect" },
    { id:"progress", icon:"📈", label:"Progress" },
    { id:"profile", icon:"👤", label:"Profile" },
  ];
  return (
    <div style={{ position:"sticky",bottom:0,background:T.card,borderTop:`1px solid ${T.border}`,display:"flex",padding:"10px 0 20px",boxShadow:"0 -8px 32px rgba(0,0,0,0.08)",zIndex:50,transition:"background 0.3s" }}>
      {tabs.map(t => (
        <div key={t.id} onClick={() => setScreen(t.id)} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",position:"relative" }}>
          <span style={{ fontSize:22 }}>{t.icon}</span>
          {t.id==="community" && unreadCount>0 && <div style={{ position:"absolute",top:0,right:"18%",width:16,height:16,borderRadius:"50%",background:"#FF5C00",fontSize:9,fontWeight:900,color:"white",display:"flex",alignItems:"center",justifyContent:"center" }}>{unreadCount}</div>}
          <span style={{ fontSize:10,fontWeight:screen===t.id?700:500,color:screen===t.id?"#FF5C00":T.soft }}>{t.label}</span>
          {screen===t.id && <span style={{ width:4,height:4,borderRadius:"50%",background:"#FF5C00" }} />}
        </div>
      ))}
    </div>
  );
}

function AppHeader({ T, title, back, onBack, right, sub }) {
  return (
    <div style={{ background:T.headerBg,padding:"52px 24px 20px",position:"relative",overflow:"hidden",transition:"background 0.3s" }}>
      <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)",pointerEvents:"none" }} />
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          {back && <button onClick={onBack} style={{ width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.1)",border:"none",color:"white",fontSize:18,cursor:"pointer" }}>←</button>}
          <div>
            <div style={{ fontSize:20,fontWeight:900,color:"white" }}>{title}</div>
            {sub && <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:2 }}>{sub}</div>}
          </div>
        </div>
        {right}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// AI CHATBOT
// ═══════════════════════════════════════════════
function ChatBot({ T, onClose }) {
  const [msgs, setMsgs] = useState([{ role:"assistant", content:"Hi! I'm your EduBiz AI assistant 🤖 Ask me anything about your courses, career path, or business ideas!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim(); setInput(""); setLoading(true);
    setMsgs(m => [...m, { role:"user", content:userMsg }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:"You are an AI study assistant for EduBiz Connect, an ed-tech platform. Help users with business, tech, marketing, finance, and design. Be concise, encouraging. Keep answers under 150 words unless asked for detail.", messages:[...msgs,{role:"user",content:userMsg}].map(m=>({role:m.role,content:m.content})) }) });
      const data = await res.json();
      setMsgs(m => [...m, { role:"assistant", content:data.content?.[0]?.text || "Try again shortly." }]);
    } catch { setMsgs(m => [...m, { role:"assistant", content:"Connection error. Please try again." }]); }
    setLoading(false);
  }

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
      <div style={{ background:T.bg,borderRadius:"24px 24px 0 0",maxHeight:"85vh",display:"flex",flexDirection:"column" }}>
        <div style={{ padding:"20px 24px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>🤖</div>
            <div><div style={{ fontSize:15,fontWeight:800,color:T.dark }}>EduBiz AI</div><div style={{ fontSize:12,color:"#22c55e",fontWeight:500 }}>● Online</div></div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:T.soft }}>✕</button>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12 }}>
          {msgs.map((m,i) => (
            <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"82%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#FF5C00,#FF8A3D)":T.card,color:m.role==="user"?"white":T.dark,fontSize:14,lineHeight:1.5,boxShadow:m.role==="user"?"0 4px 16px rgba(255,92,0,0.3)":T.shadow }}>{m.content}</div>
            </div>
          ))}
          {loading && <div style={{ display:"flex",justifyContent:"flex-start" }}><div style={{ padding:"12px 16px",borderRadius:"18px 18px 18px 4px",background:T.card,boxShadow:T.shadow,fontSize:18,letterSpacing:3,color:T.soft }}>•••</div></div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding:"12px 16px 28px",borderTop:`1px solid ${T.border}`,display:"flex",gap:10 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything..." style={{ flex:1,padding:"13px 16px",borderRadius:50,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:14,outline:"none",fontFamily:"inherit",color:T.dark }} />
          <button onClick={send} disabled={loading} style={{ width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",border:"none",cursor:"pointer",fontSize:20,boxShadow:"0 4px 16px rgba(255,92,0,0.4)" }}>→</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// AI QUIZ
// ═══════════════════════════════════════════════
function QuizModal({ course, T, onClose }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { generate(); }, []);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:"Quiz generator. Respond ONLY with valid JSON, no markdown.", messages:[{role:"user",content:`Generate a 4-question multiple choice quiz for: "${course.name}". Return JSON: {"questions":[{"q":"...","options":{"a":"...","b":"...","c":"...","d":"..."},"answer":"a"}]}`}] }) });
      const data = await res.json();
      const clean = (data.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim();
      setQuiz(JSON.parse(clean));
    } catch { setQuiz({questions:[{q:"What is the primary goal of business strategy?",options:{a:"Maximize short-term profits",b:"Create sustainable competitive advantage",c:"Reduce headcount",d:"Avoid competition"},answer:"b"}]}); }
    setLoading(false);
  }

  const score = submitted ? quiz.questions.filter((q,i)=>selected[i]===q.answer).length : 0;

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:200,display:"flex",alignItems:"flex-end" }}>
      <div style={{ background:T.bg,borderRadius:"24px 24px 0 0",width:"100%",maxHeight:"90vh",overflowY:"auto" }}>
        <div style={{ padding:"20px 24px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div><div style={{ fontSize:16,fontWeight:900,color:T.dark }}>⚡ AI Quiz</div><div style={{ fontSize:12,color:T.soft }}>{course.name}</div></div>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:T.soft }}>✕</button>
        </div>
        <div style={{ padding:"20px 24px 40px" }}>
          {loading ? <div style={{ textAlign:"center",padding:"40px 0",color:T.soft }}><div style={{ fontSize:40,marginBottom:12 }}>🤖</div><div style={{ fontWeight:600,color:T.dark }}>Generating quiz...</div></div>
          : submitted ? (
            <div style={{ textAlign:"center",padding:"20px 0" }}>
              <div style={{ fontSize:60,marginBottom:12 }}>{score===quiz.questions.length?"🏆":score>=2?"🎉":"💪"}</div>
              <div style={{ fontSize:32,fontWeight:900,color:"#FF5C00" }}>{score}/{quiz.questions.length}</div>
              <div style={{ fontSize:16,color:T.soft,marginBottom:24 }}>{score===quiz.questions.length?"Perfect!":score>=2?"Good job!":"Keep practising!"}</div>
              <button onClick={()=>{setSelected({});setSubmitted(false);generate();}} style={{ padding:"14px 32px",borderRadius:50,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontWeight:700,border:"none",cursor:"pointer",fontSize:15 }}>Try Again</button>
            </div>
          ) : (
            <>
              {quiz?.questions?.map((q,i) => (
                <div key={i} style={{ marginBottom:24 }}>
                  <div style={{ fontSize:15,fontWeight:700,color:T.dark,marginBottom:12 }}>Q{i+1}. {q.q}</div>
                  {Object.entries(q.options).map(([k,v]) => (
                    <div key={k} onClick={()=>setSelected(s=>({...s,[i]:k}))} style={{ padding:"12px 16px",borderRadius:12,border:`2px solid ${selected[i]===k?"#FF5C00":T.border}`,background:selected[i]===k?T.orangePale:T.card,marginBottom:8,cursor:"pointer",fontSize:14,color:selected[i]===k?"#FF5C00":T.dark,fontWeight:selected[i]===k?600:400,display:"flex",gap:10,alignItems:"center" }}>
                      <span style={{ width:24,height:24,borderRadius:"50%",background:selected[i]===k?"#FF5C00":"transparent",border:`2px solid ${selected[i]===k?"#FF5C00":T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:700,flexShrink:0 }}>{selected[i]===k?"✓":k.toUpperCase()}</span>{v}
                    </div>
                  ))}
                </div>
              ))}
              <button onClick={()=>Object.keys(selected).length===quiz.questions.length&&setSubmitted(true)} style={{ width:"100%",padding:16,borderRadius:50,background:Object.keys(selected).length===quiz.questions.length?"linear-gradient(135deg,#FF5C00,#FF8A3D)":"#ccc",color:"white",fontWeight:700,border:"none",cursor:"pointer",fontSize:16 }}>Submit Answers</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// AI SUMMARY
// ═══════════════════════════════════════════════
function SummaryModal({ course, T, onClose }) {
  const [summary, setSummary] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => { generate(); }, []);
  async function generate() {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:"Course summarizer for an ed-tech platform. Be concise and structured.", messages:[{role:"user",content:`Write a 3-section summary for: "${course.name}" - ${course.desc}. Format: 1) What You'll Learn (3 bullet points with emojis), 2) Who It's For (2 sentences), 3) Key Takeaway (1 powerful sentence).`}] }) });
      const data = await res.json(); setSummary(data.content?.[0]?.text || "Summary unavailable.");
    } catch { setSummary("Summary unavailable. Please try again."); }
    setLoading(false);
  }
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:200,display:"flex",alignItems:"flex-end" }}>
      <div style={{ background:T.bg,borderRadius:"24px 24px 0 0",width:"100%",maxHeight:"85vh",overflowY:"auto" }}>
        <div style={{ padding:"20px 24px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div><div style={{ fontSize:16,fontWeight:900,color:T.dark }}>✨ AI Summary</div><div style={{ fontSize:12,color:T.soft }}>{course.name}</div></div>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",color:T.soft }}>✕</button>
        </div>
        <div style={{ padding:"20px 24px 40px" }}>
          {loading ? <div style={{ textAlign:"center",padding:"40px 0",color:T.soft }}><div style={{ fontSize:40,marginBottom:12 }}>✨</div><div style={{ fontWeight:600,color:T.dark }}>Generating summary...</div></div>
          : <div style={{ fontSize:15,lineHeight:1.8,color:T.dark,whiteSpace:"pre-wrap" }}>{summary}</div>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════
function OnboardingFlow({ T, onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ role:null, interests:[], level:null, goal:null });
  const current = ONBOARDING_STEPS[step];

  function canAdvance() {
    if (["intro","done"].includes(current.type)) return true;
    if (current.id==="interests") return answers.interests.length>0;
    return !!answers[current.id];
  }

  function next() { step < ONBOARDING_STEPS.length-1 ? setStep(s=>s+1) : onComplete(); }

  return (
    <div style={{ minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",transition:"background 0.3s" }}>
      <div style={{ padding:"52px 24px 0" }}>
        <div style={{ display:"flex",gap:6,marginBottom:6 }}>
          {ONBOARDING_STEPS.map((_,i) => <div key={i} style={{ flex:1,height:4,borderRadius:50,background:i<=step?"linear-gradient(90deg,#FF5C00,#FF8A3D)":T.border,transition:"background 0.4s" }} />)}
        </div>
        <div style={{ fontSize:12,color:T.soft,textAlign:"right" }}>{step+1} / {ONBOARDING_STEPS.length}</div>
      </div>

      <div style={{ flex:1,padding:"20px 24px 0",overflowY:"auto" }}>
        {step>0 && current.type!=="done" && <button onClick={()=>setStep(s=>s-1)} style={{ background:"none",border:"none",fontSize:14,color:T.soft,cursor:"pointer",marginBottom:16,padding:0,fontWeight:600 }}>← Back</button>}
        <div style={{ textAlign:["intro","done"].includes(current.type)?"center":"left",marginBottom:24 }}>
          <div style={{ fontSize:["intro","done"].includes(current.type)?64:48,marginBottom:14,textAlign:"center" }}>{current.emoji}</div>
          <h2 style={{ fontSize:26,fontWeight:900,color:T.dark,lineHeight:1.2,marginBottom:10,whiteSpace:"pre-line" }}>{current.title}</h2>
          <p style={{ fontSize:15,color:T.soft,lineHeight:1.6 }}>{current.subtitle}</p>
        </div>

        {current.type==="choice" && (
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {current.options.map(opt => {
              const sel = answers[current.id]===opt.id;
              return <div key={opt.id} onClick={()=>setAnswers(a=>({...a,[current.id]:opt.id}))} style={{ display:"flex",gap:14,alignItems:"center",padding:"16px 18px",borderRadius:18,border:`2px solid ${sel?"#FF5C00":T.border}`,background:sel?T.orangePale:T.card,cursor:"pointer",transition:"all 0.2s" }}>
                <span style={{ fontSize:28 }}>{opt.emoji}</span>
                <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:800,color:sel?"#FF5C00":T.dark }}>{opt.label}</div><div style={{ fontSize:13,color:T.soft,marginTop:2 }}>{opt.desc}</div></div>
                <div style={{ width:22,height:22,borderRadius:"50%",border:`2px solid ${sel?"#FF5C00":T.border}`,background:sel?"#FF5C00":"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:700 }}>{sel?"✓":""}</div>
              </div>;
            })}
          </div>
        )}

        {current.type==="multi" && (
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {current.options.map(opt => {
              const sel = answers.interests.includes(opt.id);
              return <div key={opt.id} onClick={()=>setAnswers(a=>({...a,interests:sel?a.interests.filter(x=>x!==opt.id):[...a.interests,opt.id]}))} style={{ padding:"16px 12px",borderRadius:18,border:`2px solid ${sel?"#FF5C00":T.border}`,background:sel?T.orangePale:T.card,cursor:"pointer",textAlign:"center",transition:"all 0.2s" }}>
                <div style={{ fontSize:28,marginBottom:8 }}>{opt.emoji}</div>
                <div style={{ fontSize:13,fontWeight:sel?700:500,color:sel?"#FF5C00":T.dark }}>{opt.label}</div>
              </div>;
            })}
          </div>
        )}
      </div>

      <div style={{ padding:"24px 24px 32px" }}>
        <button onClick={next} disabled={!canAdvance()} style={{ width:"100%",padding:18,borderRadius:20,background:canAdvance()?"linear-gradient(135deg,#FF5C00,#FF8A3D)":"#ccc",color:"white",fontSize:16,fontWeight:700,border:"none",cursor:canAdvance()?"pointer":"not-allowed",boxShadow:canAdvance()?"0 8px 24px rgba(255,92,0,0.4)":"none",transition:"all 0.2s" }}>
          {current.type==="done"?"Start Learning 🚀":current.type==="intro"?"Let's Begin →":"Continue →"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════
function HomeScreen({ T, setScreen, setCourse, openChat, showToast, userName }) {
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat==="All" ? COURSES
    : activeCat==="Python" ? COURSES.filter(c=>c.name.toLowerCase().includes("python"))
    : activeCat==="React" ? COURSES.filter(c=>c.name.toLowerCase().includes("react"))
    : activeCat==="Data Science" ? COURSES.filter(c=>c.name.toLowerCase().includes("data science"))
    : COURSES.filter(c=>c.cat===activeCat);
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <div style={{ background:T.headerBg,padding:"52px 24px 24px",position:"relative",overflow:"hidden",transition:"background 0.3s" }}>
        <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)",pointerEvents:"none" }} />
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1 }}>
          <div><div style={{ fontSize:13,color:"rgba(255,255,255,0.5)" }}>Good morning 👋</div><div style={{ fontSize:22,fontWeight:900,color:"white",marginTop:2 }}>Welcome, <span style={{color:"#FF5C00"}}>{userName||"there"}!</span></div></div>
          <div onClick={()=>setScreen("profile")} style={{ width:46,height:46,borderRadius:14,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"white",fontSize:18,boxShadow:"0 4px 16px rgba(255,92,0,0.4)",cursor:"pointer" }}>{(userName||"?")[0].toUpperCase()}</div>
        </div>
        <div style={{ marginTop:18,display:"flex",gap:10,position:"relative",zIndex:1 }}>
          <div style={{ flex:1,position:"relative" }}>
            <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16 }}>🔍</span>
            <input placeholder="Search courses, mentors..." style={{ width:"100%",padding:"13px 16px 13px 42px",borderRadius:14,border:"none",background:"rgba(255,255,255,0.1)",color:"white",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box" }} />
          </div>
          <button onClick={openChat} style={{ width:48,height:48,borderRadius:14,background:"#FF5C00",border:"none",fontSize:20,cursor:"pointer",flexShrink:0,boxShadow:"0 4px 16px rgba(255,92,0,0.4)" }}>🤖</button>
        </div>
      </div>

      <div style={{ display:"flex",gap:12,padding:"22px 24px 8px",overflowX:"auto" }}>
        {[["🔥","7","Day Streak",true],["📘","4","Enrolled",false],["🏆","12","Badges",false],["⏱️","38h","Learned",false]].map(([ic,n,l,h])=>(
          <div key={l} style={{ flexShrink:0,padding:"16px 18px",borderRadius:20,background:h?"#FF5C00":T.card,boxShadow:T.shadow,minWidth:110,border:h?"none":`1px solid ${T.border}`,transition:"background 0.3s" }}>
            <span style={{ fontSize:20 }}>{ic}</span>
            <span style={{ display:"block",fontSize:24,fontWeight:900,color:h?"white":"#FF5C00",marginTop:4 }}>{n}</span>
            <span style={{ fontSize:12,color:h?"rgba(255,255,255,0.75)":T.soft,display:"block",marginTop:2,fontWeight:500 }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px 12px" }}>
        <span style={{ fontSize:18,fontWeight:900,color:T.dark }}>Featured</span>
      </div>
      <div style={{ padding:"0 24px 8px" }}>
        <div onClick={()=>{setCourse(COURSES[2]);setScreen("courseDetail");}} style={{ borderRadius:20,overflow:"hidden",cursor:"pointer",background:T.headerBg,position:"relative",boxShadow:T.shadowMd,display:"flex",alignItems:"center" }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 70% at 80% 50%,rgba(255,92,0,0.4),transparent)" }} />
          <div style={{ padding:24,flex:1,position:"relative",zIndex:1 }}>
            <div style={{ display:"inline-block",padding:"5px 12px",borderRadius:50,background:"#FF5C00",color:"white",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10 }}>🔥 Top Rated</div>
            <div style={{ fontSize:18,fontWeight:900,color:"white",lineHeight:1.2,marginBottom:8 }}>100 Days of Code: Python Pro Bootcamp</div>
            <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)" }}>Dr. Angela Yu · 229 lessons · 45.6k enrolled</div>
          </div>
          <div style={{ fontSize:54,padding:"0 20px 0 0",opacity:0.7 }}>🏆</div>
        </div>
      </div>

      <div style={{ display:"flex",gap:8,padding:"16px 24px 12px",overflowX:"auto" }}>
        {["All","Tech","AI","Python","React","Data Science"].map(c=>(
          <div key={c} onClick={()=>setActiveCat(c)} style={{ flexShrink:0,padding:"8px 18px",borderRadius:50,border:activeCat===c?"none":`2px solid ${T.border}`,background:activeCat===c?"#FF5C00":T.card,color:activeCat===c?"white":T.soft,fontSize:13,fontWeight:activeCat===c?700:500,cursor:"pointer",whiteSpace:"nowrap" }}>{c}</div>
        ))}
      </div>

      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px 12px" }}>
        <span style={{ fontSize:18,fontWeight:900,color:T.dark }}>Popular Courses</span>
        <span onClick={()=>setScreen("courses")} style={{ fontSize:13,color:"#FF5C00",fontWeight:700,cursor:"pointer" }}>View all</span>
      </div>
      <div style={{ display:"flex",gap:16,padding:"0 24px 8px",overflowX:"auto" }}>
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>{setCourse(c);setScreen("courseDetail");}} style={{ flexShrink:0,width:210,background:T.card,borderRadius:20,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden",cursor:"pointer" }}>
            <div style={{ height:110,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,background:c.grad,position:"relative" }}>
              <div style={{ position:"absolute",top:10,left:10,padding:"4px 10px",borderRadius:50,fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.25)",color:"white" }}>{c.badge}</div>
              {c.emoji}
            </div>
            <div style={{ padding:14 }}>
              <div style={{ fontSize:11,fontWeight:700,color:"#FF5C00",textTransform:"uppercase",letterSpacing:0.5 }}>{c.cat}</div>
              <div style={{ fontSize:14,fontWeight:800,color:T.dark,margin:"4px 0",lineHeight:1.3 }}>{c.name}</div>
              <div style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:T.soft,marginTop:4 }}>⭐ {c.rating} ({c.reviews})</div>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8 }}>
                <span style={{ fontSize:12,color:T.soft }}>{c.author}</span>
                <span style={{ fontSize:15,fontWeight:900,color:"#FF5C00" }}>{c.price===0?"Free":`$${c.price}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COURSE DETAIL
// ═══════════════════════════════════════════════
function CourseDetailScreen({ course, T, setScreen, showToast, userEmail }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [paying, setPaying] = useState(false);
  const enrolled = course.progress > 0;

  function payCourse(course) {
    if (course.price === 0) { showToast("Enrolling for free..."); return; }
    setPaying(true);
    const existingScript = document.getElementById("paystack-script");
    if (existingScript && window.PaystackPop) { openCoursePayment(course); return; }
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => openCoursePayment(course);
    script.onerror = () => { showToast("Failed to load Paystack."); setPaying(false); };
    document.head.appendChild(script);
  }

  function openCoursePayment(course) {
    setPaying(false);
    try {
      // Convert USD to NGN (approx rate: 1 USD = 1600 NGN)
      const amountNGN = course.price * 1600;
      const handler = window.PaystackPop.setup({
        key: "pk_live_c6ef69a1bb5595a6e9b2aab7668c3d011ac28f3d",
        email: userEmail || "user@edubizconnect.com",
        amount: amountNGN * 100, // kobo
        currency: "NGN",
        ref: "EDU_COURSE_" + course.id + "_" + Date.now(),
        metadata: {
          custom_fields:[
            { display_name:"Course", variable_name:"course", value:course.name },
            { display_name:"Price (USD)", variable_name:"price_usd", value:"$"+course.price },
          ]
        },
        callback: (response) => {
          showToast("🎉 Payment successful! Join Telegram for access.");
        },
        onClose: () => { showToast("Payment cancelled."); },
      });
      handler.openIframe();
    } catch(e) {
      showToast("Payment error. Please try again.");
    }
  }
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <div style={{ height:200,background:course.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,position:"relative" }}>
        <button onClick={()=>setScreen("home")} style={{ position:"absolute",top:52,left:20,width:40,height:40,borderRadius:12,background:"rgba(0,0,0,0.3)",border:"none",color:"white",fontSize:18,cursor:"pointer" }}>←</button>
        {course.emoji}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:36,background:T.bg,borderRadius:"20px 20px 0 0",transition:"background 0.3s" }} />
      </div>
      <div style={{ padding:"0 24px",flex:1,overflowY:"auto" }}>
        <div style={{ display:"inline-block",padding:"4px 12px",borderRadius:50,background:T.orangePale,color:"#FF5C00",fontSize:11,fontWeight:700,marginBottom:10 }}>{course.cat}</div>
        <h1 style={{ fontSize:24,fontWeight:900,color:T.dark,lineHeight:1.2,marginBottom:8 }}>{course.name}</h1>
        <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:16,flexWrap:"wrap" }}>
          <span style={{ fontSize:14,color:T.soft }}>by {course.author}</span>
          <span style={{ color:T.border }}>·</span>
          <span style={{ fontSize:14 }}>⭐ {course.rating} ({course.reviews})</span>
        </div>
        <div style={{ display:"flex",gap:12,marginBottom:20 }}>
          {[[course.lessons,"Lessons","📖"],[course.hours,"Duration","⏱️"],[course.students,"Students","👥"]].map(([v,l,ic])=>(
            <div key={l} style={{ flex:1,padding:"12px 8px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,textAlign:"center",boxShadow:T.shadow }}>
              <div style={{ fontSize:16 }}>{ic}</div><div style={{ fontSize:15,fontWeight:900,color:T.dark }}>{v}</div><div style={{ fontSize:11,color:T.soft }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:16,fontWeight:800,color:T.dark,marginBottom:8 }}>About this course</div>
          <div style={{ fontSize:14,color:T.soft,lineHeight:1.7 }}>{course.desc}</div>
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:16,fontWeight:800,color:T.dark,marginBottom:12 }}>🤖 AI Tools</div>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={()=>setShowSummary(true)} style={{ flex:1,padding:"14px 10px",borderRadius:16,background:T.orangePale,border:`2px solid ${T.border}`,cursor:"pointer",fontSize:13,fontWeight:700,color:"#FF5C00" }}>✨ AI Summary</button>
            <button onClick={()=>setShowQuiz(true)} style={{ flex:1,padding:"14px 10px",borderRadius:16,background:T.orangePale,border:`2px solid ${T.border}`,cursor:"pointer",fontSize:13,fontWeight:700,color:"#FF5C00" }}>⚡ Take Quiz</button>
          </div>
        </div>
        {enrolled && (
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ fontSize:14,fontWeight:700,color:T.dark }}>Your Progress</span>
              <span style={{ fontSize:14,fontWeight:800,color:"#FF5C00" }}>{course.progress}%</span>
            </div>
            <div style={{ height:10,borderRadius:50,background:T.orangePale,overflow:"hidden" }}>
              <div style={{ height:"100%",width:`${course.progress}%`,background:"linear-gradient(90deg,#FF5C00,#FF8A3D)",borderRadius:50 }} />
            </div>
          </div>
        )}
        <div style={{ paddingBottom:32 }}>
          <div style={{ fontSize:28,fontWeight:900,color:"#FF5C00",marginBottom:16 }}>{course.price===0?"Free":`$${course.price}`}</div>

          {/* Lock banner */}
          {course.locked && (
            <div style={{ padding:18,borderRadius:20,background:T.headerBg,marginBottom:16,textAlign:"center",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)" }} />
              <div style={{ fontSize:32,marginBottom:8 }}>🔒</div>
              <div style={{ fontSize:15,fontWeight:800,color:"white",marginBottom:6 }}>Course Access via Telegram</div>
              <div style={{ fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.6 }}>After payment, you'll receive full course access through our Telegram channel within minutes.</div>
            </div>
          )}

          {/* Primary CTA — one-time Paystack payment per course */}
          <button onClick={()=>payCourse(course)} style={{ display:"block",width:"100%",padding:18,borderRadius:20,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:16,fontWeight:700,border:"none",cursor:"pointer",boxShadow:"0 8px 24px rgba(255,92,0,0.4)",marginBottom:12,textAlign:"center",boxSizing:"border-box" }}>
            {course.price===0?"Enroll for Free →":`Pay $${course.price} Once & Get Access →`}
          </button>

          {/* After payment — Telegram access */}
          <div style={{ padding:16,borderRadius:18,background:T.orangePale,border:`2px solid ${T.border}`,marginBottom:12 }}>
            <div style={{ fontSize:13,fontWeight:700,color:"#FF5C00",marginBottom:10 }}>📦 What happens after payment:</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {["✅ One-time payment — no subscription","✈️ Join our Telegram channel","📚 Receive your course instantly","🙋 Get instructor support"].map(s=>(
                <div key={s} style={{ fontSize:13,color:T.dark }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Telegram link */}
          <a href="https://t.me/+BV0mkBqNuto1NGE0" target="_blank" rel="noopener noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:15,borderRadius:20,background:"#229ED9",color:"white",fontSize:15,fontWeight:700,marginBottom:12,textAlign:"center",textDecoration:"none",boxSizing:"border-box",boxShadow:"0 4px 16px rgba(34,158,217,0.35)" }}>
            <span style={{ fontSize:20 }}>✈️</span> Join Telegram Channel
          </a>

          {/* WhatsApp group */}
          <a href="https://chat.whatsapp.com/K3MGDP3eSAo5mB0x09pKuc?mode=gi_t" target="_blank" rel="noopener noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:15,borderRadius:20,background:"#25D366",color:"white",fontSize:15,fontWeight:700,marginBottom:12,textAlign:"center",textDecoration:"none",boxSizing:"border-box",boxShadow:"0 4px 16px rgba(37,211,102,0.35)" }}>
            <span style={{ fontSize:20 }}>💬</span> Join WhatsApp Group
          </a>

          {/* WhatsApp direct chat */}
          <a href="https://wa.me/2349022953830" target="_blank" rel="noopener noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:15,borderRadius:20,background:"#128C7E",color:"white",fontSize:15,fontWeight:700,marginBottom:12,textAlign:"center",textDecoration:"none",boxSizing:"border-box",boxShadow:"0 4px 16px rgba(18,140,126,0.35)" }}>
            <span style={{ fontSize:20 }}>🙋</span> Chat with Instructor on WhatsApp
          </a>
        </div>
      </div>
      {showQuiz && <QuizModal course={course} T={T} onClose={()=>setShowQuiz(false)} />}
      {showSummary && <SummaryModal course={course} T={T} onClose={()=>setShowSummary(false)} />}
    </div>
  );
}

// ═══════════════════════════════════════════════
// COURSES LIST
// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════
// TELEGRAM FEED
// ═══════════════════════════════════════════════
function TelegramFeed({ T, showToast }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BOT_TOKEN = "8679334924:AAGNnqDmHJ8cAENoHqslCOp2VMfInloBtww";

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true); setError(null);
    const CHAT_ID = "6316249047";
    try {
      // Fetch messages directly from the group using getHistory via bot
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?limit=100&offset=-100`);
      const data = await res.json();
      if (!data.ok) throw new Error("Bot error: " + JSON.stringify(data));
      
      // Filter messages from this specific chat
      const messages = data.result
        .map(u => u.channel_post || u.message)
        .filter(m => m && m.text && m.text.length > 5 && String(m.chat.id) === CHAT_ID)
        .reverse();

      if (messages.length === 0) {
        // Try without chat filter — show all messages
        const allMsgs = data.result
          .map(u => u.channel_post || u.message)
          .filter(m => m && m.text && m.text.length > 5)
          .reverse();
        if (allMsgs.length > 0) {
          setPosts(allMsgs.map(m => parseCourse(m)));
        } else {
          setError("No posts yet. Send a message in your Edubiz Connect Telegram group and tap Retry.");
        }
      } else {
        setPosts(messages.map(m => parseCourse(m)));
      }
    } catch(e) {
      setError("Could not connect. Tap Retry after posting a message in your group.");
    }
    setLoading(false);
  }

  function parseCourse(msg) {
    const text = msg.text || "";
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    // Try to extract name, price, description from message
    let name = lines[0] || "New Course";
    let price = "Contact for price";
    let desc = lines.slice(1).join(" ") || "Check our Telegram channel for details.";
    // Look for price patterns like $49, N5000, Free
    const priceMatch = text.match(/(\$[\d,]+|₦[\d,]+|NGN[\d,]+|free|FREE|contact)/i);
    if (priceMatch) price = priceMatch[0];
    // If name looks like a price, swap
    if (lines.length > 1) desc = lines.slice(1).join(" ");
    return {
      id: msg.message_id,
      name: name.replace(/[*_`#]/g,""),
      price: price,
      desc: desc.replace(/[*_`#]/g,"").slice(0, 180),
      time: new Date(msg.date * 1000).toLocaleDateString(),
      raw: text,
    };
  }

  if (loading) return (
    <div style={{ padding:"32px 24px", textAlign:"center", color:T.soft }}>
      <div style={{ fontSize:36, marginBottom:12 }}>✈️</div>
      <div style={{ fontWeight:600, color:T.dark }}>Loading from Telegram...</div>
    </div>
  );

  if (error) return (
    <div style={{ margin:"0 24px", padding:20, background:T.card, borderRadius:20, border:`1px solid ${T.border}`, textAlign:"center" }}>
      <div style={{ fontSize:32, marginBottom:10 }}>📭</div>
      <div style={{ fontSize:14, color:T.soft, lineHeight:1.6, marginBottom:16 }}>{error}</div>
      <button onClick={fetchPosts} style={{ padding:"10px 24px", borderRadius:50, background:"linear-gradient(135deg,#FF5C00,#FF8A3D)", color:"white", fontWeight:700, border:"none", cursor:"pointer", fontSize:14 }}>Retry</button>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:18 }}>✈️</span>
          <span style={{ fontSize:16, fontWeight:900, color:T.dark }}>From Telegram</span>
          <span style={{ padding:"2px 8px", borderRadius:50, background:"#229ED9", color:"white", fontSize:11, fontWeight:700 }}>{posts.length}</span>
        </div>
        <button onClick={fetchPosts} style={{ background:"none", border:"none", fontSize:13, color:"#FF5C00", fontWeight:700, cursor:"pointer" }}>↻ Refresh</button>
      </div>
      {posts.map(p => (
        <div key={p.id} style={{ margin:"0 24px 14px", padding:18, background:T.card, borderRadius:20, border:`1px solid ${T.border}`, boxShadow:T.shadow }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
            <div style={{ flex:1, paddingRight:10 }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.dark, lineHeight:1.3 }}>{p.name}</div>
              <div style={{ fontSize:13, color:T.soft, marginTop:3 }}>{p.time}</div>
            </div>
            <div style={{ fontSize:16, fontWeight:900, color:"#FF5C00", flexShrink:0 }}>{p.price}</div>
          </div>
          <div style={{ fontSize:13, color:T.soft, lineHeight:1.6, marginBottom:14 }}>{p.desc}</div>
          <div style={{ display:"flex", gap:10 }}>
            <a href="https://t.me/+BV0mkBqNuto1NGE0" target="_blank" rel="noopener noreferrer" style={{ flex:1, padding:"10px", borderRadius:12, background:"#229ED9", color:"white", fontSize:13, fontWeight:700, textAlign:"center", textDecoration:"none", display:"block" }}>✈️ View on Telegram</a>
            <a href="https://wa.me/2349022953830" target="_blank" rel="noopener noreferrer" style={{ flex:1, padding:"10px", borderRadius:12, background:"#25D366", color:"white", fontSize:13, fontWeight:700, textAlign:"center", textDecoration:"none", display:"block" }}>💬 WhatsApp</a>
          </div>
        </div>
      ))}
    </div>
  );
}

function CoursesScreen({ T, setScreen, setCourse, showToast }) {
  const [rec, setRec] = useState(null); const [recLoading, setRecLoading] = useState(false);
  async function getRec() {
    setRecLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:"Course recommender. Respond ONLY with JSON, no markdown.",messages:[{role:"user",content:`User Alex: completed FinTech Basics (100%), 65% through Business Strategy, 30% Python. Interested in entrepreneurship. From: ${COURSES.map(c=>c.name).join(", ")} — recommend best next. JSON: {"course":"<name>","reason":"<2 sentences>"}`}]})});
      const data = await res.json(); const clean=(data.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim(); setRec(JSON.parse(clean));
    } catch { setRec({course:"Growth Marketing Mastery",reason:"Your business strategy background pairs perfectly with growth marketing. It will help you acquire your first customers and scale quickly."}); }
    setRecLoading(false);
  }
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <AppHeader T={T} title="All Courses" sub="340+ courses available" />
      <div style={{ flex:1,padding:"20px 24px",overflowY:"auto" }}>
        <div onClick={getRec} style={{ padding:20,borderRadius:20,background:T.headerBg,marginBottom:20,cursor:"pointer",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)" }} />
          <div style={{ fontSize:13,fontWeight:700,color:"#FF8A3D",marginBottom:6,position:"relative",zIndex:1 }}>🤖 AI Recommends</div>
          {recLoading?<div style={{ color:"rgba(255,255,255,0.5)",fontSize:14 }}>Analysing your learning pattern...</div>
          :rec?<>
            <div style={{ fontSize:16,fontWeight:900,color:"white",marginBottom:6 }}>{rec.course}</div>
            <div style={{ fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.5,marginBottom:12 }}>{rec.reason}</div>
            <button onClick={e=>{e.stopPropagation();const c=COURSES.find(x=>x.name===rec.course);if(c){setCourse(c);setScreen("courseDetail");}}} style={{ padding:"8px 20px",borderRadius:50,background:"#FF5C00",border:"none",color:"white",fontSize:13,fontWeight:700,cursor:"pointer" }}>View Course →</button>
          </>
          :<div style={{ color:"rgba(255,255,255,0.5)",fontSize:14 }}>Tap to get your personalised recommendation ✨</div>}
        </div>
        {/* ── Telegram Live Feed ── */}
        <TelegramFeed T={T} showToast={showToast} />

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 24px 12px" }}>
          <span style={{ fontSize:16,fontWeight:900,color:T.dark }}>All Courses</span>
        </div>

        {COURSES.map(c=>(
          <div key={c.id} onClick={()=>{setCourse(c);setScreen("courseDetail");}} style={{ margin:"0 24px", display:"flex",gap:14,padding:16,background:T.card,borderRadius:20,marginBottom:14,border:`1px solid ${T.border}`,cursor:"pointer",boxShadow:T.shadow }}>
            <div style={{ width:72,height:72,borderRadius:16,background:c.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0 }}>{c.emoji}</div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontSize:11,fontWeight:700,color:"#FF5C00",textTransform:"uppercase" }}>{c.cat}</div>
              <div style={{ fontSize:14,fontWeight:800,color:T.dark,lineHeight:1.3,margin:"3px 0" }}>{c.name}</div>
              <div style={{ display:"flex",gap:8 }}><span style={{ fontSize:12,color:T.soft }}>⭐ {c.rating}</span><span style={{ fontSize:12,fontWeight:700,color:"#FF5C00" }}>{c.price===0?"Free":`$${c.price}`}</span></div>
              {c.progress>0&&<div style={{ marginTop:6,height:5,borderRadius:50,background:T.orangePale,overflow:"hidden" }}><div style={{ height:"100%",width:`${c.progress}%`,background:"linear-gradient(90deg,#FF5C00,#FF8A3D)",borderRadius:50 }} /></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMMUNITY
// ═══════════════════════════════════════════════
function CommunityScreen({ T, showToast }) {
  const [posts, setPosts] = useState(COMMUNITY_INIT);
  const [newPost, setNewPost] = useState("");
  function toggleLike(id) { setPosts(p=>p.map(x=>x.id===id?{...x,liked:!x.liked,likes:x.liked?x.likes-1:x.likes+1}:x)); }
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <AppHeader T={T} title="Community" sub="Connect with learners" right={<span style={{ fontSize:22,cursor:"pointer" }}>🔍</span>} />
      <div style={{ flex:1,padding:"16px 24px",overflowY:"auto" }}>
        <div style={{ padding:16,background:T.card,borderRadius:20,marginBottom:20,border:`1px solid ${T.border}`,boxShadow:T.shadow }}>
          <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Share something with the community..." style={{ width:"100%",border:"none",resize:"none",fontSize:14,color:T.dark,fontFamily:"inherit",outline:"none",minHeight:60,background:"transparent",boxSizing:"border-box" }} />
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8 }}>
            <div style={{ display:"flex",gap:8 }}>{["📎","📷","😊"].map(ic=><button key={ic} onClick={()=>showToast("Coming soon!")} style={{ background:"none",border:"none",fontSize:20,cursor:"pointer" }}>{ic}</button>)}</div>
            <button onClick={()=>{if(newPost.trim()){setPosts(p=>[{id:Date.now(),avatar:"👤",name:"Alex Johnson",role:"Student",time:"just now",content:newPost,likes:0,comments:0,liked:false},...p]);setNewPost("");showToast("Post shared!");}}} style={{ padding:"8px 20px",borderRadius:50,background:newPost.trim()?"linear-gradient(135deg,#FF5C00,#FF8A3D)":"#ccc",color:"white",fontWeight:700,border:"none",cursor:"pointer",fontSize:13 }}>Post</button>
          </div>
        </div>
        {posts.map(p=>(
          <div key={p.id} style={{ padding:18,background:T.card,borderRadius:20,marginBottom:14,border:`1px solid ${T.border}`,boxShadow:T.shadow }}>
            <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:12 }}>
              <div style={{ width:44,height:44,borderRadius:14,background:T.orangePale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0 }}>{p.avatar}</div>
              <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:800,color:T.dark }}>{p.name}</div><div style={{ fontSize:12,color:T.soft }}>{p.role} · {p.time}</div></div>
            </div>
            <div style={{ fontSize:14,color:T.dark,lineHeight:1.6,marginBottom:14 }}>{p.content}</div>
            <div style={{ display:"flex",gap:16,paddingTop:12,borderTop:`1px solid ${T.border}` }}>
              <button onClick={()=>toggleLike(p.id)} style={{ background:"none",border:"none",fontSize:14,cursor:"pointer",color:p.liked?"#FF5C00":T.soft,fontWeight:p.liked?700:400,display:"flex",alignItems:"center",gap:4 }}>{p.liked?"❤️":"🤍"} {p.likes}</button>
              <button onClick={()=>showToast("Comments coming soon!")} style={{ background:"none",border:"none",fontSize:14,cursor:"pointer",color:T.soft,display:"flex",alignItems:"center",gap:4 }}>💬 {p.comments}</button>
              <button onClick={()=>showToast("Shared!")} style={{ background:"none",border:"none",fontSize:14,cursor:"pointer",color:T.soft,display:"flex",alignItems:"center",gap:4 }}>↗️ Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════
function ProgressScreen({ T, setScreen, setCourse }) {
  const enrolled = COURSES.filter(c=>c.progress>0);
  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <AppHeader T={T} title="My Progress" sub="Keep the streak going 🔥" />
      <div style={{ flex:1,padding:"20px 24px",overflowY:"auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24 }}>
          {[["🔥","7 Days","Streak"],["🏆","12","Badges"],["⏱️","38h","Learned"],["✅","1","Completed"]].map(([ic,v,l])=>(
            <div key={l} style={{ padding:18,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,boxShadow:T.shadow,textAlign:"center" }}>
              <div style={{ fontSize:26 }}>{ic}</div><div style={{ fontSize:22,fontWeight:900,color:"#FF5C00",marginTop:6 }}>{v}</div><div style={{ fontSize:12,color:T.soft,marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:20,background:T.headerBg,borderRadius:20,marginBottom:24,position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)" }} />
          <div style={{ fontSize:13,fontWeight:700,color:"#FF8A3D",marginBottom:6 }}>🎯 Weekly Goal</div>
          <div style={{ fontSize:16,fontWeight:700,color:"white",marginBottom:10 }}>5 hours of learning</div>
          <div style={{ height:10,borderRadius:50,background:"rgba(255,255,255,0.1)",overflow:"hidden" }}><div style={{ height:"100%",width:"72%",background:"linear-gradient(90deg,#FF5C00,#FF8A3D)",borderRadius:50 }} /></div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:8 }}>3.6h / 5h this week</div>
        </div>
        <div style={{ fontSize:18,fontWeight:900,color:T.dark,marginBottom:16 }}>Active Courses</div>
        {enrolled.map(c=>(
          <div key={c.id} onClick={()=>{setCourse(c);setScreen("courseDetail");}} style={{ display:"flex",gap:14,padding:16,background:T.card,borderRadius:20,marginBottom:14,border:`1px solid ${T.border}`,cursor:"pointer",boxShadow:T.shadow }}>
            <div style={{ width:60,height:60,borderRadius:14,background:c.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0 }}>{c.emoji}</div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontSize:14,fontWeight:800,color:T.dark,lineHeight:1.3,marginBottom:6 }}>{c.name}</div>
              <div style={{ height:7,borderRadius:50,background:T.orangePale,overflow:"hidden",marginBottom:5 }}><div style={{ height:"100%",width:`${c.progress}%`,background:"linear-gradient(90deg,#FF5C00,#FF8A3D)",borderRadius:50 }} /></div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,color:T.soft }}><span>{c.progress===100?"✅ Completed":`${c.progress}% complete`}</span><span>{c.lessons} lessons</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════
function ProfileScreen({ T, setScreen, showToast, darkMode, setDarkMode, userName }) {
  const badges = [["🏆","First Course"],["🔥","7-Day Streak"],["⭐","Top Learner"],["💯","Perfect Quiz"],["🚀","Fast Finisher"],["🤝","Connector"]];
  const [notifSettings,setNotifSettings] = useState({courses:true,community:true,streak:true,promo:false,ai:true});
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <AppHeader T={T} title="Settings" back onBack={()=>setShowSettings(false)} />
      <div style={{ flex:1,padding:"20px 24px",overflowY:"auto" }}>
        <div style={{ padding:20,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,marginBottom:16,boxShadow:T.shadow }}>
          <div style={{ fontSize:15,fontWeight:800,color:T.dark,marginBottom:16 }}>🎨 Appearance</div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
            <div><div style={{ fontSize:15,fontWeight:600,color:T.dark }}>{darkMode?"🌙 Dark Mode":"☀️ Light Mode"}</div><div style={{ fontSize:13,color:T.soft,marginTop:2 }}>{darkMode?"Easy on the eyes at night":"Classic bright interface"}</div></div>
            <Toggle on={darkMode} onToggle={()=>{ setDarkMode(!darkMode); showToast(darkMode?"Light Mode ☀️":"Dark Mode 🌙"); }} />
          </div>
        </div>
        <div style={{ padding:20,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,marginBottom:16,boxShadow:T.shadow }}>
          <div style={{ fontSize:15,fontWeight:800,color:T.dark,marginBottom:16 }}>🔔 Notifications</div>
          {[["courses","📚","Course updates"],["community","🤝","Community"],["streak","🔥","Streak reminders"],["promo","💸","Promotions"],["ai","🤖","AI tips"]].map(([id,ic,label])=>(
            <div key={id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${T.border}` }}>
              <div style={{ display:"flex",gap:10,alignItems:"center" }}><span style={{ fontSize:18 }}>{ic}</span><span style={{ fontSize:14,fontWeight:600,color:T.dark }}>{label}</span></div>
              <Toggle on={notifSettings[id]} onToggle={()=>setNotifSettings(s=>({...s,[id]:!s[id]}))} />
            </div>
          ))}
        </div>
        <button onClick={()=>showToast("Signed out!")} style={{ width:"100%",padding:16,borderRadius:16,background:"rgba(239,68,68,0.1)",color:"#ef4444",fontWeight:700,border:"2px solid rgba(239,68,68,0.2)",cursor:"pointer",fontSize:15 }}>🚪 Sign Out</button>
        <div style={{ height:20 }} />
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <div style={{ background:T.headerBg,padding:"52px 24px 30px",position:"relative",overflow:"hidden",transition:"background 0.3s" }}>
        <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)",pointerEvents:"none" }} />
        <div style={{ textAlign:"center",position:"relative",zIndex:1 }}>
          <div style={{ width:80,height:80,borderRadius:24,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px",boxShadow:"0 0 30px rgba(255,92,0,0.5)",fontWeight:900,color:"white" }}>{userName?(userName[0].toUpperCase()):"👤"}</div>
          <div style={{ fontSize:22,fontWeight:900,color:"white" }}>{userName||"My Profile"}</div>
          <div style={{ fontSize:14,color:"#FF8A3D",marginTop:4 }}>🎓 Student · Entrepreneur</div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:4 }}>Lagos, Nigeria 🇳🇬</div>
        </div>
      </div>
      <div style={{ flex:1,padding:"20px 24px",overflowY:"auto" }}>
        <div style={{ display:"flex",gap:12,marginBottom:24 }}>
          {[["4","Courses"],["12","Badges"],["38h","Learned"]].map(([v,l])=>(
            <div key={l} style={{ flex:1,padding:16,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,textAlign:"center" }}>
              <div style={{ fontSize:22,fontWeight:900,color:"#FF5C00" }}>{v}</div><div style={{ fontSize:12,color:T.soft,marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:16,fontWeight:800,color:T.dark,marginBottom:14 }}>🏅 Badges</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24 }}>
          {badges.map(([ic,l])=>(
            <div key={l} style={{ padding:"14px 10px",background:T.card,borderRadius:16,border:`1px solid ${T.border}`,textAlign:"center" }}>
              <div style={{ fontSize:28 }}>{ic}</div><div style={{ fontSize:11,color:T.soft,marginTop:5,lineHeight:1.3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:16,fontWeight:800,color:T.dark,marginBottom:14 }}>⚙️ Menu</div>
        {[["🚀","Onboarding","onboarding"],["📊","Instructor Dashboard","instructor"],["🔔","Notifications","notifications"],["⚙️","Settings",null],["💳","Billing & Plans","plans"]].map(([ic,label,target])=>(
          <div key={label} onClick={()=>target?setScreen(target):setShowSettings(true)} style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 18px",background:T.card,borderRadius:16,marginBottom:10,cursor:"pointer",border:`1px solid ${T.border}` }}>
            <span style={{ fontSize:20 }}>{ic}</span><span style={{ fontSize:15,fontWeight:500,color:T.dark,flex:1 }}>{label}</span><span style={{ color:T.soft,fontSize:16 }}>›</span>
          </div>
        ))}
        <div style={{ height:12 }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════
function NotificationsScreen({ T, showToast, onUnreadChange }) {
  const [notifs, setNotifs] = useState(NOTIFS_INIT);
  const [filter, setFilter] = useState("all");
  const timerRef = useRef();
  const unread = notifs.filter(n=>!n.read).length;
  useEffect(() => { onUnreadChange(unread); }, [unread]);

  useEffect(() => {
    const live = [
      {type:"course",emoji:"⚡",title:"Quiz score posted",body:"You scored 92% on the Python quiz!"},
      {type:"community",emoji:"🤝",title:"New connection",body:"Amara Diallo wants to connect with you."},
    ];
    let idx=0;
    timerRef.current = setInterval(()=>{ if(idx<live.length){ setNotifs(p=>[{...live[idx],id:Date.now(),time:"just now",read:false,action:"View"},...p]); idx++; } }, 8000);
    return ()=>clearInterval(timerRef.current);
  }, []);

  function markRead(id){ setNotifs(n=>n.map(x=>x.id===id?{...x,read:true}:x)); }
  function markAll(){ setNotifs(n=>n.map(x=>({...x,read:true}))); showToast("All marked as read"); }
  function dismiss(id){ setNotifs(n=>n.filter(x=>x.id!==id)); }
  const COLORS = {course:"#FF5C00",community:"#0EA5E9",streak:"#F59E0B",achievement:"#8B5CF6",promo:"#EC4899",system:"#10B981"};
  const filtered = filter==="all"?notifs:filter==="unread"?notifs.filter(n=>!n.read):notifs.filter(n=>n.type===filter);

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <div style={{ background:T.headerBg,padding:"52px 24px 20px",position:"relative",overflow:"hidden",transition:"background 0.3s" }}>
        <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)",pointerEvents:"none" }} />
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1 }}>
          <div><div style={{ fontSize:20,fontWeight:900,color:"white" }}>Notifications</div>{unread>0&&<div style={{ fontSize:13,color:"#FF8A3D",marginTop:2 }}>{unread} unread</div>}</div>
          {unread>0&&<button onClick={markAll} style={{ padding:"8px 16px",borderRadius:50,background:"rgba(255,92,0,0.2)",border:"1px solid rgba(255,92,0,0.3)",color:"#FF8A3D",fontSize:12,fontWeight:700,cursor:"pointer" }}>Mark all read</button>}
        </div>
      </div>
      <div style={{ display:"flex",gap:8,padding:"14px 24px 12px",overflowX:"auto",background:T.card,borderBottom:`1px solid ${T.border}` }}>
        {[["all","All"],["unread","Unread"],["course","Courses"],["community","Community"],["achievement","Badges"]].map(([id,lb])=>(
          <div key={id} onClick={()=>setFilter(id)} style={{ flexShrink:0,padding:"7px 16px",borderRadius:50,background:filter===id?"#FF5C00":T.bg,color:filter===id?"white":T.soft,fontSize:13,fontWeight:filter===id?700:400,cursor:"pointer",border:`1px solid ${filter===id?"#FF5C00":T.border}`,whiteSpace:"nowrap" }}>{lb}</div>
        ))}
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        {filtered.length===0&&<div style={{ textAlign:"center",padding:"48px 24px",color:T.soft }}><div style={{ fontSize:48,marginBottom:12 }}>🔔</div><div style={{ fontWeight:700,fontSize:16,color:T.dark,marginBottom:6 }}>All caught up!</div></div>}
        {filtered.map(n=>(
          <div key={n.id} onClick={()=>markRead(n.id)} style={{ display:"flex",gap:14,padding:"14px 24px",background:n.read?T.bg:T.card,borderBottom:`1px solid ${T.border}`,cursor:"pointer",position:"relative" }}>
            {!n.read&&<div style={{ position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",width:6,height:6,borderRadius:"50%",background:"#FF5C00" }} />}
            <div style={{ width:46,height:46,borderRadius:14,background:`${COLORS[n.type]||"#FF5C00"}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,border:`1.5px solid ${COLORS[n.type]||"#FF5C00"}33` }}>{n.emoji}</div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                <div style={{ fontSize:14,fontWeight:n.read?600:800,color:T.dark,flex:1,paddingRight:8 }}>{n.title}</div>
                <div style={{ fontSize:11,color:T.soft,flexShrink:0 }}>{n.time}</div>
              </div>
              <div style={{ fontSize:13,color:T.soft,lineHeight:1.5,marginBottom:8 }}>{n.body}</div>
              <div style={{ display:"flex",gap:8 }}>
                <button onClick={e=>{e.stopPropagation();markRead(n.id);showToast(n.action+"!");}} style={{ padding:"6px 14px",borderRadius:50,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:12,fontWeight:700,border:"none",cursor:"pointer" }}>{n.action}</button>
                <button onClick={e=>{e.stopPropagation();dismiss(n.id);}} style={{ padding:"6px 14px",borderRadius:50,background:T.bg,color:T.soft,fontSize:12,border:`1px solid ${T.border}`,cursor:"pointer" }}>Dismiss</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// INSTRUCTOR DASHBOARD
// ═══════════════════════════════════════════════
function InstructorScreen({ T, setScreen, showToast }) {
  const [tab, setTab] = useState("overview");
  const [lessons, setLessons] = useState([{id:1,title:"Introduction to Strategy",duration:"12:30",published:true},{id:2,title:"Porter's Five Forces",duration:"18:45",published:true},{id:3,title:"SWOT Deep Dive",duration:"22:10",published:true},{id:4,title:"Competitive Positioning",duration:"15:00",published:false}]);
  const [newLesson, setNewLesson] = useState({title:"",duration:""});
  const totalStudents = INSTRUCTOR_COURSES.reduce((s,c)=>s+c.students,0);
  const totalRevenue = INSTRUCTOR_COURSES.reduce((s,c)=>s+c.revenue,0);
  const avgRating = (INSTRUCTOR_COURSES.filter(c=>c.rating>0).reduce((s,c)=>s+c.rating,0)/INSTRUCTOR_COURSES.filter(c=>c.rating>0).length).toFixed(1);
  const SALES = [{name:"Amara Diallo",course:"Business Strategy",amount:49,time:"2m ago",avatar:"👩🏾‍💼"},{name:"Kwame Asante",course:"Business Strategy",amount:49,time:"14m ago",avatar:"👨🏽‍💻"},{name:"Priya Patel",course:"Advanced Entrepreneurship",amount:59,time:"1h ago",avatar:"👩🏻‍💼"},{name:"Marcus Reid",course:"Business Strategy",amount:49,time:"2h ago",avatar:"👨🏿‍💼"}];
  function addLesson(){if(!newLesson.title){showToast("Enter a title");return;}setLessons(l=>[...l,{id:Date.now(),title:newLesson.title,duration:newLesson.duration||"0:00",published:false}]);setNewLesson({title:"",duration:""});showToast("Lesson added!");}

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <div style={{ background:T.headerBg,padding:"52px 24px 20px",position:"relative",overflow:"hidden",transition:"background 0.3s" }}>
        <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)",pointerEvents:"none" }} />
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1 }}>
          <div>
            <button onClick={()=>setScreen("profile")} style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"white",fontSize:14,cursor:"pointer",padding:"6px 12px",borderRadius:8,marginBottom:8,display:"block" }}>← Back</button>
            <div style={{ fontSize:20,fontWeight:900,color:"white" }}>Instructor Portal</div>
            <div style={{ fontSize:13,color:"#FF8A3D",marginTop:2 }}>⭐ {avgRating} avg · {totalStudents.toLocaleString()} students</div>
          </div>
          <div style={{ width:46,height:46,borderRadius:14,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>📊</div>
        </div>
      </div>
      <div style={{ display:"flex",background:T.card,borderBottom:`1px solid ${T.border}` }}>
        {[["overview","📊","Overview"],["courses","📚","Courses"],["lessons","✏️","Lessons"],["earnings","💰","Earnings"]].map(([id,ic,lb])=>(
          <div key={id} onClick={()=>setTab(id)} style={{ flex:1,padding:"12px 4px",textAlign:"center",cursor:"pointer",borderBottom:tab===id?"2px solid #FF5C00":"2px solid transparent",fontSize:11,fontWeight:tab===id?700:400,color:tab===id?"#FF5C00":T.soft }}>
            <span style={{ fontSize:18,display:"block",marginBottom:2 }}>{ic}</span>{lb}
          </div>
        ))}
      </div>
      <div style={{ flex:1,overflowY:"auto" }}>
        {tab==="overview"&&(
          <div style={{ padding:"20px 24px" }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20 }}>
              {[["👥",totalStudents.toLocaleString(),"Students"],["💰","$"+totalRevenue.toLocaleString(),"Revenue"],["⭐",avgRating,"Avg Rating"],["📚",INSTRUCTOR_COURSES.length,"Courses"]].map(([ic,v,l])=>(
                <div key={l} style={{ padding:18,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,boxShadow:T.shadow,textAlign:"center" }}><div style={{ fontSize:24 }}>{ic}</div><div style={{ fontSize:22,fontWeight:900,color:"#FF5C00",marginTop:6 }}>{v}</div><div style={{ fontSize:11,color:T.soft,marginTop:3 }}>{l}</div></div>
              ))}
            </div>
            <div style={{ padding:20,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,boxShadow:T.shadow,marginBottom:20 }}>
              <div style={{ fontSize:15,fontWeight:800,color:T.dark,marginBottom:16 }}>📈 Revenue Last 7 Days</div>
              <div style={{ display:"flex",gap:8,alignItems:"flex-end",height:80 }}>
                {[40,65,45,80,55,90,72].map((h,i)=>(
                  <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                    <div style={{ width:"100%",height:`${h}%`,borderRadius:"6px 6px 0 0",background:i===5?"linear-gradient(180deg,#FF5C00,#FF8A3D)":"linear-gradient(180deg,rgba(255,92,0,0.3),rgba(255,92,0,0.1))" }} />
                    <div style={{ fontSize:9,color:T.soft }}>{"MTWTFSS"[i]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize:15,fontWeight:800,color:T.dark,marginBottom:14 }}>🛒 Recent Sales</div>
            {SALES.map((s,i)=>(
              <div key={i} style={{ display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${T.border}` }}>
                <div style={{ width:40,height:40,borderRadius:12,background:T.orangePale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{s.avatar}</div>
                <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:700,color:T.dark }}>{s.name}</div><div style={{ fontSize:12,color:T.soft }}>{s.course}</div></div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:15,fontWeight:900,color:"#FF5C00" }}>+${s.amount}</div><div style={{ fontSize:11,color:T.soft }}>{s.time}</div></div>
              </div>
            ))}
          </div>
        )}
        {tab==="courses"&&(
          <div style={{ padding:"20px 24px" }}>
            <button onClick={()=>showToast("Course creator coming soon!")} style={{ width:"100%",padding:16,borderRadius:16,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontWeight:700,border:"none",cursor:"pointer",fontSize:15,marginBottom:20,boxShadow:"0 6px 20px rgba(255,92,0,0.3)" }}>+ Create New Course</button>
            {INSTRUCTOR_COURSES.map(c=>(
              <div key={c.id} style={{ padding:18,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,marginBottom:14,boxShadow:T.shadow }}>
                <div style={{ display:"flex",gap:12,marginBottom:12 }}>
                  <div style={{ width:56,height:56,borderRadius:14,background:c.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0 }}>{c.emoji}</div>
                  <div style={{ flex:1 }}><div style={{ fontSize:15,fontWeight:800,color:T.dark }}>{c.name}</div><div style={{ display:"inline-block",marginTop:6,padding:"3px 10px",borderRadius:50,fontSize:11,fontWeight:700,background:c.status==="published"?"rgba(16,185,129,0.12)":"rgba(245,158,11,0.12)",color:c.status==="published"?"#10B981":"#F59E0B" }}>{c.status==="published"?"● Published":"◐ Draft"}</div></div>
                </div>
                <div style={{ display:"flex",gap:10,marginBottom:c.status==="published"?12:0 }}>
                  {[[c.students.toLocaleString(),"Students"],[c.lessons,"Lessons"],[c.rating>0?`⭐${c.rating}`:"-","Rating"]].map(([v,l])=>(
                    <div key={l} style={{ flex:1,textAlign:"center",padding:"10px 6px",background:T.bg,borderRadius:12 }}><div style={{ fontSize:15,fontWeight:900,color:"#FF5C00" }}>{v}</div><div style={{ fontSize:11,color:T.soft }}>{l}</div></div>
                  ))}
                </div>
                {c.status==="published"&&<><div style={{ display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13 }}><span style={{ color:T.soft }}>Completion</span><span style={{ fontWeight:700,color:"#FF5C00" }}>{c.completion}%</span></div><div style={{ height:7,borderRadius:50,background:T.orangePale,overflow:"hidden" }}><div style={{ height:"100%",width:`${c.completion}%`,background:"linear-gradient(90deg,#FF5C00,#FF8A3D)",borderRadius:50 }} /></div></>}
                <div style={{ display:"flex",gap:8,marginTop:12 }}>
                  <button onClick={()=>showToast("Opening editor...")} style={{ flex:1,padding:10,borderRadius:12,background:T.bg,border:`1px solid ${T.border}`,color:T.dark,fontSize:13,fontWeight:600,cursor:"pointer" }}>✏️ Edit</button>
                  <button onClick={()=>showToast("Analytics!")} style={{ flex:1,padding:10,borderRadius:12,background:T.orangePale,border:`1px solid ${T.border}`,color:"#FF5C00",fontSize:13,fontWeight:600,cursor:"pointer" }}>📊 Analytics</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="lessons"&&(
          <div style={{ padding:"20px 24px" }}>
            <div style={{ padding:18,background:T.card,borderRadius:20,border:`1px solid ${T.border}`,marginBottom:20,boxShadow:T.shadow }}>
              <div style={{ fontSize:15,fontWeight:800,color:T.dark,marginBottom:14 }}>➕ Add Lesson</div>
              <input value={newLesson.title} onChange={e=>setNewLesson(l=>({...l,title:e.target.value}))} placeholder="Lesson title" style={{ width:"100%",padding:"13px 16px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:14,color:T.dark,outline:"none",fontFamily:"inherit",marginBottom:10,boxSizing:"border-box" }} />
              <input value={newLesson.duration} onChange={e=>setNewLesson(l=>({...l,duration:e.target.value}))} placeholder="Duration e.g. 12:30" style={{ width:"100%",padding:"13px 16px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:14,color:T.dark,outline:"none",fontFamily:"inherit",marginBottom:12,boxSizing:"border-box" }} />
              <button onClick={addLesson} style={{ width:"100%",padding:14,borderRadius:14,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontWeight:700,border:"none",cursor:"pointer",fontSize:14 }}>Add Lesson</button>
            </div>
            {lessons.map((l,i)=>(
              <div key={l.id} style={{ display:"flex",gap:12,alignItems:"center",padding:"14px 16px",background:T.card,borderRadius:16,marginBottom:10,border:`1px solid ${T.border}` }}>
                <div style={{ width:36,height:36,borderRadius:10,background:T.orangePale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"#FF5C00",flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:700,color:T.dark }}>{l.title}</div><div style={{ fontSize:12,color:T.soft }}>⏱ {l.duration}</div></div>
                <div style={{ display:"flex",gap:6 }}>
                  <button onClick={()=>{setLessons(ls=>ls.map(x=>x.id===l.id?{...x,published:!x.published}:x));showToast(l.published?"Unpublished":"Published!");}} style={{ padding:"6px 12px",borderRadius:50,background:l.published?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)",color:l.published?"#10B981":"#F59E0B",fontWeight:700,border:"none",cursor:"pointer",fontSize:11 }}>{l.published?"Live":"Draft"}</button>
                  <button onClick={()=>{setLessons(ls=>ls.filter(x=>x.id!==l.id));showToast("Deleted");}} style={{ padding:"6px 10px",borderRadius:50,background:"rgba(239,68,68,0.1)",color:"#ef4444",border:"none",cursor:"pointer",fontSize:14 }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="earnings"&&(
          <div style={{ padding:"20px 24px" }}>
            <div style={{ padding:24,background:T.headerBg,borderRadius:24,marginBottom:20,position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.3),transparent 70%)" }} />
              <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:4 }}>Total Earnings</div>
              <div style={{ fontSize:38,fontWeight:900,color:"white" }}>${totalRevenue.toLocaleString()}</div>
              <div style={{ fontSize:14,color:"#FF8A3D",marginTop:6 }}>+$1,240 this month</div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20 }}>
              {[["💵","$1,240","This Month"],["⏳","$892","Pending"],["✅","$59,400","All Time"],["📅","$3,860","Quarter"]].map(([ic,v,l])=>(
                <div key={l} style={{ padding:16,background:T.card,borderRadius:18,border:`1px solid ${T.border}`,textAlign:"center" }}><div style={{ fontSize:22 }}>{ic}</div><div style={{ fontSize:18,fontWeight:900,color:"#FF5C00",marginTop:6 }}>{v}</div><div style={{ fontSize:11,color:T.soft,marginTop:3 }}>{l}</div></div>
              ))}
            </div>
            {INSTRUCTOR_COURSES.filter(c=>c.revenue>0).map(c=>(
              <div key={c.id} style={{ padding:16,background:T.card,borderRadius:18,border:`1px solid ${T.border}`,marginBottom:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ fontSize:14,fontWeight:700,color:T.dark }}>{c.emoji} {c.name}</span><span style={{ fontSize:15,fontWeight:900,color:"#FF5C00" }}>${c.revenue.toLocaleString()}</span></div>
                <div style={{ height:6,borderRadius:50,background:T.orangePale,overflow:"hidden" }}><div style={{ height:"100%",width:`${(c.revenue/totalRevenue*100).toFixed(0)}%`,background:"linear-gradient(90deg,#FF5C00,#FF8A3D)",borderRadius:50 }} /></div>
                <div style={{ fontSize:12,color:T.soft,marginTop:5 }}>{(c.revenue/totalRevenue*100).toFixed(0)}% of total</div>
              </div>
            ))}
            <button onClick={()=>showToast("Payout requested! 2–3 days.")} style={{ width:"100%",padding:16,borderRadius:16,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontWeight:700,border:"none",cursor:"pointer",fontSize:15,marginTop:8,boxShadow:"0 6px 20px rgba(255,92,0,0.3)" }}>💸 Request Payout</button>
            <div style={{ height:16 }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAYSTACK CONFIG
// ═══════════════════════════════════════════════
const PAYSTACK_PUBLIC_KEY = "pk_live_c6ef69a1bb5595a6e9b2aab7668c3d011ac28f3d";
const PAYSTACK_PLANS = {
  pro: { code:"PLN_rj1bbegesq482kx", name:"Pro", amount:14500, label:"₦14,500/month" },
  business: { code:"PLN_8g5ep7cdaezrqbi", name:"Business", amount:29000, label:"₦29,000/month" },
};

const PLANS_NG = [
  { id:"starter", name:"Starter", price:"Free", period:"Free forever", color:"#1A0F00", features:["5 free courses","Community access","Basic progress tracking","Mobile app"] },
  { id:"pro", name:"Pro", price:"₦14,500", period:"per month", color:"#FF5C00", features:["Unlimited courses","AI Study Chatbot","Quiz generator","Certificates","Priority support"], popular:true },
  { id:"business", name:"Business", price:"₦29,000", period:"per month", color:"#2E1A00", features:["Everything in Pro","Team dashboard (10 seats)","Custom learning paths","Analytics & reports","Dedicated manager"] },
];

// ═══════════════════════════════════════════════
// PLANS
// ═══════════════════════════════════════════════
function PlansScreen({ T, setScreen, showToast, userName, userEmail }) {
  const [selected, setSelected] = useState("pro");
  const [loading, setLoading] = useState(false);

  function initializePaystack(planId) {
    if (planId === "starter") { showToast("Free plan activated! ✅"); setScreen("home"); return; }
    const plan = PAYSTACK_PLANS[planId];
    if (!plan) return;
    setLoading(true);

    // Load Paystack inline script dynamically
    const existingScript = document.getElementById("paystack-script");
    if (existingScript) { openPaystack(plan); return; }
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => openPaystack(plan);
    script.onerror = () => { showToast("Failed to load Paystack. Check connection."); setLoading(false); };
    document.head.appendChild(script);
  }

  function openPaystack(plan) {
    setLoading(false);
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: userEmail || "user@edubizconnect.com",
        amount: plan.amount * 100, // kobo
        currency: "NGN",
        plan: plan.code,
        ref: "EDU_" + Date.now(),
        metadata: { custom_fields:[{ display_name:"Plan", variable_name:"plan", value:plan.name },{ display_name:"User", variable_name:"user", value:userName||"User" }] },
        callback: (response) => {
          showToast("🎉 Subscription activated! Welcome to " + plan.name);
          setTimeout(() => setScreen("home"), 1000);
        },
        onClose: () => { showToast("Payment cancelled."); },
      });
      handler.openIframe();
    } catch(e) {
      showToast("Paystack error. Please try again.");
    }
  }

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <AppHeader T={T} title="Choose Your Plan" back onBack={()=>setScreen("profile")} sub="Billed in Nigerian Naira (NGN)" />
      <div style={{ flex:1,padding:"24px",overflowY:"auto" }}>
        <div style={{ textAlign:"center",marginBottom:24,fontSize:15,color:T.soft,lineHeight:1.6 }}>Unlock unlimited access to all courses and AI-powered features.</div>

        {PLANS_NG.map(plan=>(
          <div key={plan.id} onClick={()=>setSelected(plan.id)} style={{ padding:22,borderRadius:24,border:`2px solid ${selected===plan.id?"#FF5C00":T.border}`,background:selected===plan.id?T.orangePale:T.card,marginBottom:14,cursor:"pointer",position:"relative",boxShadow:selected===plan.id?T.shadowMd:T.shadow,transition:"all 0.2s" }}>
            {plan.popular&&<div style={{ position:"absolute",top:-12,right:20,padding:"4px 14px",borderRadius:50,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:11,fontWeight:700 }}>MOST POPULAR</div>}
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
              <div><div style={{ fontSize:18,fontWeight:900,color:T.dark }}>{plan.name}</div><div style={{ fontSize:13,color:T.soft,marginTop:2 }}>{plan.period}</div></div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:24,fontWeight:900,color:selected===plan.id?"#FF5C00":T.dark }}>{plan.price}</div>{plan.id!=="starter"&&<div style={{ fontSize:11,color:T.soft }}>billed monthly</div>}</div>
            </div>
            {plan.features.map(f=>(
              <div key={f} style={{ display:"flex",gap:10,alignItems:"center",marginBottom:8 }}>
                <span style={{ color:"#FF5C00",fontSize:14,fontWeight:700 }}>✓</span>
                <span style={{ fontSize:14,color:T.dark }}>{f}</span>
              </div>
            ))}
          </div>
        ))}

        {/* Paystack branding */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 0",marginBottom:8 }}>
          <span style={{ fontSize:12,color:T.soft }}>Secured by</span>
          <span style={{ fontSize:13,fontWeight:800,color:"#0BA4DB" }}>Paystack</span>
          <span style={{ fontSize:16 }}>🔒</span>
        </div>

        <button
          onClick={()=>initializePaystack(selected)}
          disabled={loading}
          style={{ width:"100%",padding:18,borderRadius:20,background:loading?"#ccc":"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:16,fontWeight:700,border:"none",cursor:loading?"not-allowed":"pointer",boxShadow:loading?"none":"0 8px 24px rgba(255,92,0,0.4)",transition:"all 0.2s" }}>
          {loading?"Loading Paystack...": selected==="starter"?"Activate Free Plan ✅":"Subscribe with Paystack →"}
        </button>

        <div style={{ textAlign:"center",fontSize:12,color:T.soft,marginTop:12,lineHeight:1.6 }}>
          Cancel anytime · No hidden fees · NGN billing
        </div>
        <div style={{ height:20 }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAYMENT
// ═══════════════════════════════════════════════
function PaymentScreen({ T, setScreen, showToast }) {
  const [step, setStep] = useState("form");
  const [card, setCard] = useState({num:"",expiry:"",cvv:"",name:""});
  function fmt(v){ return v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim(); }
  function fmtExp(v){ const d=v.replace(/\D/g,"").slice(0,4); return d.length>=3?d.slice(0,2)+"/"+d.slice(2):d; }
  function pay(){ if(!card.name||card.num.replace(/\s/g,"").length<16||card.expiry.length<5||card.cvv.length<3){showToast("Fill all fields");return;} setStep("success"); }

  if(step==="success") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,background:T.bg,textAlign:"center" }}>
      <div style={{ fontSize:72,marginBottom:20 }}>🎉</div>
      <div style={{ fontSize:28,fontWeight:900,color:T.dark,marginBottom:12 }}>You're all set!</div>
      <div style={{ fontSize:16,color:T.soft,lineHeight:1.6,marginBottom:36 }}>Welcome to EduBiz Pro. Unlimited courses and AI features are now unlocked.</div>
      <button onClick={()=>setScreen("home")} style={{ padding:"16px 40px",borderRadius:20,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:16,fontWeight:700,border:"none",cursor:"pointer",boxShadow:"0 8px 24px rgba(255,92,0,0.4)" }}>Start Learning →</button>
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",flex:1 }}>
      <AppHeader T={T} title="Payment" back onBack={()=>setScreen("plans")} />
      <div style={{ flex:1,padding:"24px 24px 40px",overflowY:"auto" }}>
        <div style={{ padding:20,background:T.headerBg,borderRadius:24,marginBottom:24,position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,92,0,0.4),transparent 70%)" }} />
          <div style={{ fontSize:12,color:"#FF8A3D",fontWeight:700,marginBottom:4 }}>EduBiz Pro</div>
          <div style={{ fontSize:28,fontWeight:900,color:"white" }}>$19<span style={{ fontSize:14,color:"rgba(255,255,255,0.5)",fontWeight:400 }}>/month</span></div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:4 }}>Billed monthly · Cancel anytime</div>
        </div>
        <div style={{ padding:"22px 20px",borderRadius:20,background:T.headerBg,marginBottom:24,position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:-30,right:-30,width:130,height:130,borderRadius:"50%",background:"rgba(255,92,0,0.15)" }} />
          <div style={{ fontSize:26,marginBottom:14 }}>💳</div>
          <div style={{ fontSize:17,color:"white",letterSpacing:3,fontWeight:600,marginBottom:14,fontFamily:"monospace" }}>{card.num||"•••• •••• •••• ••••"}</div>
          <div style={{ display:"flex",justifyContent:"space-between" }}>
            <div><div style={{ fontSize:10,color:"rgba(255,255,255,0.4)" }}>CARDHOLDER</div><div style={{ fontSize:14,color:"white",fontWeight:600 }}>{card.name||"Your Name"}</div></div>
            <div><div style={{ fontSize:10,color:"rgba(255,255,255,0.4)" }}>EXPIRES</div><div style={{ fontSize:14,color:"white",fontWeight:600 }}>{card.expiry||"MM/YY"}</div></div>
          </div>
        </div>
        {[["Cardholder Name","text","Alex Johnson","name",v=>v],["Card Number","text","1234 5678 9012 3456","num",fmt],["Expiry Date","text","MM/YY","expiry",fmtExp]].map(([label,type,ph,key,fn])=>(
          <div key={key} style={{ marginBottom:14 }}>
            <label style={{ fontSize:13,fontWeight:500,color:T.soft,marginBottom:8,display:"block" }}>{label}</label>
            <input value={card[key]} onChange={e=>setCard(c=>({...c,[key]:fn(e.target.value)}))} placeholder={ph} style={{ width:"100%",padding:"15px 18px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:15,color:T.dark,outline:"none",fontFamily:key==="num"?"monospace":"inherit",boxSizing:"border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:13,fontWeight:500,color:T.soft,marginBottom:8,display:"block" }}>CVV</label>
          <input value={card.cvv} onChange={e=>setCard(c=>({...c,cvv:e.target.value.replace(/\D/g,"").slice(0,3)}))} placeholder="•••" maxLength={3} style={{ width:"100%",padding:"15px 18px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:15,color:T.dark,outline:"none",fontFamily:"monospace",boxSizing:"border-box" }} />
        </div>
        <button onClick={pay} style={{ width:"100%",padding:18,borderRadius:20,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:16,fontWeight:700,border:"none",cursor:"pointer",boxShadow:"0 8px 24px rgba(255,92,0,0.4)",marginBottom:12 }}>Pay $19.00 →</button>
        <div style={{ textAlign:"center",fontSize:13,color:T.soft }}>🔒 256-bit SSL encryption</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════
export default function App() {
  const [appState, setAppState] = useState("onboarding");
  const [screen, setScreen] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [toast, setToast] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(COURSES[0]);
  const [unreadCount, setUnreadCount] = useState(3);
  const T = makeTheme(darkMode);
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(""),2200); }

  // MAIN SCREENS that use bottom nav
  const mainScreens = ["home","courses","community","progress","profile"];
  const isMainScreen = mainScreens.includes(screen);

  // ONBOARDING
  if (appState==="onboarding") {
    if (!authMode) return (
      <div style={{ fontFamily:font,maxWidth:430,margin:"0 auto",minHeight:"100vh",background:T.bg,transition:"background 0.3s",display:"flex",flexDirection:"column" }}>
        <OnboardingFlow T={T} onComplete={()=>setAuthMode("signup")} />
        <Toast msg={toast} T={T} />
      </div>
    );
    return (
      <div style={{ fontFamily:font,maxWidth:430,margin:"0 auto",minHeight:"100vh",background:T.bg,transition:"background 0.3s" }}>
        <div style={{ background:T.headerBg,padding:"60px 28px 50px",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",bottom:-30,left:0,right:0,height:60,background:T.bg,borderRadius:"30px 30px 0 0",transition:"background 0.3s" }} />
          <button onClick={()=>setAuthMode(null)} style={{ position:"absolute",top:20,left:20,width:40,height:40,borderRadius:12,background:"rgba(255,255,255,0.1)",border:"none",color:"white",fontSize:18,cursor:"pointer" }}>←</button>
          <h2 style={{ fontSize:30,fontWeight:900,color:"white",lineHeight:1.1,position:"relative",zIndex:1 }}>{authMode==="signup"?<>Create your<br/><span style={{color:"#FF5C00"}}>account</span></>:<>Welcome<br/><span style={{color:"#FF5C00"}}>back!</span></>}</h2>
          <p style={{ color:"rgba(255,255,255,0.5)",fontSize:14,marginTop:6,position:"relative",zIndex:1 }}>{authMode==="signup"?"Join thousands of learners today":"Sign in to continue learning"}</p>
        </div>
        <div style={{ padding:"24px 28px 40px" }}>
          {authMode==="signup"&&(
            <div style={{ display:"flex",gap:10,marginBottom:24 }}>
              {["🎓 Student","📚 Educator","💼 Bizowner"].map(r=>(
                <button key={r} style={{ flex:1,padding:"11px 6px",borderRadius:12,border:`2px solid ${T.border}`,background:T.card,color:T.soft,cursor:"pointer",fontSize:11,fontWeight:500,textAlign:"center" }}>{r}</button>
              ))}
            </div>
          )}
          {authMode==="signup"&&<><label style={{ fontSize:13,fontWeight:500,color:T.soft,marginBottom:8,display:"block" }}>Full Name</label><input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Enter your full name" style={{ width:"100%",padding:"15px 18px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:15,color:T.dark,outline:"none",fontFamily:"inherit",marginBottom:18,boxSizing:"border-box" }} /></>}
          <label style={{ fontSize:13,fontWeight:500,color:T.soft,marginBottom:8,display:"block" }}>Email</label>
          <input value={emailInput} onChange={e=>setEmailInput(e.target.value)} type="email" placeholder="your@email.com" style={{ width:"100%",padding:"15px 18px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:15,color:T.dark,outline:"none",fontFamily:"inherit",marginBottom:18,boxSizing:"border-box" }} />
          <label style={{ fontSize:13,fontWeight:500,color:T.soft,marginBottom:8,display:"block" }}>Password</label>
          <input type="password" placeholder="Your password" style={{ width:"100%",padding:"15px 18px",borderRadius:12,border:`2px solid ${T.border}`,background:T.inputBg,fontSize:15,color:T.dark,outline:"none",fontFamily:"inherit",marginBottom:18,boxSizing:"border-box" }} />
          <button onClick={()=>{ const n = authMode==="signup" ? nameInput.trim() : emailInput.split("@")[0]; setUserName(n||"Friend"); showToast(authMode==="signup"?`🎉 Welcome, ${n||"Friend"}!`:`👋 Welcome back!`); setTimeout(()=>setAppState("app"),800); }} style={{ width:"100%",padding:18,borderRadius:20,background:"linear-gradient(135deg,#FF5C00,#FF8A3D)",color:"white",fontSize:16,fontWeight:700,border:"none",cursor:"pointer",boxShadow:"0 8px 24px rgba(255,92,0,0.35)" }}>{authMode==="signup"?"Create Account →":"Sign In →"}</button>
          <div style={{ textAlign:"center",color:T.soft,fontSize:13,margin:"20px 0" }}>or</div>
          <div style={{ display:"flex",gap:12,marginBottom:24 }}>{["🔵","🍎","🔗"].map(ic=><button key={ic} onClick={()=>showToast("Coming soon!")} style={{ flex:1,padding:13,borderRadius:12,border:`2px solid ${T.border}`,background:T.card,fontSize:20,cursor:"pointer" }}>{ic}</button>)}</div>
          <p style={{ textAlign:"center",fontSize:14,color:T.soft }}>
            {authMode==="signup"?"Already have an account? ":"Don't have one? "}
            <span onClick={()=>setAuthMode(authMode==="signup"?"login":"signup")} style={{ color:"#FF5C00",fontWeight:700,cursor:"pointer" }}>{authMode==="signup"?"Sign In":"Sign Up"}</span>
          </p>
        </div>
        <Toast msg={toast} T={T} />
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ fontFamily:font,maxWidth:430,margin:"0 auto",minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",position:"relative",overflowX:"hidden",transition:"background 0.3s" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflowY:"auto" }}>
        {screen==="home" && <HomeScreen T={T} setScreen={setScreen} setCourse={setActiveCourse} openChat={()=>setChatOpen(true)} showToast={showToast} userName={userName} />}
        {screen==="courses" && <CoursesScreen T={T} setScreen={setScreen} setCourse={setActiveCourse} showToast={showToast} />}
        {screen==="courseDetail" && <CourseDetailScreen course={activeCourse} T={T} setScreen={setScreen} showToast={showToast} userEmail={emailInput} />}
        {screen==="community" && <CommunityScreen T={T} showToast={showToast} />}
        {screen==="progress" && <ProgressScreen T={T} setScreen={setScreen} setCourse={setActiveCourse} />}
        {screen==="profile" && <ProfileScreen T={T} setScreen={setScreen} showToast={showToast} darkMode={darkMode} setDarkMode={setDarkMode} userName={userName} />}
        {screen==="notifications" && <NotificationsScreen T={T} showToast={showToast} onUnreadChange={setUnreadCount} />}
        {screen==="instructor" && <InstructorScreen T={T} setScreen={setScreen} showToast={showToast} />}
        {screen==="onboarding" && <div style={{ flex:1 }}><OnboardingFlow T={T} onComplete={()=>{ showToast("Profile updated!"); setScreen("home"); }} /></div>}
        {screen==="plans" && <PlansScreen T={T} setScreen={setScreen} showToast={showToast} userName={userName} userEmail={emailInput} />}
        {screen==="payment" && <PaymentScreen T={T} setScreen={setScreen} showToast={showToast} />}  {/* Legacy - Paystack now handles payments via PlansScreen */}
      </div>

      {isMainScreen && <BottomNav screen={screen} setScreen={setScreen} T={T} unreadCount={unreadCount} />}

      {chatOpen && <ChatBot T={T} onClose={()=>setChatOpen(false)} />}
      <Toast msg={toast} T={T} />
    </div>
  );
}
