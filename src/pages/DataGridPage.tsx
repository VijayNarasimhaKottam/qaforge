import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Table as TableIcon, Search, Download, Columns, Check, Edit2, Save, X, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, Loader2
} from 'lucide-react';
import { MOCK_EMPLOYEES, Employee } from '../data/mockData';

export const DataGridPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sorting State
  const [sortField, setSortField] = useState<keyof Employee>('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Bulk Select State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Inline Row Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Employee>>({});

  // Column Visibility State
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    email: true,
    role: true,
    department: true,
    salary: true,
    status: true,
    joinDate: true,
  });

  // Slow Network Simulator Tab State
  const [activeTab, setActiveTab] = useState<'standard' | 'slow'>('standard');
  const [slowLoading, setSlowLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'slow') {
      setSlowLoading(true);
      const timer = setTimeout(() => {
        setSlowLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Filtering & Sorting memo
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
      return matchesSearch && matchesDept;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [employees, search, deptFilter, sortField, sortAsc]);

  // Paginated records
  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  // Handle Sort
  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Bulk Selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedEmployees.map((e) => e.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleBulkDelete = () => {
    setEmployees((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  };

  // Row Edit Handlers
  const startEditRow = (employee: Employee) => {
    setEditingId(employee.id);
    setEditFormData({ ...employee });
  };

  const saveEditRow = () => {
    if (!editingId) return;
    setEmployees((prev) =>
      prev.map((e) => (e.id === editingId ? ({ ...e, ...editFormData } as Employee) : e))
    );
    setEditingId(null);
  };

  // CSV Export Download
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Department', 'Salary', 'Status', 'Join Date'];
    const rows = filteredEmployees.map((e) => [
      e.id,
      `"${e.name}"`,
      e.email,
      `"${e.role}"`,
      e.department,
      e.salary,
      e.status,
      e.joinDate,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `qaforge_employees_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-7xl">
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <TableIcon className="w-3.5 h-3.5" />
            <span>Module 2 — Server Paginated Grid & Controls</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Data Grid & Employee Directory</h1>
          <p className="text-xs text-slate-400">
            Practice table assertions, column sorting, pagination, inline editing, bulk selection, CSV exports, and skeleton loaders.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3 font-mono text-xs">
          <button
            data-testid="tab-standard-grid"
            onClick={() => setActiveTab('standard')}
            className={`px-4 py-2 rounded-xl transition-colors font-bold ${
              activeTab === 'standard'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Standard Table (500 Records)
          </button>
          <button
            data-testid="tab-slow-network"
            onClick={() => setActiveTab('slow')}
            className={`px-4 py-2 rounded-xl transition-colors font-bold flex items-center gap-2 ${
              activeTab === 'slow'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Loader2 className={`w-3.5 h-3.5 ${slowLoading ? 'animate-spin' : ''}`} />
            <span>Slow Network Table (2.5s Delay)</span>
          </button>
        </div>

        {/* Grid Toolbar Controls */}
        <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          
          {/* Search & Dept Filter */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                data-testid="input-grid-search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search employee name, email..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono"
              />
            </div>

            <select
              data-testid="select-dept-filter"
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 font-mono focus:border-teal-500 focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="QA Testing">QA Testing</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="DevOps">DevOps</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Column Hide/Show Menu */}
            <div className="relative">
              <button
                data-testid="btn-columns-menu"
                onClick={() => setColumnsMenuOpen(!columnsMenuOpen)}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Columns className="w-4 h-4 text-teal-400" />
                <span>Columns</span>
              </button>

              {columnsMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-slate-700 rounded-2xl p-2 z-30 shadow-2xl font-mono text-xs">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800 mb-1">
                    Toggle Column Visibility
                  </div>
                  {Object.keys(visibleColumns).map((col) => (
                    <label
                      key={col}
                      className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800 cursor-pointer text-slate-300 capitalize"
                    >
                      <span>{col}</span>
                      <input
                        type="checkbox"
                        checked={visibleColumns[col as keyof typeof visibleColumns]}
                        onChange={(e) =>
                          setVisibleColumns({ ...visibleColumns, [col]: e.target.checked })
                        }
                        className="rounded accent-teal-500"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* CSV Export Button */}
            <button
              data-testid="btn-export-csv"
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs rounded-xl transition-colors shadow-md shadow-teal-500/20 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* Floating Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div
            data-testid="floating-action-bar"
            className="mb-4 bg-teal-950/90 border border-teal-500/50 p-3 rounded-2xl flex items-center justify-between text-teal-200 text-xs font-mono shadow-xl animate-fade-in"
          >
            <span className="font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              {selectedIds.length} employee row(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                data-testid="btn-bulk-delete"
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table data-testid="employee-table" className="w-full text-left font-mono text-xs">
              
              {/* Header */}
              <thead className="bg-[#111827] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      data-testid="select-all-checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === paginatedEmployees.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded accent-teal-500 cursor-pointer"
                    />
                  </th>
                  {visibleColumns.id && (
                    <th className="p-3 cursor-pointer hover:text-teal-300" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3 opacity-50" /></div>
                    </th>
                  )}
                  {visibleColumns.name && (
                    <th className="p-3 cursor-pointer hover:text-teal-300" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-1">Employee Name <ArrowUpDown className="w-3 h-3 opacity-50" /></div>
                    </th>
                  )}
                  {visibleColumns.email && <th className="p-3">Email</th>}
                  {visibleColumns.role && <th className="p-3">Role</th>}
                  {visibleColumns.department && <th className="p-3">Department</th>}
                  {visibleColumns.salary && (
                    <th className="p-3 cursor-pointer hover:text-teal-300" onClick={() => handleSort('salary')}>
                      <div className="flex items-center gap-1">Salary <ArrowUpDown className="w-3 h-3 opacity-50" /></div>
                    </th>
                  )}
                  {visibleColumns.status && <th className="p-3">Status</th>}
                  {visibleColumns.joinDate && <th className="p-3">Join Date</th>}
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {slowLoading ? (
                  // Skeleton loader rows
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`skel-${i}`} data-testid="skeleton-loader" className="animate-pulse bg-slate-900/40">
                      <td colSpan={10} className="p-4 text-center text-slate-600 font-mono text-xs">
                        Loading simulated server data (2.5s network delay)...
                      </td>
                    </tr>
                  ))
                ) : paginatedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-500 font-mono">
                      No employee records found matching filter.
                    </td>
                  </tr>
                ) : (
                  paginatedEmployees.map((emp) => {
                    const isEditing = editingId === emp.id;
                    const isSelected = selectedIds.includes(emp.id);

                    return (
                      <tr
                        key={emp.id}
                        data-testid={`employee-row-${emp.id}`}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isSelected ? 'bg-teal-500/10' : ''
                        }`}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            data-testid={`checkbox-row-${emp.id}`}
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(emp.id, e.target.checked)}
                            className="rounded accent-teal-500 cursor-pointer"
                          />
                        </td>

                        {visibleColumns.id && <td className="p-3 text-slate-400 font-bold">{emp.id}</td>}

                        {visibleColumns.name && (
                          <td className="p-3 font-semibold text-slate-100">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editFormData.name || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                className="bg-slate-900 border border-teal-500 px-2 py-1 rounded text-xs text-slate-100"
                              />
                            ) : (
                              emp.name
                            )}
                          </td>
                        )}

                        {visibleColumns.email && <td className="p-3 text-slate-300">{emp.email}</td>}

                        {visibleColumns.role && (
                          <td className="p-3 text-slate-300">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editFormData.role || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                                className="bg-slate-900 border border-teal-500 px-2 py-1 rounded text-xs text-slate-100"
                              />
                            ) : (
                              emp.role
                            )}
                          </td>
                        )}

                        {visibleColumns.department && (
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-teal-300 border border-slate-700">
                              {emp.department}
                            </span>
                          </td>
                        )}

                        {visibleColumns.salary && (
                          <td className="p-3 text-emerald-400 font-bold">${emp.salary.toLocaleString()}</td>
                        )}

                        {visibleColumns.status && (
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                emp.status === 'Active'
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : emp.status === 'On Leave'
                                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                  : 'bg-red-500/15 text-red-300 border border-red-500/30'
                              }`}
                            >
                              {emp.status}
                            </span>
                          </td>
                        )}

                        {visibleColumns.joinDate && <td className="p-3 text-slate-400">{emp.joinDate}</td>}

                        <td className="p-3 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                data-testid={`btn-row-save-${emp.id}`}
                                onClick={saveEditRow}
                                className="p-1 text-emerald-400 hover:bg-slate-800 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                data-testid={`btn-row-cancel-${emp.id}`}
                                onClick={() => setEditingId(null)}
                                className="p-1 text-slate-400 hover:bg-slate-800 rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              data-testid={`btn-row-edit-${emp.id}`}
                              onClick={() => startEditRow(emp)}
                              className="p-1 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination Controls */}
          <div className="p-4 bg-[#111827] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>Showing {filteredEmployees.length} records</span>
            </div>

            <div className="flex items-center gap-3">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  data-testid="pagination-prev"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded disabled:opacity-40 disabled:hover:bg-slate-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  data-testid="pagination-next"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded disabled:opacity-40 disabled:hover:bg-slate-900"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
