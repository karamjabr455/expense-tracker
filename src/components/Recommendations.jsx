import React, { useEffect } from 'react';

const Recommendations = ({ transactions, budget }) => {
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((total, t) => total + parseFloat(t.amount), 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((total, t) => total + parseFloat(t.amount), 0);

  const recommendation = budget
    ? totalExpenses > budget
      ? 'لقد تجاوزت ميزانيتك، حاول تقليل النفقات.'
      : 'أنت ضمن ميزانيتك. تابع العمل الجيد!'
    : 'حدد ميزانية لتلقي توصيات دقيقة.';

  // دالة لتحويل النص إلى كلام باللغة العربية
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar'; // تحديد اللغة إلى العربية

      // البحث عن صوت عربي محدد
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((voice) => voice.lang.startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('متصفحك لا يدعم ميزة تحويل النص إلى كلام.');
    }
  };

  useEffect(() => {
    // قراءة النص التحذيري عند تجاوز الميزانية
    if (totalExpenses > (budget || 0)) {
      speakText(recommendation);
    }
  }, [totalExpenses, budget, recommendation]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-[#3d3d3d]">
      <h2 className="text-2xl font-semibold mb-4 text-white">التوصيات</h2>
      <p className={`text-lg ${totalExpenses > (budget || 0) ? 'text-red-600' : 'text-green-600'}`}>
        {recommendation}
      </p>
    </div>
  );
};

export default Recommendations;
