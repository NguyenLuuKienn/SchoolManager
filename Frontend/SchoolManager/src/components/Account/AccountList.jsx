import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, Trash2, Mail, User, Shield } from 'lucide-react';
import Swal from 'sweetalert2';
import AccountForm from './AccountForm';
import accountService from '../../services/AccountService';
import roleService from '../../services/RoleService';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchAccounts();
    fetchRoles();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await accountService.getAllAccounts();
      setAccounts(response.data);
    } catch (err) {
      setError('Không thể tải danh sách tài khoản');
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await roleService.getAllRoles();
      setRoles(response.data);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleAddAccount = async (accountData) => {
    try {
      await accountService.createAccount(accountData);
      setIsModalOpen(false);
      await Swal.fire('Thành công!', 'Thêm tài khoản mới thành công.', 'success');
      fetchAccounts();
    } catch (error) {
      console.error('Error adding account:', error);
      Swal.fire('Lỗi!', 'Không thể thêm tài khoản.', 'error');
    }
  };

  const handleEditAccount = async (accountData) => {
    try {
      await accountService.updateAccount(accountData.userId, accountData);
      setIsModalOpen(false);
      setSelectedAccount(null);
      setModalMode('add');
      await Swal.fire('Thành công!', 'Cập nhật tài khoản thành công.', 'success');
      fetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
      Swal.fire('Lỗi!', 'Không thể cập nhật tài khoản.', 'error');
    }
  };

  const handleDeleteAccount = async (userId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xoá tài khoản này không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    });

    if (result.isConfirmed) {
      try {
        await accountService.deleteAccount(userId);
        setAccounts(prev => prev.filter(a => a.userId !== userId));
        await Swal.fire('Thành công!', 'Xoá tài khoản thành công.', 'success');
      } catch (error) {
        console.error('Error deleting account:', error);
        Swal.fire('Lỗi!', 'Không thể xoá tài khoản.', 'error');
      }
    }
  };

  // Filter accounts based on search term and role
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter ? account.roleId === roleFilter : true;
    
    return matchesSearch && matchesRole;
  });

  // Get role name by ID
  const getRoleName = (roleId) => {
    const role = roles.find(r => r.roleId === roleId);
    return role ? role.roleName : "—";
  };

  return (
    <div className="p-6">
      {loading && <div className="text-center py-4">Đang tải...</div>}
      {error && <div className="text-center text-red-600 py-4">{error}</div>}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Tài Khoản</h1>
        <button 
          onClick={() => {
            setSelectedAccount(null);
            setModalMode('add');
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Thêm Tài Khoản
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        
        <select 
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Tất cả vai trò</option>
          {roles.map(role => (
            <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
          ))}
        </select>
      </div>

      {/* Accounts Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy tài khoản nào
                </td>
              </tr>
            ) : (
              filteredAccounts.map((account) => (
                <tr key={account.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {account.userName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-500">
                        {account.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getRoleName(account.roleId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedAccount(account);
                          setModalMode('edit');
                          setIsModalOpen(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteAccount(account.userId)}
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
          Hiển thị <span className="font-medium">{filteredAccounts.length}</span> tài khoản
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

      {/* Account Form Modal */}
      <AccountForm 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAccount(null);
        }}
        onSubmit={modalMode === 'add' ? handleAddAccount : handleEditAccount}
        initialData={selectedAccount}
        mode={modalMode}
        roles={roles}
      />
    </div>
  );
};

export default AccountList;