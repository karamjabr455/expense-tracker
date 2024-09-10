import React from 'react';

const TransactionsTable = ({ transactions }) => {
  // تصفية النفقات والإيرادات
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded-lg shadow-lg bg-[#3d3d3d]">
      <h2 className="text-2xl font-semibold mb-4 text-white">الجدول المالي</h2>

      {/* قسم النفقات */}
      <div className="overflow-x-auto mb-8">
        <h3 className="text-xl font-semibold mb-2 text-white">النفقات</h3>
        <table className="min-w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg">
          <thead>
            <tr className="text-sm sm:text-xs"> {/* تصغير خط الرأس في الشاشات الصغيرة */}
              <th className="py-2 px-4 border-b text-center border-gray-600">الفئة</th>
              <th className="py-2 px-4 border-b text-center border-gray-600">المبلغ</th>
              <th className="py-2 px-4 border-b text-center border-gray-600">التاريخ</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-xs"> {/* تصغير خط الجسم في الشاشات الصغيرة */}
            {expenses.length > 0 ? expenses.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center border-gray-600">{transaction.category}</td>
                <td className="py-2 px-4 border-b text-center border-gray-600">${transaction.amount}</td>
                <td className="py-2 px-4 border-b text-center border-gray-600">{transaction.date}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">لا توجد نفقات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* قسم الإيرادات */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-2 text-white">الإيرادات</h3>
        <table className="min-w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg">
          <thead>
            <tr className="text-sm sm:text-xs"> {/* تصغير خط الرأس في الشاشات الصغيرة */}
              <th className="py-2 px-4 border-b text-center border-gray-600">الفئة</th>
              <th className="py-2 px-4 border-b text-center border-gray-600">المبلغ</th>
              <th className="py-2 px-4 border-b text-center border-gray-600">التاريخ</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-xs"> {/* تصغير خط الجسم في الشاشات الصغيرة */}
            {incomes.length > 0 ? incomes.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center border-gray-600">{transaction.category}</td>
                <td className="py-2 px-4 border-b text-center border-gray-600">${transaction.amount}</td>
                <td className="py-2 px-4 border-b text-center border-gray-600">{transaction.date}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">لا توجد إيرادات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
