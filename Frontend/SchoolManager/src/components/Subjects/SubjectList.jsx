import React, { useEffect, useState } from 'react';
import subjectService from '../../services/SubjectService';
import { Plus, Search, Edit2, Trash2, Clock, Users, BookOpen } from 'lucide-react';
import Swal from 'sweetalert2';
import SubjectForm from './SubjectForm';

const SubjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleAddSubject = async (subjectData) => {
    try {
      const response = await subjectService.createSubject(subjectData);
      setSubjects(prevSubjects => [...prevSubjects, response.data]);
      setIsModalOpen(false);
      await Swal.fire('Thành công!', 'Thêm môn học mới thành công.', 'success');
      const refreshResponse = await subjectService.getAllSubjects();
      setSubjects(refreshResponse.data);
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể thêm môn học.', 'error');
    }
  }
  const handleEditSubject = async (subjectData) => {
    try {
      await subjectService.updateSubject(selectedSubject.subjectId, subjectData);
      setIsModalOpen(false);
      setSelectedSubject(null);
      await Swal.fire('Thành công!', 'Cập nhật môn học thành công.', 'success');
      // Gọi hàm fetch để cập nhật danh sách
      await fetchSubjects();
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Lỗi!', 'Không thể cập nhật môn học.', 'error');
    }
  };
  const handleDeleteSubject = async (subjectId) => {
  const result = await Swal.fire({
    title: 'Bạn có chắc muốn xoá môn học này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xoá',
    cancelButtonText: 'Huỷ',
  });

  if (result.isConfirmed) {
    try {
      await subjectService.deleteSubject(subjectId);
      setSubjects(prev => prev.filter(s => s.subjectId !== subjectId));
      Swal.fire('Đã xoá!', 'Môn học đã được xoá.', 'success');
    } catch (error) {
      Swal.fire('Lỗi!', 'Xoá môn học thất bại.', 'error');
    }
  }
};

  const fetchSubjects = async () => {
    try {
      const response = await subjectService.getAllSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      Swal.fire('Lỗi!', 'Không thể tải danh sách môn học.', 'error');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Môn Học</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Môn Học
        </button>
      </div>
      

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm môn học..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất Cả Khoa</option>
          <option value="science">Khoa Học Tự Nhiên</option>
          <option value="social">Khoa Học Xã Hội</option>
        </select>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div key={subject.subjectId} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{subject.subjectName}</h3>
                <p className="text-sm text-gray-500">Mã môn: {subject.subjectCode}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setModalMode('edit');
                    setSelectedSubject(subject);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteSubject(subject.subjectId)}>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600">{subject.department}</p>
              
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{subject.teachers} giáo viên</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{subject.credit} tín chỉ</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{subject.lessionPerWeek} tiết/tuần</span>
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Xem Chi Tiết
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">6</span> trong số{' '}
          <span className="font-medium">12</span> môn học
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Trước</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Sau</button>
        </div>
      </div>

      {/* Subject Form Modal */}
      <SubjectForm 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubject(null);
          setModalMode('add');
        }}
        onSubmit={modalMode === 'add' ? handleAddSubject : handleEditSubject}
        initialData={selectedSubject}
        mode={modalMode}
      />
    </div>
  );
};

export default SubjectList;