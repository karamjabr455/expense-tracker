import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

const AccountingSystem = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ amount: '', description: '', status: 'غير مدفوعة' });

  // جلب الفواتير من localStorage عند تحميل المكون
  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
    setInvoices(storedInvoices);
  }, []);

  // تحديث الفواتير في localStorage
  const updateLocalStorage = (updatedInvoices) => {
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

  // إضافة فاتورة جديدة
  const addInvoice = () => {
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    updateLocalStorage(updatedInvoices);
    setNewInvoice({ amount: '', description: '', status: 'غير مدفوعة' });
  };

  // تغيير حالة الفاتورة
  const setStatus = (index, status) => {
    const updatedInvoices = invoices.map((invoice, i) =>
      i === index ? { ...invoice, status } : invoice
    );
    setInvoices(updatedInvoices);
    updateLocalStorage(updatedInvoices);
  };

  // حذف فاتورة
  const deleteInvoice = (index) => {
    const updatedInvoices = invoices.filter((_, i) => i !== index);
    setInvoices(updatedInvoices);
    updateLocalStorage(updatedInvoices);
  };

  return (
    <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-[#3d3d3d] rounded-lg shadow-md mt-4 sm:mt-6">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">نظام محاسبي</h2>
  
    <div className="mb-2 sm:mb-4">
      <input
        type="text"
        placeholder="المبلغ"
        value={newInvoice.amount}
        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
        className="border p-1 sm:p-2 mr-2 rounded text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="الوصف"
        value={newInvoice.description}
        onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
        className="border p-1 sm:p-2 mr-2 rounded text-sm sm:text-base"
      />
      <button onClick={addInvoice} className="bg-indigo-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">إضافة فاتورة</button>
    </div>
  
    {invoices.length === 0 ? (
      <p className="text-white text-sm sm:text-base">لا توجد فواتير لعرضها.</p>
    ) : (
      <table className="min-w-full bg-[#3d3d3d] rounded-lg shadow overflow-hidden">
        <thead className="bg-indigo-600 text-white text-sm sm:text-base">
          <tr>
            <th className="py-1 sm:py-2 px-2 sm:px-4 text-left">المبلغ</th>
            <th className="py-1 sm:py-2 px-2 sm:px-4 text-left">الوصف</th>
            <th className="py-1 sm:py-2 px-2 sm:px-4 text-left">الحالة</th>
            <th className="py-1 sm:py-2 px-2 sm:px-4 text-left">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="border-b border-gray-200 text-sm sm:text-base">
              <td className="py-1 sm:py-2 px-2 sm:px-4 text-left text-white">{invoice.amount}</td>
              <td className="py-1 sm:py-2 px-2 sm:px-4 text-left text-white">{invoice.description}</td>
              <td className="py-1 sm:py-2 px-2 sm:px-4 text-left text-white">
                <span className={`px-1 sm:px-2 py-1 rounded ${invoice.status === 'مدفوعة' ? 'bg-green-600' : 'bg-red-600'} text-white text-xs sm:text-sm`}>
                  {invoice.status}
                </span>
              </td>
              <td className="py-1 sm:py-2 px-2 sm:px-4 text-left">
                <button
                  onClick={() => setStatus(index, 'مدفوعة')}
                  className={`bg-green-500 hover:bg-green-700 text-white px-1 sm:px-2 py-1 sm:py-2 rounded text-xs sm:text-sm mr-2 ${invoice.status === 'مدفوعة' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={invoice.status === 'مدفوعة'}
                >
                  مدفوعة
                </button>
                <button
                  onClick={() => setStatus(index, 'غير مدفوعة')}
                  className={`bg-red-500 hover:bg-red-700 text-white px-1 sm:px-2 py-1 sm:py-2 rounded text-xs sm:text-sm ${invoice.status === 'غير مدفوعة' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={invoice.status === 'غير مدفوعة'}
                >
                  غير مدفوعة
                </button>
                <button onClick={() => deleteInvoice(index)} className="text-white py-1 sm:py-2 px-1 sm:px-2 text-center rounded ml-2">
                  <TrashIcon className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default AccountingSystem;
