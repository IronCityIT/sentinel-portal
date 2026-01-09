'use client';

import { useState } from 'react';

interface Workflow {
  id: string;
  name: string;
  desc: string;
}

interface Product {
  name: string;
  icon: string;
  repo: string;
  workflows: Workflow[];
}

interface Products {
  [key: string]: Product;
}

export default function RunPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [targets, setTargets] = useState<string[]>([]);
  const [targetInput, setTargetInput] = useState('');
  const [clientName, setClientName] = useState('');
  const [scanType, setScanType] = useState('baseline');
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [notifyEmail, setNotifyEmail] = useState('security@ironcityit.com');
  const [githubToken, setGithubToken] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<{type: string, message: string}[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const products: Products = {
    'attacksim': {
      name: 'AttackSim Pro',
      icon: '⚔️',
      repo: 'IronCityIT/attacksim-pro',
      workflows: [
        { id: 'zap-baseline.yml', name: 'ZAP Baseline (Passive)', desc: 'Non-intrusive passive scan' },
        { id: 'zap-full.yml', name: 'ZAP Full Scan (Active)', desc: 'Comprehensive active scanning' },
        { id: 'nuclei-scan.yml', name: 'Nuclei CVE Scanner', desc: 'Known vulnerability detection' }
      ]
    },
    'threat-inspector': {
      name: 'Threat Inspector',
      icon: '🔍',
      repo: 'IronCityIT/threat-inspector',
      workflows: [
        { id: 'nmap-scan.yml', name: 'Nmap Port Scan', desc: 'Network port discovery' },
        { id: 'ssl-check.yml', name: 'SSL/TLS Analysis', desc: 'Certificate and cipher audit' },
        { id: 'subdomain-enum.yml', name: 'Subdomain Enumeration', desc: 'Asset discovery' }
      ]
    },
    'shadowscan': {
      name: 'ShadowScan',
      icon: '👁️',
      repo: 'IronCityIT/shadowscan',
      workflows: [
        { id: 'darkweb-monitor.yml', name: 'Dark Web Monitor', desc: 'Tor network scanning' },
        { id: 'credential-check.yml', name: 'Credential Leak Check', desc: 'Breach database search' }
      ]
    },
    'dns-guard': {
      name: 'DNS Guard',
      icon: '🛡️',
      repo: 'IronCityIT/dns-guard',
      workflows: [
        { id: 'dns-audit.yml', name: 'DNS Security Audit', desc: 'Full DNS configuration check' },
        { id: 'dns-monitor.yml', name: 'DNS Monitoring', desc: 'Continuous DNS health check' }
      ]
    },
    'surge': {
      name: 'Surge',
      icon: '⚡',
      repo: 'IronCityIT/surge',
      workflows: [
        { id: 'load-test.yml', name: 'Load Test', desc: 'Performance under stress' },
        { id: 'uptime-check.yml', name: 'Uptime Monitor', desc: 'Availability check' }
      ]
    },
    'ironsight': {
      name: 'IronSight Forensics',
      icon: '🔬',
      repo: 'IronCityIT/ironsight-forensics',
      workflows: [
        { id: 'memory-analysis.yml', name: 'Memory Analysis', desc: 'RAM dump investigation' },
        { id: 'disk-analysis.yml', name: 'Disk Analysis', desc: 'Storage forensics' }
      ]
    }
  };

  const productCards = [
    { id: 'attacksim', icon: '⚔️', name: 'AttackSim Pro', desc: 'Breach and attack simulation platform. Test defenses with ZAP, Nuclei, and custom exploits.', color: 'from-red-500 to-red-400' },
    { id: 'threat-inspector', icon: '🔍', name: 'Threat Inspector', desc: 'Advanced threat detection with vulnerability scanning, SSL analysis, and asset discovery.', color: 'from-cyan-500 to-cyan-400' },
    { id: 'shadowscan', icon: '👁️', name: 'ShadowScan', desc: 'Deep and dark web monitoring. Uncover leaked credentials and exposed data.', color: 'from-purple-600 to-purple-500' },
    { id: 'dns-guard', icon: '🛡️', name: 'DNS Guard', desc: 'DNS security monitoring. Detect spoofing, tunneling, and malicious domains.', color: 'from-green-500 to-green-400' },
    { id: 'surge', icon: '⚡', name: 'Surge', desc: 'Web performance and eCommerce optimization. Load testing and availability monitoring.', color: 'from-amber-500 to-amber-400' },
    { id: 'ironsight', icon: '🔬', name: 'IronSight Forensics', desc: 'Digital forensics analysis. Memory dumps, disk images, and incident investigation.', color: 'from-pink-600 to-orange-500' },
  ];

  const log = (type: string, message: string) => {
    setConsoleOutput(prev => [...prev, { type, message }]);
  };

  const handleTargetKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && targetInput.trim()) {
      if (!targets.includes(targetInput.trim())) {
        setTargets([...targets, targetInput.trim()]);
      }
      setTargetInput('');
    }
  };

  const removeTarget = (index: number) => {
    setTargets(targets.filter((_, i) => i !== index));
  };

  const selectProduct = (productId: string) => {
    setSelectedProduct(productId);
    setTargets([]);
    setSelectedWorkflows([]);
    setConsoleOutput([]);
    setShowConsole(false);
  };

  const toggleWorkflow = (workflowId: string) => {
    setSelectedWorkflows(prev => 
      prev.includes(workflowId) 
        ? prev.filter(w => w !== workflowId)
        : [...prev, workflowId]
    );
  };

  const triggerScan = async () => {
    const token = githubToken || localStorage.getItem('github_token');
    
    if (!token) {
      setShowTokenModal(true);
      return;
    }

    if (!selectedProduct) {
      alert('Please select a product first');
      return;
    }

    if (targets.length === 0) {
      alert('Please add at least one target');
      return;
    }

    if (selectedWorkflows.length === 0) {
      alert('Please select at least one scan type');
      return;
    }

    const product = products[selectedProduct];
    setIsRunning(true);
    setShowConsole(true);
    setConsoleOutput([]);

    log('info', `Initiating ${product.name} scan...`);
    log('info', `Targets: ${targets.join(', ')}`);
    log('info', `Workflows: ${selectedWorkflows.length} selected`);

    try {
      for (const target of targets) {
        for (const workflowId of selectedWorkflows) {
          const workflow = product.workflows.find(w => w.id === workflowId);
          log('info', `Dispatching ${workflow?.name} for ${target}...`);

          const response = await fetch(
            `https://api.github.com/repos/${product.repo}/actions/workflows/${workflowId}/dispatches`,
            {
              method: 'POST',
              headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ref: 'main',
                inputs: {
                  target_url: target,
                  client_name: clientName || 'Manual Scan',
                  scan_id: `scan-${Date.now()}`,
                  notify_email: notifyEmail
                }
              })
            }
          );

          if (response.status === 204) {
            log('success', `✓ ${workflow?.name} triggered for ${target}`);
          } else if (response.status === 404) {
            log('error', `✗ Workflow not found: ${workflowId}`);
          } else if (response.status === 401) {
            log('error', `✗ Invalid GitHub token`);
            localStorage.removeItem('github_token');
            setGithubToken('');
          } else {
            const error = await response.json();
            log('error', `✗ Error: ${error.message}`);
          }
        }
      }

      log('success', '');
      log('success', '🎯 All scans dispatched! Check GitHub Actions for progress.');
      log('info', `View at: https://github.com/${product.repo}/actions`);

    } catch (error: any) {
      log('error', `✗ Network error: ${error.message}`);
    }

    setIsRunning(false);
  };

  const saveToken = () => {
    localStorage.setItem('github_token', githubToken);
    setShowTokenModal(false);
    triggerScan();
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white" style={{
      backgroundImage: 'radial-gradient(ellipse at top, rgba(0, 180, 216, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(0, 255, 136, 0.05) 0%, transparent 50%)'
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-[#111827]/95 to-[#0a0e17]/90 border-b border-[#1e293b] px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00b4d8] flex items-center justify-center font-black text-xl text-[#0a0e17] shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              IC
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00b4d8] bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                COMMAND CENTER
              </div>
              <div className="text-xs text-[#8892a6] uppercase tracking-[3px]">Iron City IT Advisors</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full">
            <div className="w-2.5 h-2.5 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_10px_#00ff88]"></div>
            <span className="text-sm">Systems Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <h2 className="text-lg text-[#8892a6] uppercase tracking-[2px] mb-6 flex items-center gap-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <span className="w-1 h-5 bg-gradient-to-b from-[#00ff88] to-[#00b4d8] rounded-sm"></span>
          Security Products
        </h2>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {productCards.map((product) => (
            <div
              key={product.id}
              onClick={() => selectProduct(product.id)}
              className={`relative bg-[#111827] border rounded-2xl p-6 cursor-pointer transition-all duration-300 overflow-hidden group hover:bg-[#1a2332] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_40px_rgba(0,255,136,0.3)] ${
                selectedProduct === product.id
                  ? 'border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.3)]'
                  : 'border-[#1e293b] hover:border-[#00ff88]'
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00ff88] to-[#00b4d8] transition-opacity ${selectedProduct === product.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center text-2xl`}>
                  {product.icon}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[#00ff88]/20 text-[#00ff88]">
                  Ready
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>{product.name}</h3>
              <p className="text-[#8892a6] text-sm leading-relaxed">{product.desc}</p>
            </div>
          ))}
        </div>

        {/* Configuration Panel */}
        {selectedProduct && (
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-8 mb-8 animate-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#1e293b]">
              <h3 className="text-2xl flex items-center gap-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span>{products[selectedProduct].icon}</span>
                <span>{products[selectedProduct].name}</span>
              </h3>
              <button onClick={() => setSelectedProduct(null)} className="text-[#8892a6] text-2xl hover:text-[#ff3366] transition-colors">
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[#8892a6] text-sm font-semibold uppercase tracking-wider mb-2">Client / Engagement Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Acme Corp - Q1 Assessment"
                  className="w-full p-4 bg-[#0a0e17] border border-[#1e293b] rounded-lg text-white focus:outline-none focus:border-[#00ff88] focus:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#8892a6] text-sm font-semibold uppercase tracking-wider mb-2">Targets</label>
                <input
                  type="text"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  onKeyPress={handleTargetKeyPress}
                  placeholder="Enter URL or IP, press Enter to add"
                  className="w-full p-4 bg-[#0a0e17] border border-[#1e293b] rounded-lg text-white focus:outline-none focus:border-[#00ff88] focus:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {targets.map((target, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#00b4d8]/20 border border-[#00b4d8]/40 rounded-full text-sm">
                      <span>{target}</span>
                      <button onClick={() => removeTarget(i)} className="text-[#ff3366] hover:text-[#ff6b6b]">×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#8892a6] text-sm font-semibold uppercase tracking-wider mb-2">Select Scans to Run</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products[selectedProduct].workflows.map((workflow) => (
                    <label
                      key={workflow.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedWorkflows.includes(workflow.id)
                          ? 'bg-[#00ff88]/10 border-[#00ff88]'
                          : 'bg-[#0a0e17] border-[#1e293b] hover:border-[#8892a6]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedWorkflows.includes(workflow.id)}
                        onChange={() => toggleWorkflow(workflow.id)}
                        className="mt-1 w-4 h-4 accent-[#00ff88]"
                      />
                      <div>
                        <div className="font-semibold">{workflow.name}</div>
                        <div className="text-sm text-[#8892a6]">{workflow.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#8892a6] text-sm font-semibold uppercase tracking-wider mb-2">Notification Email</label>
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="w-full p-4 bg-[#0a0e17] border border-[#1e293b] rounded-lg text-white focus:outline-none focus:border-[#00ff88] transition-all"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={triggerScan}
                  disabled={isRunning}
                  className="px-8 py-4 bg-gradient-to-br from-[#00ff88] to-[#00cc6a] text-[#0a0e17] font-bold uppercase tracking-wider rounded-lg shadow-[0_4px_20px_rgba(0,255,136,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,255,136,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isRunning ? (
                    <>
                      <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
                      Executing...
                    </>
                  ) : (
                    <>🚀 Execute Scan</>
                  )}
                </button>
                <button className="px-8 py-4 border border-[#1e293b] text-white font-bold uppercase tracking-wider rounded-lg hover:border-[#00b4d8] hover:text-[#00b4d8] transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  💾 Save Draft
                </button>
              </div>

              {/* Console Output */}
              {showConsole && (
                <div className="mt-6 bg-black border border-[#1e293b] rounded-lg p-4 font-mono text-sm max-h-72 overflow-y-auto">
                  {consoleOutput.map((line, i) => (
                    <div key={i} className={`mb-1 ${
                      line.type === 'info' ? 'text-[#00b4d8]' :
                      line.type === 'success' ? 'text-[#00ff88]' :
                      line.type === 'error' ? 'text-[#ff3366]' :
                      'text-[#ffaa00]'
                    }`}>
                      [{new Date().toLocaleTimeString()}] {line.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <h2 className="text-lg text-[#8892a6] uppercase tracking-[2px] mb-6 flex items-center gap-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <span className="w-1 h-5 bg-gradient-to-b from-[#00ff88] to-[#00b4d8] rounded-sm"></span>
          Recent Activity
        </h2>

        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e293b]">
                <th className="text-left p-4 text-[#8892a6] text-xs font-semibold uppercase tracking-wider">Product</th>
                <th className="text-left p-4 text-[#8892a6] text-xs font-semibold uppercase tracking-wider">Target</th>
                <th className="text-left p-4 text-[#8892a6] text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-[#8892a6] text-xs font-semibold uppercase tracking-wider">Started</th>
                <th className="text-left p-4 text-[#8892a6] text-xs font-semibold uppercase tracking-wider">Duration</th>
                <th className="text-left p-4 text-[#8892a6] text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1e293b] hover:bg-[#00ff88]/5">
                <td className="p-4">AttackSim Pro</td>
                <td className="p-4">example.com</td>
                <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#00ff88]/20 text-[#00ff88]">Complete</span></td>
                <td className="p-4">2 hours ago</td>
                <td className="p-4">12m 34s</td>
                <td className="p-4">
                  <button className="px-4 py-2 border border-[#1e293b] rounded-lg text-sm hover:border-[#00b4d8] hover:text-[#00b4d8] transition-all">
                    View Report
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-[#00ff88]/5">
                <td className="p-4">Threat Inspector</td>
                <td className="p-4">192.168.1.0/24</td>
                <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ffaa00]/20 text-[#ffaa00] animate-pulse">Running</span></td>
                <td className="p-4">15 min ago</td>
                <td className="p-4">--</td>
                <td className="p-4">
                  <button className="px-4 py-2 border border-[#ff3366] text-[#ff3366] rounded-lg text-sm hover:bg-[#ff3366] hover:text-[#0a0e17] transition-all">
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-[#8892a6] text-sm border-t border-[#1e293b] mt-12">
        <p>Iron City IT Advisors © 2026 | Blue-Collar Security for Real-World Threats</p>
      </footer>

      {/* GitHub Token Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>🔑 GitHub Authentication</h3>
            <p className="text-[#8892a6] mb-6">Enter your GitHub Personal Access Token to trigger workflows.</p>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="w-full p-4 bg-[#0a0e17] border border-[#1e293b] rounded-lg text-white mb-6 focus:outline-none focus:border-[#00ff88] transition-all"
            />
            <div className="flex gap-4">
              <button
                onClick={saveToken}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-[#00ff88] to-[#00cc6a] text-[#0a0e17] font-bold uppercase rounded-lg"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Save & Continue
              </button>
              <button
                onClick={() => setShowTokenModal(false)}
                className="flex-1 px-6 py-3 border border-[#1e293b] text-white font-bold uppercase rounded-lg hover:border-[#8892a6] transition-all"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
