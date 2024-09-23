import { User } from "../types/user";

interface UserDetailsProps {
  user: User;
  onBack: () => void;
}

export default function UserDetails({ user, onBack }: UserDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-indigo-800 p-6 bg-indigo-50">
          User Details
        </h1>
        <div className="p-6">
          <p className="text-xl font-semibold text-gray-800">
            First Name: {user.firstName}
          </p>
          <p className="text-xl font-semibold text-gray-800">
            Last Name: {user.lastName}
          </p>
          <p className="text-xl font-semibold text-gray-800">
            Email: {user.email}
          </p>
          <p className="text-xl font-semibold text-gray-800">Age: {user.age}</p>
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={onBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
