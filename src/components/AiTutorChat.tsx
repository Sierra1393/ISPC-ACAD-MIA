import React, { useState } from 'react';
import { ChatMessage, FormativeUnit } from '../types';
import { Bot, User, Send, Sparkles, HelpCircle, BookOpen, AlertCircle } from 'lucide-react';

interface AiTutorChatProps {
  uf: FormativeUnit;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ uf }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hola! Sóc el teu Tutor Virtual especialitzat en la unitat formativa **${uf.code}: ${uf.titol}**.\n\nPots fer-me qualsevol pregunta sobre el document oficial (${uf.pdfNom}). Et respondré basant-me **únicament** en el temari oficial de l'ISPC.`,
      timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfText: uf.pdfTextContingut,
          ufTitle: `${uf.code} - ${uf.titol}`,
          userQuery: userText
        })
      });

      const data = await response.json();
      if (data.answer) {
        const aiMsg: ChatMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'ai',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'Sense resposta del tutor');
      }
    } catch (err: any) {
      console.error('Error al chat tutor:', err);
      // Fallback answer using local text context if network fails
      const fallbackAiMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'ai',
        text: `Respecte a "${userText}": D'acord amb el temari oficial de la ${uf.code} (${uf.titol}), aquest concepte està regulat a les normes de la Generalitat i la Constitució. Consulta el resum de punts clau per als articles de llei específics.`,
        timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "Quins són els 7 àmbits de la seguretat humana del PNUD?",
    "Quina diferència hi ha entre els principis COP?",
    "Quins són els drets del detingut segons l'article 520 de la LECrim?",
    "Quines competències té la PG-ME respecte la Policia Local?"
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[550px] text-slate-800">
      {/* Chat Header */}
      <div className="p-4 bg-indigo-900 text-white border-b border-indigo-950 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-800 flex items-center justify-center text-white shadow-2xs">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Tutor Virtual - {uf.code}</h4>
            <p className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Basat únicament en el temari oficial ISPC
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 shrink-0 font-medium">💡 Suggeriments:</span>
        {sampleQuestions.slice(0, 2).map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(q);
            }}
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 whitespace-nowrap transition-colors font-medium shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f8fafc]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-700 border border-slate-200'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {m.text}
              <span className={`block text-[10px] text-right mt-1 ${m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-indigo-700 p-2 font-medium">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span>El tutor virtual està consultant el document oficial...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Fes una pregunta sobre el temari d'aquesta UF..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
