import React from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Calendar, Shield, Vote } from 'lucide-react';

const UserProfile = ({ user }) => {
  if (!user) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const profileFields = [
    {
      label: 'Full Name',
      value: user.name,
      icon: User,
    },
    {
      label: 'Email',
      value: user.email || 'Not provided',
      icon: Mail,
    },
    {
      label: 'Mobile',
      value: user.mobile || 'Not provided',
      icon: Phone,
    },
    {
      label: 'Address',
      value: user.address,
      icon: MapPin,
    },
    {
      label: 'Aadhar Card Number',
      value: user.aadharCardNumber,
      icon: CreditCard,
    },
    {
      label: 'Age',
      value: user.age,
      icon: Calendar,
    },
    {
      label: 'Role',
      value: user.role,
      icon: user.role === 'admin' ? Shield : Vote,
      capitalize: true,
    },
    {
      label: 'Voting Status',
      value: user.isVoted ? 'Voted' : 'Not Voted',
      icon: Vote,
      status: user.isVoted ? 'success' : 'warning',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
        <p className="text-gray-600">Your personal details and voting status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileFields.map((field, index) => {
          const Icon = field.icon;
          const statusColor = field.status === 'success' 
            ? 'text-success-600 bg-success-100' 
            : field.status === 'warning' 
            ? 'text-warning-600 bg-warning-100' 
            : 'text-gray-600 bg-gray-100';

          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-lg ${statusColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="ml-3 text-sm font-medium text-gray-900">
                  {field.label}
                </h3>
              </div>
              <p className={`text-sm ${
                field.capitalize ? 'capitalize' : ''
              } ${
                field.status === 'success' 
                  ? 'text-success-600 font-medium' 
                  : field.status === 'warning' 
                  ? 'text-warning-600 font-medium' 
                  : 'text-gray-600'
              }`}>
                {field.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Voting Status Card */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Vote className="h-8 w-8 text-primary-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Voting Status</h3>
            <p className="text-sm text-gray-600">
              {user.isVoted 
                ? 'You have successfully cast your vote. Thank you for participating in the democratic process.'
                : 'You have not voted yet. Please visit the Voting tab to cast your vote.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
