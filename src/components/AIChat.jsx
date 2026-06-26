import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Loader2, Wand2 } from "lucide-react";
import { useCreateTask } from "../hooks/useTasks";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

async function callClaude(messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages,
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "Sorry, I couldn't get a response.";
}

export default function AIChat({ tasks = [] }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI task assistant. Ask me anything about your tasks, productivity tips, or project planning!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [genGoal, setGenGoal] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const endRef = useRef(null);
  const createTask = useCreateTask();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    const systemContext = tasks.length > 0
      ? `You are a helpful task management AI assistant. The user has ${tasks.length} tasks. Here are their current tasks: ${tasks.slice(0, 5).map(t => `"${t.title}" (${t.status}, ${t.priority} priority)`).join(", ")}. Help them manage their work, give productivity advice, and answer questions.`
      : "You are a helpful AI task management assistant. Help users plan their work, give productivity advice, and suggest how to organize tasks.";

    try {
      const reply = await callClaude([
        { role: "user", content: systemContext },
        { role: "assistant", content: "Understood! I'll help you manage your tasks." },
        ...history.filter(m => m.role !== "assistant" || history.indexOf(m) > 0),
      ]);
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...history, { role: "assistant", content: "I'm having trouble connecting right now. Please check your API key." }]);
    } finally {
      setLoading(false);
    }
  };

  const generateTasks = async () => {
    if (!genGoal.trim() || genLoading) return;
    setGenLoading(true);
    setGeneratedTasks([]);

    try {
      const prompt = `You are a project planning AI. Given this goal: "${genGoal}", generate exactly 4 specific, actionable tasks.

Respond ONLY with a JSON array (no markdown, no extra text):
[
  {"title": "...", "description": "...", "category": "Development|Design|Backend|AI|Testing|DevOps|General", "priority": "High|Medium|Low", "tags": ["tag1", "tag2"]},
  ...
]`;

      const response = await callClaude([{ role: "user", content: prompt }]);
      const clean = response.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setGeneratedTasks(parsed);
    } catch {
      alert("Could not generate tasks. Please try again or check your API key.");
    } finally {
      setGenLoading(false);
    }
  };

  const addGeneratedTask = async (task) => {
    try {
      await createTask.mutateAsync({ ...task, status: "Todo" });
      setGeneratedTasks((prev) => prev.filter((t) => t.title !== task.title));
      alert(`"${task.title}" added!`);
    } catch {
      alert("Failed to add task.");
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-40"
      >
        <Bot className="w-5 h-5" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-2xl z-50 flex flex-col overflow-hidden" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold text-sm">AI Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/20 transition-colors"><X className="w-4 h-4" /></button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-slate-700">
            {[
              { key: "chat", label: "Chat", icon: Bot },
              { key: "generate", label: "Task Generator", icon: Wand2 },
            ].map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2.5 transition-colors ${activeTab === key ? "text-primary-500 border-b-2 border-primary-500" : "text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"}`}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>

          {/* Chat tab */}
          {activeTab === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "340px" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <Bot className="w-3.5 h-3.5 text-primary-500" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary-500 text-white rounded-br-sm"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-bl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-primary-500" />
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-xl">
                      <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
              <div className="p-3 border-t border-gray-100 dark:border-slate-700 flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about your tasks..."
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <button onClick={sendMessage} disabled={loading || !input.trim()}
                  className="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Generate tab */}
          {activeTab === "generate" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "400px" }}>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Describe your project or goal and AI will generate tasks for you.</p>
                <textarea value={genGoal} onChange={(e) => setGenGoal(e.target.value)}
                  rows={3} placeholder="e.g. Build a portfolio website with React and deploy it on Vercel..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
                <button onClick={generateTasks} disabled={genLoading || !genGoal.trim()}
                  className="w-full mt-2 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                  {genLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {genLoading ? "Generating..." : "Generate Tasks"}
                </button>
              </div>

              {generatedTasks.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Generated Tasks</p>
                  {generatedTasks.map((task, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-slate-700/60 rounded-xl p-3 border border-gray-100 dark:border-slate-600">
                      <p className="text-sm font-semibold mb-1">{task.title}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 line-clamp-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full">{task.priority}</span>
                        <button onClick={() => addGeneratedTask(task)}
                          className="text-xs bg-primary-500 text-white px-3 py-1 rounded-lg hover:bg-primary-600 transition-colors font-medium">
                          Add Task
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}