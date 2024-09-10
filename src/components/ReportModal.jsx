import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // لتصدير الجداول

const generatePDF = (data, title) => {
  const doc = new jsPDF();
  doc.text(title, 14, 16);

  // تحويل البيانات إلى جدول في PDF
  doc.autoTable({
    head: [['الفئة', 'المبلغ', 'التاريخ']],
    body: data.map(item => [item.category, item.amount, item.date])
  });

  doc.save(`${title}.pdf`);
};

const ReportModal = ({ onClose }) => {
  const [reportType, setReportType] = React.useState('monthly');
  const [reportsData, setReportsData] = React.useState([]);

  React.useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let filteredData = [];

    // تصفية البيانات بناءً على نوع التقرير
    if (reportType === 'monthly') {
      const currentMonth = new Date().getMonth();
      filteredData = transactions.filter(tx => new Date(tx.date).getMonth() === currentMonth);
    } else if (reportType === 'annual') {
      const currentYear = new Date().getFullYear();
      filteredData = transactions.filter(tx => new Date(tx.date).getFullYear() === currentYear);
    }

    setReportsData(filteredData);
  }, [reportType]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
        <h2 className="text-2xl font-semibold mb-4">تقارير مالية</h2>
        <div className="mb-4">
          <button
            onClick={() => setReportType('monthly')}
            className={`px-4 py-2 rounded ${reportType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            تقرير شهري
          </button>
          <button
            onClick={() => setReportType('annual')}
            className={`px-4 py-2 rounded ${reportType === 'annual' ? 'bg-blue-500 text-white' : 'bg-gray-200'} ml-2`}
          >
            تقرير سنوي
          </button>
        </div>

        <table id="reportTable" className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportsData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-left whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 text-left whitespace-nowrap">{item.amount}</td>
                <td className="px-6 py-4 text-left whitespace-nowrap">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button
            onClick={() => generatePDF(reportsData, `تقرير ${reportType === 'monthly' ? 'شهري' : 'سنوي'}`)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            تصدير كـ PDF
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-33 px-4 rounded"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
