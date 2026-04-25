import { Bot, Send, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';

const shortcuts = [
  'Summarize my recent notes into 5 bullets.',
  'Generate 5 quiz questions from my notes.',
  'Create a study plan for the next 7 days.',
  'Turn my notes into flashcards.',
  'Explain this concept in simple words.',
];

const relevantKeys = [
  'study_notes',
  'study_flashcards',
  'study_planner_tasks',
  'study_habits',
  'study_quiz_questions',
  'study_exam_countdowns',
];

export default function AIAssistantPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi, I am your study copilot. Ask anything.' }]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('study_openrouter_key') || '');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const contextBlob = useMemo(() => {
    const snapshot = { currentPath: location.pathname };
    relevantKeys.forEach((key) => {
      snapshot[key] = localStorage.getItem(key);
    });
    return JSON.stringify(snapshot).slice(0, 6000);
  }, [location.pathname]);

  const callAI = async (prompt) => {
    if (!apiKey) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Add an OpenRouter API key first.' }]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Study Suite Assistant',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [
            { role: 'system', content: 'You are a concise, practical study assistant.' },
            { role: 'system', content: `Context snapshot: ${contextBlob}` },
            ...messages.slice(-8),
            { role: 'user', content: prompt },
          ],
        }),
      });
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || 'No response returned.';
      setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Request failed. Check network/API key.' }]);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!input.trim() || loading) return;
    const prompt = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    setInput('');
    await callAI(prompt);
  };

  return (
    <>
      <motion.button
        type="button"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-indigo-600 p-3 text-white shadow-2xl"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={20} /> : <Bot size={20} />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="fixed bottom-20 right-4 z-40 flex h-[70vh] w-[min(420px,92vw)] flex-col rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">AI Study Assistant</p>
              <Sparkles size={16} className="text-indigo-500" />
            </div>
            <input
              className="input mb-2"
              type="password"
              placeholder="OpenRouter API key"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem('study_openrouter_key', e.target.value);
              }}
            />
            <div className="mb-2 flex flex-wrap gap-1">
              {shortcuts.map((item) => (
                <AnimatedButton key={item} type="button" className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800" onClick={() => setInput(item)}>
                  {item.slice(0, 20)}...
                </AnimatedButton>
              ))}
            </div>
            <div className="flex-1 space-y-2 overflow-auto pr-1">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`rounded-xl p-2 text-sm ${message.role === 'user' ? 'ml-10 bg-indigo-600 text-white' : 'mr-10 bg-slate-100 dark:bg-slate-800'}`}>
                  {message.content}
                </div>
              ))}
              {loading && <div className="mr-10 rounded-xl bg-slate-100 p-2 text-sm dark:bg-slate-800">Thinking...</div>}
            </div>
            <form onSubmit={submit} className="mt-2 flex gap-2">
              <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for help..." />
              <AnimatedButton type="submit" className="btn-primary">
                <Send size={15} />
              </AnimatedButton>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
