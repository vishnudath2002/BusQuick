import { MoreVertical, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import {  userBlockToggle, ownerLists } from '../../../api/adminApi';

export function OwnerTable() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleData = async () => {
    const data = await ownerLists();
    setUsers(data.owners);
  };

  const toggleBlockStatus = async (userId: string) => {
    try {
      const updatedUser = await userBlockToggle(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: updatedUser.isBlocked } : user
        )
      );
      setSelectedUserId(null); // Close menu after action
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Join Date
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-1" />
                    {user.phone}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isBlocked
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {user.isBlocked ? 'Inactive' : 'Active'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* {new Date(user.joinDate).toLocaleDateString()} */}
                12/03/2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() =>
                    setSelectedUserId(selectedUserId === user._id ? null : user._id)
                  }
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                {selectedUserId === user._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => toggleBlockStatus(user._id)}
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {users.length} of {users.length} results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded text-sm" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
