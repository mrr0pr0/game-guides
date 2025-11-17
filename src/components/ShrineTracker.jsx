import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const ShrineTracker = () => {
  const [shrines, setShrines] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterRegion, setFilterRegion] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadShrines()
  }, [])

  const loadShrines = async () => {
    try {
      const { data, error } = await supabase
        .from('shrines')
        .select('*')
        .order('region', { ascending: true })
        .order('shrine_name', { ascending: true })
      
      if (error) throw error
      setShrines(data || [])
    } catch (error) {
      console.error('Error loading shrines:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('shrines')
        .update({ done: !currentStatus })
        .eq('id', id)
      
      if (error) throw error
      
      setShrines(prev => 
        prev.map(shrine => 
          shrine.id === id ? { ...shrine, done: !currentStatus } : shrine
        )
      )
    } catch (error) {
      console.error('Error updating shrine:', error)
    }
  }

  const regions = [...new Set(shrines.map(s => s.region))].sort()
  
  const filteredShrines = shrines.filter(shrine => {
    const matchesRegion = filterRegion === 'all' || shrine.region === filterRegion
    const matchesSearch = shrine.shrine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          shrine.challenge.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRegion && matchesSearch
  })

  const completedCount = shrines.filter(s => s.done).length
  const totalCount = shrines.length
  const percentage = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(1) : 0

  const regionStats = regions.map(region => {
    const regionShrines = shrines.filter(s => s.region === region)
    const completed = regionShrines.filter(s => s.done).length
    return {
      region,
      completed,
      total: regionShrines.length,
      percentage: ((completed / regionShrines.length) * 100).toFixed(0)
    }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="my-8">
      {/* Progress Stats */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg mb-6">
        <h3 className="text-2xl font-black mb-2">Your Progress</h3>
        <div className="text-4xl font-black mb-4">
          {completedCount} / {totalCount} <span className="text-xl font-medium">({percentage}%)</span>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Region Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {regionStats.map(stat => (
          <div 
            key={stat.region}
            className={`bg-white border-2 rounded-lg p-3 text-center transition-all cursor-pointer hover:shadow-md ${
              filterRegion === stat.region 
                ? 'border-red-600 shadow-md' 
                : 'border-neutral-200 hover:border-red-400'
            }`}
            onClick={() => setFilterRegion(filterRegion === stat.region ? 'all' : stat.region)}
          >
            <div className="text-xs font-bold text-neutral-600 mb-1 truncate">{stat.region}</div>
            <div className="text-lg font-black text-neutral-900">{stat.completed}/{stat.total}</div>
            <div className="text-xs text-neutral-500">{stat.percentage}%</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search shrines by name or challenge..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-red-600 focus:outline-none font-medium"
          />
        </div>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-red-600 focus:outline-none font-bold bg-white cursor-pointer"
        >
          <option value="all">All Regions ({totalCount})</option>
          {regions.map(region => (
            <option key={region} value={region}>
              {region} ({shrines.filter(s => s.region === region).length})
            </option>
          ))}
        </select>
      </div>

      {/* Shrines Table */}
      <div className="overflow-x-auto bg-white border-2 border-neutral-200 rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-neutral-100 border-b-2 border-neutral-200">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-black text-neutral-700 uppercase tracking-wider w-20">
                Done
              </th>
              <th className="px-4 py-3 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                Shrine Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-black text-neutral-700 uppercase tracking-wider">
                Region
              </th>
              <th className="px-4 py-3 text-left text-xs font-black text-neutral-700 uppercase tracking-wider hidden md:table-cell">
                Challenge
              </th>
              <th className="px-4 py-3 text-left text-xs font-black text-neutral-700 uppercase tracking-wider hidden lg:table-cell">
                Rewards
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredShrines.map(shrine => (
              <tr 
                key={shrine.id}
                className={`hover:bg-neutral-50 transition-colors ${shrine.done ? 'bg-green-50' : ''}`}
              >
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={shrine.done}
                      onChange={() => handleToggle(shrine.id, shrine.done)}
                      className="w-5 h-5 text-red-600 border-2 border-neutral-300 rounded focus:ring-2 focus:ring-red-600 cursor-pointer"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${shrine.done ? 'text-neutral-500 line-through' : 'text-neutral-900'}`}>
                    {shrine.shrine_name}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded whitespace-nowrap">
                    {shrine.region}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-700 hidden md:table-cell">
                  {shrine.challenge}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600 hidden lg:table-cell">
                  {shrine.rewards}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredShrines.length === 0 && (
        <div className="text-center py-12 text-neutral-500 font-medium">
          No shrines found matching your filters.
        </div>
      )}

      {/* Mobile hint */}
      <div className="mt-4 text-xs text-neutral-500 text-center md:hidden">
        💡 Rotate your device or view on desktop for more details
      </div>
    </div>
  )
}

export default ShrineTracker