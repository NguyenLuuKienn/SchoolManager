import React, { useState, useEffect } from 'react';
import { Search, Settings, Edit2, Trash2, Shield } from 'lucide-react';
import Swal from 'sweetalert2';
import RoleForm from './RoleForm';
import roleService from '../../services/RoleService';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await roleService.getAllRoles();
      setRoles(response.data);
    } catch (err) {
      setError('Không thể tải danh sách vai trò');
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async (roleData) => {
    try {
      await roleService.createRole(roleData);
      setIsModalOpen(false);
      await Swal.fire('Thành công!', 'Thêm vai trò mới thành công.', 'success');
      fetchRoles();
    } catch (error) {
      console.error('Error adding role:', error);
      Swal.fire('Lỗi!', 'Không thể thêm vai trò.', 'error');
    }
  };

  const handleEditRole = async (roleData) => {
    try {
      await roleService.updateRole(roleData.roleId, roleData);
      setIsModalOpen(false);
      setSelectedRole(null);
      setModalMode('add');
      await Swal.fire('Thành công!', 'Cập nhật vai trò thành công.', 'success');
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      Swal.fire('Lỗi!', 'Không thể cập nhật vai trò.', 'error');
    }
  };

  const handleDeleteRole = async (roleId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xoá vai trò này không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    });

    if (result.isConfirmed) {
      try {
        await roleService.deleteRole(roleId);
        setRoles(prev => prev.filter(r => r.roleId !== roleId));
        await Swal.fire('Thành công!', 'Xoá vai trò thành công.', 'success');
      } catch (error) {
        console.error('Error deleting role:', error);
        Swal.fire('Lỗi!', 'Không thể xoá vai trò.', 'error');
      }
    }
  };

  // Filter roles based on search term
  const filteredRoles = roles.filter(role => 
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {loading && <div className="text-center py-4">Đang tải...</div>}
      {error && <div className="text-center text-red-600 py-4">{error}</div>}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Vai Trò</h1>
        <button 
          onClick={() => {
            setSelectedRole(null);
            setModalMode('add');
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
        >
          <Settings className="w-5 h-5 mr-2" />
          Thêm Vai Trò
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm vai trò..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRoles.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy vai trò nào
                </td>
              </tr>
            ) : (
              filteredRoles.map((role) => (
                <tr key={role.roleId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {role.roleName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {role.description || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedRole(role);
                          setModalMode('edit');
                          setIsModalOpen(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteRole(role.roleId)}
                        title="Xóa"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{filteredRoles.length}</span> vai trò
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
            Trước
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
            Sau
          </button>
        </div>
      </div>

      {/* Role Form Modal */}
      <RoleForm 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRole(null);
        }}
        onSubmit={modalMode === 'add' ? handleAddRole : handleEditRole}
        initialData={selectedRole}
        mode={modalMode}
      />
    </div>
  );
};

export default RoleList;

