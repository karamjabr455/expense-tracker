import React from 'react';

const BudgetOverview = ({ transactions }) => {
  const getTotal = (type) => {
    return transactions
      .filter((t) => t.type === type)
      .reduce((total, t) => total + parseFloat(t.amount), 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg bg-[#3d3d3d]">
      <h2 className="text-2xl font-semibold mb-6 text-white">نظرة عامة على الميزانية</h2>
      <div className="space-y-4">
        <div className="text-lg font-medium text-white">
          إجمالي الإيرادات: <span className="font-bold text-green-600">${getTotal('income').toFixed(2)}</span>
        </div>
        <div className="text-lg font-medium text-white">
          إجمالي النفقات: <span className="font-bold text-red-600">${getTotal('expense').toFixed(2)}</span>
        </div>
        <div className="text-lg font-medium text-white">
          الميزانية المتبقية: <span className={`font-bold ${getTotal('income') - getTotal('expense') < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ${ (getTotal('income') - getTotal('expense')).toFixed(2) }
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
