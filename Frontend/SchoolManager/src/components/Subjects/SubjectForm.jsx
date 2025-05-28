import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import subjectService from '../../services/SubjectService';

const SubjectForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    faculty: '',
    credit: '',
    lessionPerWeek: '',
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        subjectId: initialData.subjectId || '',
        subjectName: initialData.subjectName || '',
        subjectCode: initialData.subjectCode || '',
        faculty: initialData.faculty || '',
        credit: initialData.credit || '',
        lessionPerWeek: initialData.lessionPerWeek || ''
      });
    } else {
      // Reset form for add mode
      setFormData({
        subjectName: '',
        subjectCode: '',
        faculty: '',
        credit: '',
        lessionPerWeek: ''
      });
    }
  }, [initialData, mode, isOpen]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await subjectService.getAllSubjects();
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    if (isOpen) {
      fetchSubjects();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
};

  

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'add' ? 'Thêm Môn Học Mới' : 'Cập Nhật Môn Học'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mã môn học</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.subjectCode}
                onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
              />
            
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tên môn học</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Khoa</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              />
            </div>

            

            <div>
              <label className="block text-sm font-medium text-gray-700">Tín chỉ</label>
              <input
                type="number"
                required
                min="1"
                max ="10"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.credit}
                onChange={(e) => setFormData({ ...formData, credit: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Số tiết học</label>
              <input
                type="number"
                required
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.lessionPerWeek}
                onChange={(e) => setFormData({ ...formData, lessionPerWeek: Number(e.target.value) })}
              />
            </div>

            

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {mode === 'add' ? 'Thêm' : 'Cập nhật'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default SubjectForm;