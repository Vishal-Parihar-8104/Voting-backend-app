import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { candidateAPI, settingsAPI } from '../services/api';
import AdminDashboard from '../components/AdminDashboard';
import VoterDashboard from '../components/VoterDashboard';
import UserProfile from '../components/UserProfile';
import VoteResults from '../components/VoteResults';
import ChangePasswordModal from '../components/ChangePasswordModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  User, 
  Key, 
  BarChart3, 
  Shield, 
  Vote as VoteIcon,
  Users,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin, isVoter } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [voteCount, setVoteCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultsVisibleToVoters, setResultsVisibleToVoters] = useState(false);

  useEffect(() => {
    loadData();
    // Auto-refresh data every 30s
    const id = setInterval(loadData, 30000);
    return () => clearInterval(id);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [candidatesData, voteCountData, visibilityData] = await Promise.all([
        candidateAPI.getCandidates(),
        candidateAPI.getVoteCount(),
        settingsAPI.getResultsVisibility()
      ]);
      setCandidates((candidatesData && candidatesData.data) || candidatesData || []);
      // Normalize results to { party, count }
      const normalized = (voteCountData && voteCountData.data) || voteCountData || [];
      setVoteCount(normalized.map((c) => ({ party: c.party, count: c.voteCount ?? c.count ?? 0 })));
      setResultsVisibleToVoters(Boolean(visibilityData?.visible));
    } catch (error) {
      console.error('Error loading data:', error);
      setCandidates([]);
      setVoteCount([]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    ...(isAdmin ? [
      { id: 'admin', label: 'Admin Panel', icon: Shield },
    ] : []),
    ...(isVoter ? [
      { id: 'voting', label: 'Voting', icon: VoteIcon },
    ] : []),
    // Results tab visible to admin always, and to voters only if enabled
    ...((isAdmin || resultsVisibleToVoters) ? [{ id: 'results', label: 'Results', icon: BarChart3 }] : []),
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile user={user} />;
      case 'admin':
        return <AdminDashboard candidates={candidates} onCandidatesChange={loadData} onViewResults={() => setShowResults(true)} />;
      case 'voting':
        return <VoterDashboard candidates={candidates} onVote={loadData} />;
      case 'results':
        return <VoteResults voteCount={voteCount} />;
      default:
        return <UserProfile user={user} />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 gradient-strip" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              {isAdmin ? (
                <Shield className="h-8 w-8 text-primary-600" />
              ) : (
                <User className="h-8 w-8 text-primary-600" />
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
              <p className="text-gray-600 capitalize">
                {user?.role} • {user?.isVoted ? 'Voted' : 'Not Voted'}
              </p>
              <div className="mt-2 space-x-2">
                <span className="pill-badge pill-primary">Secure</span>
                <span className="pill-badge pill-success">Live</span>
                <span className="pill-badge pill-warning">Beta</span>
              </div>
            </div>
          </div>
          
          <div className="quick-actions">
            <button onClick={() => setActiveTab('voting')} className="qa-btn">
              <VoteIcon className="h-4 w-4 text-primary-600" /> Vote Now
            </button>
            <button onClick={() => setShowResults(true)} className="qa-btn">
              <BarChart3 className="h-4 w-4 text-success-600" /> Live Results
            </button>
            <button onClick={() => setShowChangePassword(true)} className="qa-btn">
              <Key className="h-4 w-4 text-warning-600" /> Password
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="tabs-container">
          <nav className="-mb-px flex gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg">
        {renderTabContent()}
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
      
      <VoteResults
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        voteCount={voteCount}
      />
    </div>
  );
};

export default Dashboard;
