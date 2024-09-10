import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction, onSetBudget }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense'); // expense or income
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { amount, category, type, date };

    // احصل على المعاملات الحالية من localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // أضف المعاملة الجديدة
    const updatedTransactions = [...storedTransactions, newTransaction];
    
    // احفظ المعاملات المحدّثة إلى localStorage
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    onAddTransaction(newTransaction);
    setAmount('');
    setCategory('');
    setType('expense');
    setDate('');
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    onSetBudget(budget);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-[#3d3d3d]">
      <h2 className="text-xl font-semibold mb-4 text-white">إضافة معاملة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">المبلغ</label>
          <input
            id="amount"
            type="number"
            placeholder="أدخل المبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">الفئة</label>
          <input
            id="category"
            type="text"
            placeholder="أدخل الفئة"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">النوع</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="expense">نفقات</option>
            <option value="income">إيرادات</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">التاريخ</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          إضافة معاملة
        </button>
      </form>
      <h2 className="text-xl font-semibold mt-6 mb-4 text-white">تحديد الميزانية</h2>
      <form onSubmit={handleBudgetSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">الميزانية</label>
          <input
            id="budget"
            type="number"
            placeholder="أدخل الميزانية"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          تعيين الميزانية
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
