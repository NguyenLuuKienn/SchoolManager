import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import classService from '../../services/classService';

const ClassForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    className: '',
    grandeLevel: '',
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        classId: initialData.classId || '', 
        className: initialData.className || '',
        grandeLevel: initialData.grandeLevel || '',
      });
    } else {
      // Reset form for add mode
      setFormData({
        className: '',
        grandeLevel: '',
      });
    }
  }, [initialData, mode, isOpen]);

  const [errors, setErrors] = useState({});

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
              {mode === 'add' ? 'Thêm Lớp Học Mới' : 'Cập Nhật Lớp Học'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên lớp</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              />
             
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Khối</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.grandeLevel}
                onChange={(e) => setFormData({ ...formData, grandeLevel: e.target.value })}
              >
                <option value="">Chọn khối</option>
                <option value="10">Khối 10</option>
                <option value="11">Khối 11</option>
                <option value="12">Khối 12</option>
              </select>
             
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

export default ClassForm;