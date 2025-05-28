import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Users, BookOpen } from 'lucide-react';
import classService from '../../services/classService';
import ClassForm from './ClassForm';
import Swal from 'sweetalert2';
import { use } from 'react';
import studentService from '../../services/studentservice';

const ClassList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedClass, setSelectedClass] = useState(null);
  const [student, setStudent] = useState([]);

  const handleAddClass = async (classData) => {
    try {
      const response = await classService.createClass(classData);
      // Update class list
      setClasses(prev => [...prev, response.data]);
      setIsModalOpen(false);
      await Swal.fire('Thành công!', 'Thêm lớp học mới thành công.', 'success');
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể thêm lớp học.', 'error');
    }
  };
  const handleEditClass = async (classData) => {
    try {
      const response = await classService.updateClass(selectedClass.classId, classData);
      setClasses(prev => prev.map(c => c.classId === selectedClass.classId ? response.data : c));
      setIsModalOpen(false);
      setSelectedClass(null);
      await Swal.fire('Thành công!', 'Cập nhật lớp học thành công.', 'success');
      await fetchClasses();
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể cập nhật lớp học.', 'error');
    }
  };
  const handleDeleteClass = async (classId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xoá lớp học này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    });

    if (result.isConfirmed) {
      try {
        await classService.deleteClass(classId);
        setClasses(prev => prev.filter(c => c.classId !== classId));
        Swal.fire('Đã xoá!', 'Lớp học đã được xoá.', 'success');
      } catch (error) {
        Swal.fire('Lỗi!', 'Xoá lớp học thất bại.', 'error');
      }
    }
  }

  const fetchClasses = async () => {
        try {
          const response = await classService.getAllClasses();
          setClasses(response.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };

  const fetchStudents = async () => {
    try { 
      const response = await studentService.getAllStudents();
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      Swal.fire('Lỗi!', 'Không thể tải danh sách học sinh.', 'error');
    }
  };
  
  

useEffect(() => {
      fetchClasses();
      fetchStudents();
    }, []);

  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Lớp Học</h1>
        <button onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Thêm Lớp Học
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm lớp học..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất Cả Khối</option>
          <option value="10">Khối 10</option>
          <option value="11">Khối 11</option>
          <option value="12">Khối 12</option>
        </select>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => {
          const studentCount = student.filter(s => s.classId === classItem.classId).length;
          
          return (
            <div key={classItem.classId} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{classItem.className}</h3>
                  <p className="text-sm text-gray-500">GVCN: {classItem.formTeacher}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick = {() => {
                    setModalMode('edit');
                    setSelectedClass(classItem);
                    setIsModalOpen(true);}}
                   className="text-blue-600 hover:text-blue-900">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteClass(classItem.classId)}
                   className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{studentCount} học sinh</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-2" />
                  
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Phòng: {classItem.room}</span>
                  <span>Ca: {classItem.schedule}</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                Xem Chi Tiết
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">6</span> trong số{' '}
          <span className="font-medium">12</span> lớp học
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Trước</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Sau</button>
        </div>
      </div>
      <ClassForm 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
          setModalMode('add');
        }}
        onSubmit={modalMode === 'add' ? handleAddClass : handleEditClass}
        initialData={selectedClass}
        mode={modalMode}
      />
    </div>
    
  );
};

export default ClassList;