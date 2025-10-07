import React from 'react';
import { BarChart3, TrendingUp, Users, Award } from 'lucide-react';

const VoteResults = ({ isOpen, onClose, voteCount }) => {
  if (!isOpen) return null;

  // Accept either API result from aggregate [{ name, party, voteCount }] or transformed [{ party, count }]
  const normalized = (voteCount || []).map((item) => ({
    party: item.party,
    count: typeof item.count === 'number' ? item.count : (typeof item.voteCount === 'number' ? item.voteCount : 0)
  })).sort((a, b) => b.count - a.count);

  const totalVotes = normalized.reduce((sum, party) => sum + party.count, 0);
  const maxVotes = Math.max(...normalized.map(party => party.count), 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Voting Results
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-primary-600">Total Votes</p>
                  <p className="text-2xl font-bold text-primary-900">{totalVotes}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-success-50 rounded-lg p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-success-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-success-600">Parties</p>
                  <p className="text-2xl font-bold text-success-900">{normalized.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-warning-50 rounded-lg p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-warning-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-warning-600">Leading Party</p>
                  <p className="text-lg font-bold text-warning-900">
                    {normalized.length > 0 ? normalized[0].party : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Results by Party</h4>
            
            {normalized.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No votes yet</h3>
                <p className="text-gray-600">Voting results will appear here once votes are cast</p>
              </div>
            ) : (
              normalized.map((party, index) => {
                const percentage = totalVotes > 0 ? (party.count / totalVotes) * 100 : 0;
                const isLeading = index === 0 && party.count > 0;
                
                return (
                  <div key={index} className={`rounded-lg p-6 border-2 ${
                    isLeading 
                      ? 'border-success-200 bg-success-50' 
                      : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isLeading ? 'bg-success-100' : 'bg-primary-100'
                        }`}>
                          <span className={`text-lg font-bold ${
                            isLeading ? 'text-success-600' : 'text-primary-600'
                          }`}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg font-semibold text-gray-900">{party.party}</h5>
                          <p className="text-sm text-gray-600">
                            {party.count} vote{party.count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{party.count}</p>
                        <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isLeading ? 'bg-success-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Close Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteResults;
