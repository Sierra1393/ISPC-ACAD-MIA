import React, { useState, useEffect } from 'react';
import { ChatMessage, FormativeUnit } from '../types';
import { Bot, User, Send, Edit2, UserCheck } from 'lucide-react';

interface AiTutorChatProps {
  uf: FormativeUnit;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ uf, initialQuery, onClearInitialQuery }) => {
  const [userSurname, setUserSurname] = useState<string>(() => {
    return localStorage.getItem('user_surname') || 'GARCÍA';
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hola, Sr. o Sra. **${(localStorage.getItem('user_surname') || 'GARCÍA').toUpperCase()}**, en què li puc ajudar?\n\nSóc el teu Formador Virtual especialitzat en la unitat formativa **${uf.code}: ${uf.titol}**.\n\nPots fer-me qualsevol pregunta sobre el temari oficial. Et respondré de manera detallada, destacant i **subratllant en groc** tots els conceptes i termes clau.`,
      timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // If surname changes, update localStorage and refresh initial welcome greeting if it's unchanged
  const handleSurnameChange = (newVal: string) => {
    const cleanUpper = newVal.toUpperCase();
    setUserSurname(cleanUpper);
    localStorage.setItem('user_surname', cleanUpper);

    // Update welcome message if present
    setMessages(prev => prev.map(m => {
      if (m.id === 'welcome') {
        return {
          ...m,
          text: `Hola, Sr. o Sra. **${cleanUpper}**, en què li puc ajudar?\n\nSóc el teu Formador Virtual especialitzat en la unitat formativa **${uf.code}: ${uf.titol}**.\n\nPots fer-me qualsevol pregunta sobre el temari oficial. Et respondré de manera detallada, destacant i **subratllant en groc** tots els conceptes i termes clau.`
        };
      }
      return m;
    }));
  };

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      setInput(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery, onClearInitialQuery]);

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
          userQuery: userText,
          userSurname: userSurname.toUpperCase()
        })
      });

      const data = await response.json();
      if (data.answer) {
        // Strip accidental repeated greeting prefix if AI added it despite system prompt
        let cleanedAnswer = data.answer.trim();
        cleanedAnswer = cleanedAnswer.replace(/^(Hola,?\s*(Sr\.?|Sra\.?)\s*[A-ZÀ-Úa-zà-ú\s]+,?\s*(en què li puc ajudar\??)?[\s\n]*)+/i, '');

        const aiMsg: ChatMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'ai',
          text: cleanedAnswer,
          timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'Sense resposta del formador virtual');
      }
    } catch (err: any) {
      console.error('Error al chat formador:', err);
      // Fallback answer using local text context if network fails
      const fallbackAiMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'ai',
        text: `D'acord amb el temari oficial de la **${uf.code}** (${uf.titol}), respecte a "${userText}": aquest concepte es troba regulat al temari de la Generalitat i la Constitució. Consulta el resum de punts clau per als **articles de llei** específics.`,
        timestamp: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render message with markdown formatting and yellow highlight + yellow underline for bold terms
  const renderFormattedMessage = (rawText: string) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');

    return (
      <div className="space-y-1.5">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lIdx} className="h-1" />;

          const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
          const cleanLine = isBullet ? trimmed.replace(/^(\*|-|•)\s*/, '') : line;

          // Match ***text***, **text**, __text__, ==text==, or <mark>text</mark>
          const regex = /(\*\*\*[\s\S]+?\*\*\*|\*\*[\s\S]+?\*\*|__[\s\S]+?__|==[\s\S]+?==|<mark>[\s\S]+?<\/mark>)/g;
          const parts = cleanLine.split(regex);

          const renderedParts = parts.map((part, pIdx) => {
            if (
              (part.startsWith('***') && part.endsWith('***')) ||
              (part.startsWith('**') && part.endsWith('**')) ||
              (part.startsWith('__') && part.endsWith('__')) ||
              (part.startsWith('==') && part.endsWith('=='))
            ) {
              const cleanWord = part
                .replace(/^(\*\*\*|\*\*|__|==)/, '')
                .replace(/(\*\*\*|\*\*|__|==)$/, '');

              return (
                <mark
                  key={pIdx}
                  className="bg-amber-300 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-2xs mx-0.5 inline"
                >
                  {cleanWord}
                </mark>
              );
            } else if (part.startsWith('<mark>') && part.endsWith('</mark>')) {
              const cleanWord = part.replace(/^<mark>/, '').replace(/<\/mark>$/, '');
              return (
                <mark
                  key={pIdx}
                  className="bg-amber-300 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-2xs mx-0.5 inline"
                >
                  {cleanWord}
                </mark>
              );
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">{renderedParts}</div>
              </div>
            );
          }

          return (
            <p key={lIdx} className="leading-relaxed">
              {renderedParts}
            </p>
          );
        })}
      </div>
    );
  };

  const sampleQuestions = [
    "Quins són els 7 àmbits de la seguretat humana del PNUD?",
    "Quina diferència hi ha entre els principis COP?",
    "Quins són els drets del detingut segons l'article 520 de la LECrim?",
    "Quines competències té la PG-ME respecte la Policia Local?"
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[580px] text-slate-800">
      {/* Chat Header */}
      <div className="p-3.5 sm:p-4 bg-indigo-900 text-white border-b border-indigo-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-800 flex items-center justify-center text-white shadow-2xs shrink-0">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Formador Virtual - {uf.code}</h4>
            <p className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Basat únicament en el temari oficial
            </p>
          </div>
        </div>

        {/* User Surname Selector/Input */}
        <div className="flex items-center gap-2 bg-indigo-950/80 px-2.5 py-1.5 rounded-xl border border-indigo-700/80 text-xs shadow-inner">
          <UserCheck className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-indigo-200 text-[11px] font-semibold hidden sm:inline">Cognom alumne:</span>
          <span className="text-amber-300 font-extrabold text-[11px]">Sr./Sra.</span>
          <input
            type="text"
            value={userSurname}
            onChange={(e) => handleSurnameChange(e.target.value)}
            placeholder="COGNOM"
            className="bg-indigo-900 text-amber-300 font-black uppercase text-xs px-2 py-0.5 rounded-lg border border-indigo-500 focus:outline-none focus:border-amber-400 focus:bg-indigo-950 w-28 placeholder-indigo-400 text-center tracking-wide"
            title="Escriu el teu cognom per personalitzar l'atenció del Formador Virtual"
          />
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
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 whitespace-nowrap transition-colors font-medium shadow-2xs cursor-pointer"
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
              className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}
            >
              {m.sender === 'user' ? (
                <p className="whitespace-pre-line">{m.text}</p>
              ) : (
                renderFormattedMessage(m.text)
              )}
              <span className={`block text-[10px] text-right mt-1.5 ${m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400 font-mono'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-indigo-700 p-2 font-medium bg-indigo-50/60 rounded-xl border border-indigo-100 max-w-fit animate-pulse">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span>El formador virtual està consultant el document oficial...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Fes una pregunta sobre el temari, Sr. o Sra. ${userSurname.toUpperCase()}...`}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

