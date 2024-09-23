import { User } from '../types/user';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
        </div>
      ))}
    </div>
  );
}
