import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import BudgetOverview from './components/BudgetOverview';
import ExpenseChart from './components/ExpenseChart';
import Recommendations from './components/Recommendations';
import TransactionsTable from './components//TransactionsTable ';
import ReportModal from './components/ReportModal';
import AccountingSystem from './components/AccountingSystem'; // تأكد من وضع المسار الصحيح للمكون

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showClearDataModal, setShowClearDataModal] = useState(false); // حالة للتحكم في عرض النافذة التحذيرية

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const savedBudget = localStorage.getItem('budget') || null;
    setTransactions(savedTransactions);
    setBudget(savedBudget);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (budget !== null) {
      localStorage.setItem('budget', budget);
    }
  }, [budget]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const setBudgetHandler = (newBudget) => {
    setBudget(newBudget);
  };

  const clearData = () => {
    localStorage.removeItem('transactions');
    localStorage.removeItem('budget');
    setTransactions([]);
    setBudget(null);
    setShowClearDataModal(false); // إخفاء النافذة بعد المسح
  };

  const toggleReportModal = () => setShowReportModal(!showReportModal);

  const toggleClearDataModal = () => setShowClearDataModal(!showClearDataModal); // توسيع/إغلاق النافذة التحذيرية

  return (
    <div className="bg-[#212121] min-h-screen p-6 relative">
      <Header />
      <button
        onClick={toggleClearDataModal} // ربط الزر بفتح النافذة التحذيرية
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        مسح جميع البيانات
      </button>

      {/* زر تقارير مالية */}
      <button
        onClick={toggleReportModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        تقارير مالية
      </button>

      {/* نافذة التقارير المالية */}
      {showReportModal && <ReportModal onClose={toggleReportModal} />}

      {/* نافذة التحذير عند مسح جميع البيانات */}
      {showClearDataModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg text-center z-60">
      <h2 className="text-xl font-semibold mb-4">هل أنت متأكد أنك تريد مسح جميع البيانات؟</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={clearData} // مسح البيانات إذا تم النقر على "نعم"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          نعم
        </button>
        <button
          onClick={toggleClearDataModal} // إغلاق النافذة إذا تم النقر على "لا"
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          لا
        </button>
      </div>
    </div>
  </div>
)}


      {/* ترتيب الأقسام أفقيًا: نظرة عامة على الميزانية - إضافة معاملة - التوصيات */}
      <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
        <div className="w-full md:w-1/4 bg-[rgba(255, 255, 255, 0.1)] backdrop-blur-sm rounded-lg shadow-lg p-6 mb-4 md:mb-0">
          <BudgetOverview transactions={transactions} budget={budget} />
        </div>

        <div className="w-full md:w-1/2 bg-[rgba(255, 255, 255, 0.1)] backdrop-blur-sm rounded-lg shadow-lg p-6 mb-4 md:mb-0">
          <TransactionForm onAddTransaction={addTransaction} onSetBudget={setBudgetHandler} />
        </div>

        <div className="w-full md:w-1/4 bg-[rgba(255, 255, 255, 0.1)] backdrop-blur-sm rounded-lg shadow-lg p-6 mb-4 md:mb-0">
          <Recommendations transactions={transactions} budget={budget} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 mt-6">
        <div className="w-full md:w-1/2 bg-[rgba(255, 255, 255, 0.1)] backdrop-blur-sm rounded-lg shadow-lg p-6 mb-4 md:mb-0">
          <ExpenseChart transactions={transactions} />
        </div>

        <div className="w-full md:w-1/2 bg-[rgba(255, 255, 255, 0.1)] backdrop-blur-sm rounded-lg shadow-lg p-6">
          <TransactionsTable transactions={transactions} />
        </div>
      </div>

      <AccountingSystem />
    </div>
  );
};

export default App;
