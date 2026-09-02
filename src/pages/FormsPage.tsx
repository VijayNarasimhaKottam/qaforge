import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  FormInput, CheckCircle2, AlertCircle, Calendar as CalendarIcon, Upload, X, PenTool, Check, RefreshCw
} from 'lucide-react';

const SKILLS_LIST = ['Playwright', 'Selenium', 'Cypress', 'TypeScript', 'Python', 'API Testing', 'Docker', 'CI/CD', 'Appium', 'K6 Load Testing'];
const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  { code: '+49', country: 'DE' },
  { code: '+61', country: 'AU' },
  { code: '+81', country: 'JP' },
];

export const FormsPage: React.FC = () => {
  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<string>('');
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Playwright', 'TypeScript']);
  const [skillSearch, setSkillSearch] = useState('');
  const [skillDropdownOpen, setSkillDropdownOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Custom DatePicker State
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(1998, 5, 15)); // Default June 1998

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  // Canvas Signature Pad
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Password strength calculation
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-teal-400' };
  };

  const pwdStrength = calculatePasswordStrength(password);

  // DatePicker Helpers
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handleSelectDate = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = selected.toISOString().split('T')[0];
    setDob(dateStr);
    setCalendarOpen(false);
  };

  // Canvas signature logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
  };

  // Drag & drop file upload
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email address is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!dob) newErrors.dob = 'Date of birth is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedData({
        username,
        email,
        password: '•'.repeat(password.length),
        phone: `${countryCode} ${phone}`,
        dob,
        bio,
        skills: selectedSkills,
        fileName: uploadedFile ? uploadedFile.name : 'No file uploaded',
        hasSignature,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-5xl">
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <FormInput className="w-3.5 h-3.5" />
            <span>Module 1 — Registration & Validation Controls</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Form Fields & Client-side Validation</h1>
          <p className="text-xs text-slate-400">
            Practice filling inputs, strength meters, custom datepickers, drag-and-drop file uploads, canvas drawing, and asserting client-side errors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            
            {/* Username & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Username <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  data-testid="input-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. qa_master"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
                {errors.username && (
                  <p data-testid="error-username" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  data-testid="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tester@qaforge.com"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
                {errors.email && (
                  <p data-testid="error-email" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password + Strength Meter */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                data-testid="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all font-mono"
              />
              {/* Strength Meter Bar */}
              <div className="mt-2 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-slate-800'}`} />
                  <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-slate-800'}`} />
                  <div className={`h-full flex-1 transition-all ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-slate-800'}`} />
                </div>
                <span data-testid="password-strength-indicator" className="text-[11px] font-mono font-bold text-slate-400">
                  Strength: <span className="text-slate-200">{pwdStrength.label}</span>
                </span>
              </div>
              {errors.password && (
                <p data-testid="error-password" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </p>
              )}
            </div>

            {/* Phone (Country code dropdown + Input) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  data-testid="select-country-code"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 font-mono focus:border-teal-500 focus:outline-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.country} ({c.code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  data-testid="input-phone-number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="555-0199"
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Custom Datepicker */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Date of Birth (Custom Datepicker) <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                data-testid="dob-picker-button"
                onClick={() => setCalendarOpen(!calendarOpen)}
                className="w-full bg-slate-900 border border-slate-800 hover:border-teal-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 flex items-center justify-between font-mono focus:outline-none"
              >
                <span>{dob ? dob : 'Select Date of Birth'}</span>
                <CalendarIcon className="w-4 h-4 text-teal-400" />
              </button>

              {/* Custom Popover Calendar */}
              {calendarOpen && (
                <div
                  data-testid="dob-calendar-popover"
                  className="absolute z-30 mt-2 p-4 bg-[#111827] border border-slate-700 rounded-2xl shadow-2xl w-72"
                >
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-200">
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded"
                    >
                      &lt;
                    </button>
                    <span className="font-bold">
                      {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded"
                    >
                      &gt;
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-slate-500 mb-1">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleSelectDate(day)}
                          className="h-7 w-7 text-xs font-mono rounded hover:bg-teal-500/20 hover:text-teal-300 text-slate-300 flex items-center justify-center transition-colors"
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Searchable Multi-Select Tag Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Automation Skills (Searchable Multi-select)
              </label>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex flex-wrap items-center gap-1.5">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    data-testid={`tag-chip-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1 text-[11px] font-mono bg-teal-500/15 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-lg"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => setSelectedSkills(selectedSkills.filter((s) => s !== skill))}
                      className="hover:text-teal-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  data-testid="multi-select-input"
                  value={skillSearch}
                  onFocus={() => setSkillDropdownOpen(true)}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder={selectedSkills.length === 0 ? "Search skills..." : ""}
                  className="bg-transparent text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none flex-1 font-mono min-w-[120px]"
                />
              </div>

              {/* Dropdown Options */}
              {skillDropdownOpen && (
                <div className="mt-1 bg-slate-900 border border-slate-800 rounded-xl p-1 max-h-36 overflow-y-auto font-mono text-xs shadow-xl">
                  {SKILLS_LIST.filter(
                    (s) => !selectedSkills.includes(s) && s.toLowerCase().includes(skillSearch.toLowerCase())
                  ).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        setSelectedSkills([...selectedSkills, skill]);
                        setSkillSearch('');
                        setSkillDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors flex items-center justify-between"
                    >
                      <span>{skill}</span>
                      <Check className="w-3.5 h-3.5 text-teal-400 opacity-0 hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Drag & Drop File Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                Resume / Test Plan Upload (Drag & Drop)
              </label>
              <div
                data-testid="file-dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-slate-800 hover:border-teal-500/50 bg-slate-900/60 rounded-2xl p-6 text-center transition-colors cursor-pointer"
                onClick={() => document.getElementById('hidden-file-input')?.click()}
              >
                <input
                  type="file"
                  id="hidden-file-input"
                  data-testid="file-input-hidden"
                  className="hidden"
                  onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])}
                />
                <Upload className="w-8 h-8 text-teal-400 mx-auto mb-2 opacity-80" />
                <p className="text-xs text-slate-300 font-mono">
                  Drag and drop file here, or <span className="text-teal-400 underline">browse</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Supports PDF, DOCX, PNG (Max 5MB)</p>
                {uploadedFile && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-lg text-xs font-mono" data-testid="uploaded-file-name">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Multi-line Bio Textarea + Character Counter */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                <label className="font-semibold text-slate-300">Biography / Experience Notes</label>
                <span data-testid="char-counter" className="text-slate-500 text-[11px]">
                  {bio.length} / 200 chars
                </span>
              </div>
              <textarea
                data-testid="textarea-bio"
                maxLength={200}
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Briefly describe your test automation background..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all font-mono resize-none"
              />
            </div>

            {/* Canvas Signature Pad */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-teal-400" /> Signature Pad
                </label>
                <button
                  type="button"
                  data-testid="btn-clear-signature"
                  onClick={clearSignature}
                  className="text-slate-400 hover:text-slate-200 text-[11px] flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Clear
                </button>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={450}
                  height={100}
                  data-testid="signature-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-24 bg-slate-950 cursor-crosshair"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="btn-submit-form"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20"
            >
              Review & Submit Registration
            </button>

          </form>

          {/* Submission Output & Assertion Container */}
          <div className="space-y-6">
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl sticky top-24">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Submitted JSON Data Output
                </h3>
              </div>

              <p className="text-[11px] text-slate-400">
                Playwright scripts can assert output data rendered in this container after form submission.
              </p>

              {submittedData ? (
                <div data-testid="submitted-json-container" className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                  <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
              ) : (
                <div data-testid="submitted-json-container" className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 text-center text-xs font-mono text-slate-600">
                  // No data submitted yet.<br />Fill form and click "Review & Submit".
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
