import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { candidateAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Vote, CheckCircle, AlertCircle, Users, TrendingUp } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const VoterDashboard = ({ candidates, onVote }) => {
  const { user } = useAuth();
  const [voting, setVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleVote = async (candidateId) => {
    if (!window.confirm('Are you sure you want to vote for this candidate? This action cannot be undone.')) {
      return;
    }

    setVoting(true);
    try {
      await candidateAPI.voteForCandidate(candidateId);
      // Optimistically reflect local user state if needed
      toast.success('Vote cast successfully! Thank you for participating.');
      onVote(); // Refresh data
    } catch (error) {
      const message = error.response?.data?.message || 'Voting failed';
      toast.error(message);
    } finally {
      setVoting(false);
    }
  };

  const getVoteStatus = () => {
    if (user?.isVoted) {
      return {
        status: 'voted',
        message: 'You have already cast your vote',
        icon: CheckCircle,
        color: 'text-success-600 bg-success-100',
      };
    }
    return {
      status: 'not-voted',
      message: 'Select a candidate to cast your vote',
      icon: AlertCircle,
      color: 'text-warning-600 bg-warning-100',
    };
  };

  const voteStatus = getVoteStatus();
  const StatusIcon = voteStatus.icon;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cast Your Vote</h2>
        <p className="text-gray-600">Choose your preferred candidate and cast your vote</p>
      </div>

      {/* Voting Status */}
      <div className={`rounded-lg p-4 mb-8 ${voteStatus.color}`}>
        <div className="flex items-center">
          <StatusIcon className="h-5 w-5 mr-3" />
          <p className="font-medium">{voteStatus.message}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary-50 rounded-lg p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">Total Candidates</p>
              <p className="text-2xl font-bold text-primary-900">{candidates.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-success-50 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-success-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-success-600">Total Votes Cast</p>
              <p className="text-2xl font-bold text-success-900">
                {candidates.reduce((sum, candidate) => sum + candidate.voteCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-warning-50 rounded-lg p-6">
          <div className="flex items-center">
            <Vote className="h-8 w-8 text-warning-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-warning-600">Your Status</p>
              <p className="text-lg font-bold text-warning-900 capitalize">
                {user?.isVoted ? 'Voted' : 'Not Voted'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates available</h3>
          <p className="text-gray-600">Candidates will appear here when they are added by the admin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className={`bg-white border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
                selectedCandidate === candidate._id
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Party: {candidate.party}</p>
                <p className="text-sm text-gray-600 mb-4">Age: {candidate.age}</p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Current Votes</span>
                    <span className="text-lg font-bold text-primary-600">{candidate.voteCount}</span>
                  </div>
                </div>

                {!user?.isVoted ? (
                  <button
                    onClick={() => handleVote(candidate._id)}
                    disabled={voting}
                    className="w-full gradient-button flex items-center justify-center"
                  >
                    {voting ? (
                      <LoadingSpinner size="small" text="" />
                    ) : (
                      <>
                        <Vote className="h-4 w-4 mr-2" />
                        Vote for {candidate.name}
                      </>
                    )}
                  </button>
                ) : (
                  <div className="w-full bg-success-100 text-success-800 py-2 px-4 rounded-lg text-center font-medium">
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    You have voted
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voting Instructions */}
      {!user?.isVoted && candidates.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Voting Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You can only vote once</li>
            <li>• Your vote is confidential and secure</li>
            <li>• Once you cast your vote, you cannot change it</li>
            <li>• Make sure you have reviewed all candidates before voting</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;
