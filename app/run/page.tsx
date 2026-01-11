'use client';

import { useState } from 'react';

// Product configurations matching ACTUAL GitHub repos and workflows
const PRODUCTS = [
  {
    id: 'attacksim',
    name: 'AttackSim Pro',
    icon: '🎯',
    description: 'Purple Team Breach & Attack Simulation',
    repo: 'IronCityIT/ICIT-AttackSimPro',
    cloudFunctionUrl: 'https://storescanresults-wrl6y3keaa-ul.a.run.app',
    dashboardUrl: 'https://asp.ironcityit.com',
    color: 'from-purple-600 to-purple-800',
    workflows: [
      { id: 'zap-baseline', name: 'ZAP Baseline (Passive)', file: 'zap-baseline.yml', inputType: 'url' },
      { id: 'zap-full', name: 'ZAP Full Scan (Active)', file: 'zap-fullscan.yml', inputType: 'url' },
      { id: 'zap-api', name: 'ZAP API Scan', file: 'zap-api-scan.yml', inputType: 'url' },
      { id: 'zap-auth', name: 'ZAP Authenticated Scan', file: 'zap-auth-scan.yml', inputType: 'url' },
      { id: 'nuclei', name: 'Nuclei Vulnerability Scan', file: 'nuclei.yml', inputType: 'url' },
      { id: 'tls-headers', name: 'TLS & Headers Evidence', file: 'tls-headers.yml', inputType: 'url' },
      { id: 'metasploit', name: 'Metasploit Exploitation', file: 'metasploit.yml', inputType: 'ip' },
    ]
  },
  {
    id: 'dnsguard',
    name: 'DNS Guard',
    icon: '🛡️',
    description: 'DNS Security Intelligence',
    repo: 'IronCityIT/ICIT-DNSGuard',
    cloudFunctionUrl: 'https://storescanresults-3zal4u6frq-ul.a.run.app',
    dashboardUrl: 'https://icit-dnsguard.web.app',
    color: 'from-amber-600 to-amber-800',
    workflows: [
      { id: 'dns-analysis', name: 'Full DNS Security Audit', file: 'dns-analysis.yml', inputType: 'domain' },
    ]
  },
  {
    id: 'inspector',
    name: 'Threat Inspector',
    icon: '🔍',
    description: 'Vulnerability Assessment & Analysis',
    repo: 'IronCityIT/threat-inspector',
    cloudFunctionUrl: '',
    dashboardUrl: 'https://inspector.ironcityit.com',
    color: 'from-red-600 to-red-800',
    workflows: [
      { id: 'nmap', name: 'Port Scan (Nmap)', file: 'nmap-scan.yml', inputType: 'ip' },
      { id: 'ssl-grade', name: 'SSL/TLS Grade', file: 'ssl-grade.yml', inputType: 'domain' },
      { id: 'asset-discovery', name: 'Asset Discovery', file: 'asset-discovery.yml', inputType: 'domain' },
      { id: 'vuln-report', name: 'Vulnerability Report', file: 'vuln-report.yml', inputType: 'file' },
    ]
  },
];

