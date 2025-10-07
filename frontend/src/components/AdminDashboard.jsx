import React, { useState } from 'react';
import { candidateAPI, settingsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Users, TrendingUp } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const AdminDashboard = ({ candidates, onCandidatesChange, onViewResults }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load current results visibility on mount
  React.useEffect(() => {
    (async () => {
      try {
        const { visible } = await settingsAPI.getResultsVisibility();
        setResultsVisible(Boolean(visible));
      } catch {
        // ignore
      }
    })();
  }, []);

  const toggleResultsVisibility = async () => {
    try {
      const next = !resultsVisible;
      const { visible } = await settingsAPI.setResultsVisibility(next);
      setResultsVisible(Boolean(visible));
      toast.success(`Results ${visible ? 'visible to voters' : 'hidden from voters'}`);
    } catch (e) {
      toast.error('Failed to update results visibility');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCandidate) {
        await candidateAPI.updateCandidate(editingCandidate._id, formData);
        toast.success('Candidate updated successfully!');
        setEditingCandidate(null);
      } else {
        await candidateAPI.addCandidate(formData);
        toast.success('Candidate added successfully!');
      }
      
      setFormData({ name: '', party: '', age: '' });
      setShowAddForm(false);
      onCandidatesChange();
    } catch (error) {
      const message = error.response?.data?.error || 'Operation failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
    setFormData({
      name: candidate.name,
      party: candidate.party,
      age: candidate.age,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (candidateId) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    setLoading(true);
    try {
      await candidateAPI.deleteCandidate(candidateId);
      toast.success('Candidate deleted successfully!');
      onCandidatesChange();
    } catch (error) {
      const message = error.response?.data?.error || 'Delete failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', party: '', age: '' });
    setEditingCandidate(null);
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Results visible to voters</span>
            <button onClick={toggleResultsVisibility} className={`qa-btn ${resultsVisible ? 'bg-success-50 border-success-200' : 'bg-gray-50'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${resultsVisible ? 'bg-success-500' : 'bg-gray-400'}`}></span>
              <span className="text-sm">{resultsVisible ? 'On' : 'Off'}</span>
            </button>
          </div>
          <button onClick={onViewResults} className="btn-secondary">Open Results</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary-50 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">Total Candidates</p>
              <p className="text-2xl font-bold text-primary-900">{candidates.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-success-50 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-success-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-success-600">Total Votes</p>
              <p className="text-2xl font-bold text-success-900">
                {candidates.reduce((sum, candidate) => sum + (candidate.voteCount || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-warning-50 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-warning-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-warning-600">Parties</p>
              <p className="text-2xl font-bold text-warning-900">
                {new Set(candidates.map(c => c.party)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidate Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter candidate name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Party
              </label>
              <input
                type="text"
                name="party"
                value={formData.party}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter party name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter age"
                required
              />
            </div>
            <div className="md:col-span-3 flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-success flex items-center"
              >
                {loading ? (
                  <LoadingSpinner size="small" text="" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Candidates List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Candidates</h3>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </button>
          )}
        </div>

        {candidates.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Add your first candidate to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div key={candidate._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(candidate)}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(candidate._id)}
                      className="p-2 text-gray-400 hover:text-danger-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{candidate.name}</h4>
                <p className="text-sm text-gray-600 mb-2">Party: {candidate.party}</p>
                <p className="text-sm text-gray-600 mb-4">Age: {candidate.age}</p>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Votes</span>
                    <span className="text-lg font-bold text-primary-600">{candidate.voteCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
