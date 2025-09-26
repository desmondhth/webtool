import { ArrowRight, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';

type QuizAnswer = {
  id: string;
  label: string;
  description: string;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  answers: QuizAnswer[];
};

const quiz: QuizQuestion[] = [
  {
    id: 'focus',
    prompt: 'What area of your life do you most want to reset right now?',
    answers: [
      {
        id: 'health',
        label: 'Health & Vitality',
        description: 'Boost energy, improve nutrition, and establish sustainable routines.',
      },
      {
        id: 'career',
        label: 'Career & Purpose',
        description: 'Clarify goals, build new skills, and map a path toward meaningful work.',
      },
      {
        id: 'relationships',
        label: 'Relationships & Community',
        description: 'Strengthen connections, set boundaries, and cultivate support systems.',
      },
      {
        id: 'mindset',
        label: 'Mindset & Growth',
        description: 'Build resilience practices, create rituals, and reframe limiting beliefs.',
      },
    ],
  },
  {
    id: 'timeframe',
    prompt: 'How much time can you commit to change each week?',
    answers: [
      {
        id: 'micro',
        label: 'Under 2 hours',
        description: 'Quick wins and micro-habits that fit into a packed schedule.',
      },
      {
        id: 'moderate',
        label: '2–5 hours',
        description: 'Balanced resets with guided planning and reflection exercises.',
      },
      {
        id: 'deep',
        label: '5+ hours',
        description: 'Comprehensive transformation journeys with accountability tools.',
      },
    ],
  },
  {
    id: 'support',
    prompt: 'What level of support helps you stay committed?',
    answers: [
      {
        id: 'solo',
        label: 'Self-Guided',
        description: 'Structured prompts and checklists you can explore independently.',
      },
      {
        id: 'community',
        label: 'Community-Based',
        description: 'Group challenges and peer discussions for shared motivation.',
      },
      {
        id: 'coaching',
        label: 'Coach-Led',
        description: 'Regular touchpoints, personalized plans, and progress tracking.',
      },
    ],
  },
];

function buildRecommendation(selections: Record<string, string | undefined>) {
  const focus = selections.focus ?? 'health';
  const timeframe = selections.timeframe ?? 'micro';
  const support = selections.support ?? 'solo';

  const focusText: Record<string, string> = {
    health: 'a revitalizing wellness reset',
    career: 'a career clarity and growth journey',
    relationships: 'a relationship renewal pathway',
    mindset: 'a mindset expansion and reflection track',
  };

  const timeframeText: Record<string, string> = {
    micro: 'micro-habits you can integrate in under 2 hours each week',
    moderate: 'a balanced weekly rhythm that fits 2–5 intentional hours',
    deep: 'an immersive structure with dedicated time for deep work',
  };

  const supportText: Record<string, string> = {
    solo: 'self-paced prompts and reflection tools',
    community: 'community challenges, live sessions, and accountability circles',
    coaching: 'one-on-one coaching, milestone planning, and progress dashboards',
  };

  return `We recommend ${focusText[focus]} featuring ${timeframeText[timeframe]} and ${supportText[support]}.`;
}

export default function App() {
  const [selections, setSelections] = useState<Record<string, string | undefined>>({});
  const recommendation = useMemo(() => buildRecommendation(selections), [selections]);

  const handleSelect = (questionId: string, answerId: string) => {
    setSelections((prev) => ({ ...prev, [questionId]: prev[questionId] === answerId ? undefined : answerId }));
  };

  const handleReset = () => {
    setSelections({});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">Life Reset Program</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Personalized Reset Planner</h1>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:border-emerald-300 hover:text-emerald-100"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reset choices
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-4xl gap-10 px-6 py-12">
        {quiz.map((question) => (
          <section key={question.id} className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/80">Question</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{question.prompt}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {question.answers.map((answer) => {
                const isSelected = selections[question.id] === answer.id;
                return (
                  <button
                    key={answer.id}
                    type="button"
                    onClick={() => handleSelect(question.id, answer.id)}
                    className={`group relative flex h-full flex-col rounded-2xl border p-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                      isSelected
                        ? 'border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(52,211,153,0.4)]'
                        : 'border-slate-800/80 bg-slate-900/50 hover:border-emerald-500/60 hover:bg-emerald-500/5'
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      {answer.label}
                    </span>
                    <p className="mt-3 flex-1 text-sm text-slate-200/80">{answer.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-200">
                      {isSelected ? 'Selected' : 'Choose option'}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        <section className="rounded-3xl border border-emerald-500/60 bg-emerald-500/10 p-8">
          <h2 className="text-2xl font-semibold text-emerald-200">Your Reset Focus</h2>
          <p className="mt-4 text-base text-emerald-100/90">{recommendation}</p>
          <p className="mt-6 text-sm text-emerald-200/60">
            Fine-tune your plan by adjusting your selections above. Your recommendation updates instantly as you
            explore what matters most right now.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-6 py-6 text-xs uppercase tracking-[0.35em] text-slate-500">
          Crafted to help you reset with intention
        </div>
      </footer>
    </div>
  );
}
