import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Eye, Pause, Play, Shuffle } from 'lucide-react';
import { TopicContent } from '../types';

type Card = { id: string; topic: string; question: string; answer: string; keyConcept?: string };

export function AnkiFlashcards({ topics }: { topics: TopicContent[] }) {
  const initialCards = useMemo<Card[]>(() => topics.flatMap((topic, topicIndex) => {
    const cards: Card[] = [{
      id: `topic-${topicIndex}`,
      topic: topic.titolTema,
      question: `Què cal retenir de ${topic.titolTema}?`,
      answer: topic.resumBreu || topic.desenvolupamentText.join('\n\n'),
      keyConcept: topic.subratllatVerd?.[0]
    }];

    (topic.subratllatVerd || []).forEach((concept, conceptIndex) => {
      const explanation = topic.desenvolupamentText.find(text => text.toLowerCase().includes(concept.toLowerCase())) || topic.resumBreu;
      if (explanation) cards.push({
        id: `concept-${topicIndex}-${conceptIndex}`,
        topic: topic.titolTema,
        question: `Com defineix o desenvolupa el temari el concepte «${concept}»?`,
        answer: explanation,
        keyConcept: concept
      });
    });
    return cards;
  }), [topics]);

  const [cards, setCards] = useState(initialCards);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [results, setResults] = useState({ facil: 0, correcte: 0, dificil: 0 });

  useEffect(() => { setCards(initialCards); setIndex(0); }, [initialCards]);
  useEffect(() => { setRevealed(false); setPaused(false); setSeconds(20); }, [index, cards]);
  useEffect(() => {
    if (revealed || paused || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds(value => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [seconds, paused, revealed]);
  useEffect(() => { if (seconds === 0) setRevealed(true); }, [seconds]);

  if (!cards.length) return <p className="text-sm text-slate-600">No hi ha contingut suficient per crear targetes en aquesta UF.</p>;
  const card = cards[index];
  const next = () => setIndex(value => (value + 1) % cards.length);
  const previous = () => setIndex(value => (value - 1 + cards.length) % cards.length);
  const rate = (result: keyof typeof results) => { setResults(current => ({ ...current, [result]: current[result] + 1 })); next(); };

  return (
    <div className="space-y-5">
      <div className="bg-slate-900 text-white rounded-xl p-5">
        <p className="text-xs font-bold tracking-wide text-amber-300">TARGETES ANKI</p>
        <h2 className="text-xl font-extrabold mt-1">Repàs actiu del temari</h2>
        <p className="text-sm text-slate-300 mt-2">Pensa la resposta durant 20 segons i, quan la vegis, valora com l'has recordada.</p>
        <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
          <span>Fàcils: <strong>{results.facil}</strong></span><span>Correctes: <strong>{results.correcte}</strong></span><span>Difícils: <strong>{results.dificil}</strong></span>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700">{card.topic} · {index + 1} / {cards.length}</span>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700"><Clock className="w-4 h-4" /> {revealed ? 'Resposta revelada' : `${seconds} s`}
            {!revealed && <button onClick={() => setPaused(value => !value)} aria-label="Pausar o reprendre"><>{paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}</></button>}
          </div>
        </div>
        {!revealed && <div className="h-2 bg-slate-200"><div className="h-full bg-amber-500 transition-all" style={{ width: `${seconds * 5}%` }} /></div>}
        <div className="p-6 space-y-6">
          <div><p className="text-xs font-bold text-amber-700">PREGUNTA</p><h3 className="text-lg font-extrabold text-slate-900 mt-2">{card.question}</h3></div>
          {revealed ? <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4"><p className="text-xs font-bold text-amber-800">RESPOSTA DEL TEMARI</p><p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 mt-2">{card.answer}</p>{card.keyConcept && <p className="text-xs font-bold text-amber-900 mt-3">Concepte clau: {card.keyConcept}</p>}</div> : <button onClick={() => setRevealed(true)} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex justify-center gap-2"><Eye className="w-4 h-4" />Veure resposta</button>}
          {revealed && <div className="grid grid-cols-3 gap-2"><button onClick={() => rate('dificil')} className="py-2 rounded-lg border border-red-300 bg-red-50 text-red-800 text-xs font-bold">Difícil</button><button onClick={() => rate('correcte')} className="py-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold">Correcte</button><button onClick={() => rate('facil')} className="py-2 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold">Fàcil</button></div>}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between"><button onClick={previous} className="text-xs font-bold flex gap-1"><ChevronLeft className="w-4 h-4" />Anterior</button><button onClick={() => { setCards(values => [...values].sort(() => Math.random() - .5)); setIndex(0); }} className="text-xs font-bold flex gap-1"><Shuffle className="w-4 h-4" />Barrejar</button><button onClick={next} className="text-xs font-bold flex gap-1">Següent<ChevronRight className="w-4 h-4" /></button></div>
      </div>
    </div>
  );
}

