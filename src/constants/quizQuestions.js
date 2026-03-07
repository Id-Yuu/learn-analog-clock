const NUMBER_WORDS = {
  en: ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'],
  id: ['dua belas', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'],
};

const MINUTE_VALUES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const BASE_QUESTION = {
  id: 'q1',
  prompt: {
    en: 'Which statement is correct regarding the minute hand pointing to the number 9?',
    id: 'Pernyataan manakah yang benar jika jarum menit menunjuk angka 9?',
  },
  options: [
    { key: 'A', text: { en: 'It means 9 minutes past the hour.', id: 'Itu berarti 9 menit lewat dari jam.' } },
    { key: 'B', text: { en: 'It means 30 minutes past the hour.', id: 'Itu berarti 30 menit lewat dari jam.' } },
    { key: 'C', text: { en: 'It means 45 minutes past the hour.', id: 'Itu berarti 45 menit lewat dari jam.' } },
    { key: 'D', text: { en: 'It means 50 minutes past the hour.', id: 'Itu berarti 50 menit lewat dari jam.' } },
  ],
  correctOption: 'C',
  explanation: {
    en: 'Each number on the clock equals 5 minutes, so number 9 equals 45 minutes.',
    id: 'Setiap angka pada jam bernilai 5 menit, jadi angka 9 sama dengan 45 menit.',
  },
};

function createMinuteQuestion(clockNumber) {
  const minuteValue = MINUTE_VALUES[clockNumber % 12];
  const distractorA = (minuteValue + 10) % 60;
  const distractorB = (minuteValue + 20) % 60;
  const distractorC = (minuteValue + 30) % 60;

  return {
    id: `minute-${clockNumber}`,
    prompt: {
      en: `If the minute hand points to ${clockNumber === 0 ? 12 : clockNumber}, how many minutes past the hour is it?`,
      id: `Jika jarum menit menunjuk ${clockNumber === 0 ? 12 : clockNumber}, berapa menit lewat dari jam?`,
    },
    options: [
      { key: 'A', text: { en: `${distractorA} minutes`, id: `${distractorA} menit` } },
      { key: 'B', text: { en: `${minuteValue} minutes`, id: `${minuteValue} menit` } },
      { key: 'C', text: { en: `${distractorB} minutes`, id: `${distractorB} menit` } },
      { key: 'D', text: { en: `${distractorC} minutes`, id: `${distractorC} menit` } },
    ],
    correctOption: 'B',
    explanation: {
      en: `The minute hand on ${clockNumber === 0 ? 12 : clockNumber} means ${minuteValue} minutes.`,
      id: `Jarum menit pada ${clockNumber === 0 ? 12 : clockNumber} berarti ${minuteValue} menit.`,
    },
  };
}

function createHourQuestion(hourIndex) {
  const hourLabel = hourIndex === 0 ? 12 : hourIndex;
  const enWord = NUMBER_WORDS.en[hourIndex % 12];
  const idWord = NUMBER_WORDS.id[hourIndex % 12];

  return {
    id: `hour-${hourLabel}`,
    prompt: {
      en: `When the short hand points exactly to ${hourLabel} and minute hand is on 12, what time is shown?`,
      id: `Saat jarum pendek tepat di ${hourLabel} dan jarum menit di 12, waktu berapa yang ditunjukkan?`,
    },
    options: [
      { key: 'A', text: { en: `${hourLabel}:00`, id: `${hourLabel}:00` } },
      { key: 'B', text: { en: `${(hourLabel % 12) + 1}:00`, id: `${(hourLabel % 12) + 1}:00` } },
      { key: 'C', text: { en: `${hourLabel}:30`, id: `${hourLabel}:30` } },
      { key: 'D', text: { en: `Half past ${enWord}`, id: `Setengah lewat ${idWord}` } },
    ],
    correctOption: 'A',
    explanation: {
      en: 'Minute hand on 12 means :00 exactly.',
      id: 'Jarum menit di 12 berarti tepat :00.',
    },
  };
}

function createSecondQuestion(mark) {
  const seconds = (mark % 12) * 5;
  const shownMark = mark === 0 ? 12 : mark;

  return {
    id: `second-${shownMark}`,
    prompt: {
      en: `If the second hand points to ${shownMark}, how many seconds are shown?`,
      id: `Jika jarum detik menunjuk ${shownMark}, berapa detik yang ditunjukkan?`,
    },
    options: [
      { key: 'A', text: { en: `${seconds} seconds`, id: `${seconds} detik` } },
      { key: 'B', text: { en: `${(seconds + 1) % 60} seconds`, id: `${(seconds + 1) % 60} detik` } },
      { key: 'C', text: { en: `${(seconds + 10) % 60} seconds`, id: `${(seconds + 10) % 60} detik` } },
      { key: 'D', text: { en: `${(seconds + 15) % 60} seconds`, id: `${(seconds + 15) % 60} detik` } },
    ],
    correctOption: 'A',
    explanation: {
      en: 'On an analog clock, each number represents 5 seconds for the second hand.',
      id: 'Pada jam analog, setiap angka mewakili 5 detik untuk jarum detik.',
    },
  };
}

function createMixedQuestion(index) {
  const hour = (index % 12) + 1;
  const minuteStep = (index * 5) % 60;
  const nextHour = (hour % 12) + 1;

  return {
    id: `mixed-${index + 1}`,
    prompt: {
      en: `At ${hour}:${String(minuteStep).padStart(2, '0')}, where is the hour hand located?`,
      id: `Pada pukul ${hour}:${String(minuteStep).padStart(2, '0')}, posisi jarum jam berada di mana?`,
    },
    options: [
      { key: 'A', text: { en: `Exactly on ${hour}`, id: `Tepat di angka ${hour}` } },
      { key: 'B', text: { en: `Between ${hour} and ${nextHour}`, id: `Di antara angka ${hour} dan ${nextHour}` } },
      { key: 'C', text: { en: `Exactly on ${nextHour}`, id: `Tepat di angka ${nextHour}` } },
      { key: 'D', text: { en: 'On number 12 no matter the minutes', id: 'Selalu di angka 12 berapa pun menitnya' } },
    ],
    correctOption: minuteStep === 0 ? 'A' : 'B',
    explanation: {
      en: minuteStep === 0
        ? `At :00, the hour hand is exactly on ${hour}.`
        : `After :00, the hour hand moves gradually from ${hour} toward ${nextHour}.`,
      id: minuteStep === 0
        ? `Pada menit :00, jarum jam tepat di angka ${hour}.`
        : `Setelah :00, jarum jam bergerak bertahap dari ${hour} ke ${nextHour}.`,
    },
  };
}

const generatedQuestions = [BASE_QUESTION];

for (let i = 0; i < 12; i += 1) generatedQuestions.push(createMinuteQuestion(i));
for (let i = 0; i < 12; i += 1) generatedQuestions.push(createHourQuestion(i));
for (let i = 0; i < 12; i += 1) generatedQuestions.push(createSecondQuestion(i));
for (let i = 0; i < 13; i += 1) generatedQuestions.push(createMixedQuestion(i));

export const QUIZ_QUESTIONS = generatedQuestions.slice(0, 50);