// Map inputs to workflow-specific parameter names (matches actual workflow inputs)
function getWorkflowInputs(
  productId: string, 
  workflowId: string, 
  target: string, 
  clientName: string
): Record<string, string> {
  const scanId = `scan-${Date.now()}`;
  const clientId = clientName?.toLowerCase().replace(/\s+/g, '-') || 'internal';

  // Mappings match ACTUAL workflow_dispatch inputs from GitHub
  const mappings: Record<string, Record<string, Record<string, string>>> = {
    attacksim: {
      'zap-baseline': { target_url: target, scan_id: scanId, client_id: clientId },
      'zap-full': { target_url: target, scan_id: scanId, client_id: clientId },
      'zap-api': { target_url: target, scan_id: scanId, client_id: clientId, api_spec_url: target + '/swagger.json' },
      'zap-auth': { target_url: target, scan_id: scanId, client_id: clientId, login_url: target + '/login' },
      'nuclei': { target_url: target, scan_id: scanId, client_id: clientId },
      'tls-headers': { target_url: target, scan_id: scanId, client_id: clientId },
      'metasploit': { target_host: target, scan_id: scanId, client_id: clientId, target_ports: '22,80,443,445,3389' },
    },
    dnsguard: {
      'dns-analysis': { 
        domain: target, 
        client_name: clientName || 'Iron City IT', 
        enable_subdomains: 'true', 
        enable_threat_intel: 'true' 
      },
    },
    inspector: {
      'nmap': { target: target, scan_id: scanId, client_id: clientId },
      'ssl-grade': { target: target, scan_id: scanId, client_id: clientId },
      'asset-discovery': { target: target, scan_id: scanId, client_id: clientId },
      'vuln-report': { scan_id: scanId, client_id: clientId },
    },
  };

  return mappings[productId]?.[workflowId] || { target, scan_id: scanId, client_id: clientId };
}

