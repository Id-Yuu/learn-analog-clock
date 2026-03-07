import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QUIZ_QUESTIONS } from '../constants/quizQuestions';

function shuffleQuestions(questions) {
  return [...questions].sort(() => Math.random() - 0.5);
}

function pickRandomQuestions(length, previousQuestionIds = []) {
  const previousIdKey = previousQuestionIds.join('|');
  const maxAttempts = 8;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = shuffleQuestions(QUIZ_QUESTIONS).slice(0, length);
    const candidateIdKey = candidate.map((question) => question.id).join('|');

    if (!previousIdKey || candidateIdKey !== previousIdKey) {
      return candidate;
    }
  }

  return shuffleQuestions(QUIZ_QUESTIONS).slice(0, length);
}

export default function QuizPanel() {
  const { t, i18n } = useTranslation();
  const [quizLength, setQuizLength] = useState(5);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const previousQuestionIdsRef = useRef([]);

  const currentLang = i18n.language.startsWith('id') ? 'id' : 'en';
  const currentQuestion = activeQuestions[currentIndex];

  const score = useMemo(
    () => activeQuestions.reduce((sum, question) => (answers[question.id] === question.correctOption ? sum + 1 : sum), 0),
    [activeQuestions, answers],
  );

  const startQuiz = (length) => {
    const nextQuestions = pickRandomQuestions(length, previousQuestionIdsRef.current);

    setQuizLength(length);
    setActiveQuestions(nextQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setIsQuizActive(true);
    setIsQuizFinished(false);

    previousQuestionIdsRef.current = nextQuestions.map((question) => question.id);
  };

  const handleAnswer = (optionKey) => {
    if (!currentQuestion) return;

    const nextAnswers = { ...answers, [currentQuestion.id]: optionKey };
    setAnswers(nextAnswers);

    if (currentIndex === activeQuestions.length - 1) {
      setIsQuizFinished(true);
      setIsQuizActive(false);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="w-full border border-slate-300 dark:border-slate-600 rounded-xl p-6 md:p-8 bg-white/80 dark:bg-slate-800/60 mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('quizTitle')}</h2>
        <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold">
          {t('quizBankCount', { count: QUIZ_QUESTIONS.length })}
        </span>
      </div>

      {!isQuizActive && !isQuizFinished && (
        <div className="space-y-3">
          <p className="text-slate-600 dark:text-slate-300">{t('quizChooseCount')}</p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => startQuiz(5)}
              className="px-4 py-2 rounded-lg font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
            >
              {t('quizStartWithCount', { count: 5 })}
            </button>
            <button
              onClick={() => startQuiz(10)}
              className="px-4 py-2 rounded-lg font-semibold bg-slate-700 hover:bg-slate-800 text-white transition-colors"
            >
              {t('quizStartWithCount', { count: 10 })}
            </button>
          </div>
        </div>
      )}

      {isQuizActive && currentQuestion && (
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            {t('quizProgress', { current: currentIndex + 1, total: quizLength })}
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            {currentQuestion.prompt[currentLang]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.key}
                onClick={() => handleAnswer(option.key)}
                className="text-left px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="font-bold mr-2">{option.key}.</span>
                <span>{option.text[currentLang]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isQuizFinished && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 font-semibold">
            {t('quizScore', { score, total: quizLength })}
          </div>

          <div className="space-y-3">
            {activeQuestions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctOption;

              return (
                <div
                  key={question.id}
                  className={`rounded-lg border p-4 ${
                    isCorrect
                      ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                      : 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20'
                  }`}
                >
                  <p className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                    {index + 1}. {question.prompt[currentLang]}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    {t('quizYourAnswer')}: <strong>{userAnswer ?? '-'}</strong>
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    {t('quizCorrectAnswer')}: <strong>{question.correctOption}</strong>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {t('quizExplanation')}: {question.explanation[currentLang]}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => startQuiz(quizLength)}
            className="px-5 py-2 rounded-lg font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
          >
            {t('quizRetry')}
          </button>
        </div>
      )}
    </section>
  );
}