interface RunLog {
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export default function RunsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [target, setTarget] = useState('');
  const [clientName, setClientName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<RunLog[]>([]);
  const [showPatModal, setShowPatModal] = useState(false);
  const [githubPat, setGithubPat] = useState('');

  const product = PRODUCTS.find(p => p.id === selectedProduct);
  const workflow = product?.workflows.find(w => w.id === selectedWorkflow);

  const addLog = (type: RunLog['type'], message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, type, message }]);
  };

  const getPlaceholder = () => {
    if (!workflow) return 'Select a workflow first';
    switch (workflow.inputType) {
      case 'url': return 'https://example.com';
      case 'domain': return 'example.com';
      case 'ip': return '192.168.1.1 or 10.0.0.0/24';
      case 'file': return 'N/A - uses uploaded scan files';
      default: return 'Enter target';
    }
  };

  const triggerWorkflow = async () => {
    if (!product || !workflow) {
      addLog('error', 'Select a product and workflow');
      return;
    }

    if (workflow.inputType !== 'file' && !target.trim()) {
      addLog('error', 'Enter a target');
      return;
    }

    const pat = githubPat || localStorage.getItem('github_pat') || process.env.NEXT_PUBLIC_GITHUB_PAT;
    if (!pat) {
      setShowPatModal(true);
      return;
    }

    setIsRunning(true);
    setLogs([]);

    addLog('info', '═══════════════════════════════════════════');
    addLog('info', `🚀 Starting ${product.name} - ${workflow.name}`);
    addLog('info', '═══════════════════════════════════════════');
    addLog('info', `📍 Target: ${target || 'N/A'}`);
    addLog('info', `👤 Client: ${clientName || 'Iron City IT'}`);
    addLog('info', `📦 Repo: ${product.repo}`);
    addLog('info', `⚙️ Workflow: ${workflow.file}`);
    addLog('info', '');

    try {
      const inputs = getWorkflowInputs(product.id, workflow.id, target, clientName);
      
      addLog('info', '📤 Triggering GitHub Actions workflow...');

      const response = await fetch(
        `https://api.github.com/repos/${product.repo}/actions/workflows/${workflow.file}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${pat}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ref: 'main',
            inputs: inputs
          })
        }
      );

      if (response.status === 204 || response.ok) {
        addLog('success', '✅ Workflow triggered successfully!');
        addLog('info', '');
        addLog('info', '⏳ Workflow is now running...');
        addLog('info', `📊 View progress: https://github.com/${product.repo}/actions`);
        
        if (githubPat) {
          localStorage.setItem('github_pat', githubPat);
          setShowPatModal(false);
        }

        setTimeout(() => addLog('info', '🔍 Scan in progress...'), 2000);
        setTimeout(() => addLog('info', '🤖 AI Consensus Engine™ will analyze results...'), 4000);
        setTimeout(() => {
          addLog('success', '');
          addLog('success', '═══════════════════════════════════════════');
          addLog('success', '📋 Results will appear on the dashboard:');
          addLog('success', `   ${product.dashboardUrl}`);
          addLog('success', '═══════════════════════════════════════════');
        }, 6000);

      } else {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        addLog('error', `❌ Failed: ${error.message || response.statusText}`);

        if (response.status === 401 || response.status === 403) {
          addLog('warning', '🔑 Invalid or expired GitHub token');
          localStorage.removeItem('github_pat');
          setShowPatModal(true);
        } else if (response.status === 404) {
          addLog('error', `Workflow "${workflow.file}" not found in ${product.repo}`);
          addLog('info', `Check: https://github.com/${product.repo}/actions`);
        }
      }
    } catch (error: any) {
      addLog('error', `❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const savePat = () => {
    if (githubPat) {
      localStorage.setItem('github_pat', githubPat);
      setShowPatModal(false);
      addLog('success', '🔑 GitHub token saved');
      triggerWorkflow();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-slate-900">IC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Iron City IT Command Center</h1>
              <p className="text-sm text-slate-400">Security Operations Portal</p>
            </div>
          </div>
          <nav className="flex space-x-6">
            <a href="/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</a>
            <a href="/run" className="text-amber-500 font-medium">Runs</a>
            <a href="/reports" className="text-slate-400 hover:text-white transition">Reports</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Security Runs</h2>
          <p className="text-slate-400">Execute security assessments across Iron City products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Product Selection */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Select Product
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p.id);
                      setSelectedWorkflow(null);
                      setTarget('');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedProduct === p.id
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{p.icon}</div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{p.description}</div>
                    <div className="text-xs text-slate-500 mt-2 font-mono">{p.workflows.length} workflows</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Workflow Selection */}
            {product && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Select Workflow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.workflows.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWorkflow(w.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        selectedWorkflow === w.id
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-medium">{w.name}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{w.file}</div>
                      <div className="text-xs text-slate-600 mt-1">Input: {w.inputType}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Target Configuration */}
            {workflow && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Configure Scan
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Acme Corporation"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  {workflow.inputType !== 'file' && (
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Target ({workflow.inputType.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder={getPlaceholder()}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Execute Button */}
            {workflow && (
              <button
                onClick={triggerWorkflow}
                disabled={isRunning || (workflow.inputType !== 'file' && !target.trim())}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isRunning || (workflow.inputType !== 'file' && !target.trim())
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900'
                }`}
              >
                {isRunning ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing...
                  </span>
                ) : (
                  `🚀 Execute ${workflow?.name || 'Scan'}`
                )}
              </button>
            )}
          </div>

          {/* Right Column - Console */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isRunning ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
                Console
              </h3>
              <div className="bg-black rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-slate-600">Ready for execution...</p>
                ) : (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className={`mb-1 ${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'success' ? 'text-green-400' :
                        log.type === 'warning' ? 'text-amber-400' :
                        'text-slate-400'
                      }`}
                    >
                      <span className="text-slate-600">[{log.time}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>

              {product && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-sm">
                  <a 
                    href={`https://github.com/${product.repo}/actions`} 
                    target="_blank" 
                    className="block text-amber-400 hover:underline"
                  >
                    → View GitHub Actions
                  </a>
                  <a 
                    href={product.dashboardUrl} 
                    target="_blank" 
                    className="block text-amber-400 hover:underline"
                  >
                    → View Dashboard
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* PAT Modal */}
      {showPatModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">GitHub Authentication</h3>
            <p className="text-slate-400 text-sm mb-4">
              Enter your GitHub Personal Access Token with <code className="bg-slate-800 px-1 rounded">repo</code> and <code className="bg-slate-800 px-1 rounded">workflow</code> scopes.
            </p>
            <input
              type="password"
              value={githubPat}
              onChange={(e) => setGithubPat(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none font-mono mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowPatModal(false)}
                className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={savePat}
                className="flex-1 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
              >
                Save & Continue
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              <a href="https://github.com/settings/tokens" target="_blank" className="text-amber-400 hover:underline">
                Create a token →
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
