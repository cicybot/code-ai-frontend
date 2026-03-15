import { useState } from 'react';
import { 
  Folder, Search, GitBranch, Settings, Play, 
  Terminal, MessageSquare, ChevronRight, ChevronDown,
  FileText, FileCode, Sparkles, ArrowLeft,
  LayoutDashboard, Zap, Brain, PanelLeft, X, Globe,
  Code2, Check, Plus, Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Panel, Group, Separator } from 'react-resizable-panels';

interface WorkspaceProps {
  agentId: string | null;
  onSelectAgent: (id: string) => void;
}

export default function Workspace({ agentId, onSelectAgent }: WorkspaceProps) {
  const [mainTab, setMainTab] = useState<'chat' | 'cli'>('chat');
  const [isCodeServerOpen, setIsCodeServerOpen] = useState(false);
  const [isClientListOpen, setIsClientListOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-zinc-300 relative">
      {/* Left Sidebar (Activity Bar) */}
      <div className="w-14 border-r border-white/5 flex flex-col items-center py-4 justify-between bg-[#0A0A0A] shrink-0 z-50">
        <div className="flex flex-col gap-4 w-full items-center">
          <button 
            onClick={() => setIsClientListOpen(!isClientListOpen)}
            className={cn(
              "p-2.5 rounded-xl transition-all relative group",
              isClientListOpen ? "text-white bg-white/10" : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
            title="Agents"
          >
            <Users className="w-5 h-5" />
            {isClientListOpen && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-r"></div>}
          </button>
          <button 
            onClick={() => setIsCodeServerOpen(!isCodeServerOpen)}
            className={cn(
              "p-2.5 rounded-xl transition-all relative group",
              isCodeServerOpen ? "text-white bg-white/10" : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
            title="Code Server"
          >
            <Code2 className="w-5 h-5" />
            {isCodeServerOpen && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-r"></div>}
          </button>
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          <button className="p-2.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-14 border-b border-white/5 bg-[#0A0A0A] flex items-center justify-between px-4 shrink-0 z-10">
          <div className="flex items-center gap-4 w-1/3">
            <span className="text-xs font-mono text-zinc-600 bg-white/5 px-2 py-1 rounded">
              {agentId || 'w-10001'}
            </span>
          </div>

          <div className="flex items-center justify-center w-1/3">
            <div className="flex items-center bg-[#141414] border border-white/5 rounded-lg p-1">
              <button 
                onClick={() => setMainTab('chat')}
                className={cn(
                  "flex items-center gap-2 px-6 py-1.5 text-sm font-medium rounded-md transition-all",
                  mainTab === 'chat' ? "bg-white/10 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
              <button 
                onClick={() => setMainTab('cli')}
                className={cn(
                  "flex items-center gap-2 px-6 py-1.5 text-sm font-medium rounded-md transition-all",
                  mainTab === 'cli' ? "bg-white/10 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Terminal className="w-4 h-4" />
                CLI
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end w-1/3 gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Agent Active
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          <Group id="workspace-layout" orientation="horizontal">
            {isCodeServerOpen && (
              <>
                <Panel id="code-server" order={1} defaultSize={50} minSize={30}>
                  <div className="h-full flex flex-col bg-[#0A0A0A] border-r border-white/5">
                    {/* Code Server Header */}
                    <div className="h-10 border-b border-white/5 flex items-center px-4 bg-[#0F0F0F] shrink-0">
                      <Code2 className="w-4 h-4 text-zinc-400 mr-2" />
                      <span className="text-xs font-medium text-zinc-300">Code Server</span>
                      <div className="flex-1"></div>
                      <button 
                        onClick={() => setIsCodeServerOpen(false)}
                        className="p-1 text-zinc-500 hover:text-white rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Code Server Content */}
                    <div className="flex-1 relative bg-[#1E1E1E]">
                      <iframe src="about:blank" className="w-full h-full border-0 bg-white/5" title="Code Server" />
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-500 flex-col gap-4 pointer-events-none">
                        <Code2 className="w-12 h-12 opacity-20" />
                        <p>Code Server (iframe src="about:blank")</p>
                      </div>
                    </div>
                  </div>
                </Panel>
                <Separator className="w-1 bg-white/5 hover:bg-blue-500/50 active:bg-blue-500 transition-colors cursor-col-resize" />
              </>
            )}
            
            <Panel id="chat-history" order={2} defaultSize={50} minSize={30}>
              {mainTab === 'chat' ? (
                <div className="flex-1 flex flex-col items-center relative h-full">
                  {/* Scrollable Chat History */}
                  <div className="w-full flex-1 overflow-y-auto flex flex-col items-center p-4 sm:p-8">
                    <div className="w-full max-w-4xl flex flex-col gap-6 pb-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                    帮我重新设计下ui,https://ide.cicy.de5.net/#/agent/w-10001,https://ide.cicy.de5.net/
                  </div>
                </div>

                {/* Agent Message */}
                <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 w-full shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-zinc-200">vibe</span>
                      <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md">claude-opus-4.5</span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                        <span className="w-3 h-3 inline-block rounded-full border-2 border-zinc-500 border-t-transparent animate-spin"></span> 
                        1m56s
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono bg-white/5 px-2 py-1 rounded-md">$3.372</span>
                  </div>
                  
                  <div className="text-sm text-zinc-300 mb-5 leading-relaxed">
                    继续。把 Vite/TS 依赖改成纯静态:
                  </div>

                  <div className="space-y-2 mb-5">
                    <ToolCall 
                      icon={<FileCode className="w-4 h-4 text-amber-400" />} 
                      title="Write File" 
                      path="~/Private/workers/w-10001/projects/cicy-web/site/index.html" 
                      diff={[
                        { type: 'remove', content: '<script type="module" src="/src/main.ts"></script>' },
                        { type: 'remove', content: '</body>' },
                        { type: 'add', content: '<script>' },
                        { type: 'add', content: '    // Init Lucide icons' },
                        { type: 'add', content: '    lucide.createIcons();' },
                        { type: 'add', content: '    // Language toggle' },
                        { type: 'add', content: '    document.getElementById(\'lang-toggle\')?.addEventListener(\'click\', () => {' },
                        { type: 'add', content: '        document.documentElement.lang = document.documentElement.lang === \'en\' ? \'zh\' : \'en\';' },
                        { type: 'add', content: '    });' },
                        { type: 'add', content: '    // Typing animation' },
                      ]}
                    />
                    <ToolCall icon={<FileCode className="w-4 h-4 text-amber-400" />} title="Write File" path="~/Private/workers/w-10001/projects/cicy-web/site/index.html" />
                    <ToolCall icon={<FileCode className="w-4 h-4 text-amber-400" />} title="Write File" path="~/Private/workers/w-10001/projects/cicy-web/site/index.html" />
                  </div>

                  <div className="text-sm text-zinc-300 mb-5 leading-relaxed">
                    修复 URL 和 footer 链接:
                  </div>

                  <div className="space-y-2 mb-5">
                    <ToolCall icon={<FileCode className="w-4 h-4 text-amber-400" />} title="Write File" path="~/Private/workers/w-10001/projects/cicy-web/site/index.html" />
                    <ToolCall icon={<FileCode className="w-4 h-4 text-amber-400" />} title="Write File" path="~/Private/workers/w-10001/projects/cicy-web/site/index.html" />
                  </div>

                  <div className="text-sm text-zinc-300 mb-5 leading-relaxed">
                    部署:
                  </div>

                  <div className="space-y-2 mb-5">
                    <ToolCall icon={<Terminal className="w-4 h-4 text-emerald-400" />} title="Command" path="cd ~/Private/workers/w-10001/projects/cicy-web && CLOUDFLARE_ACCOUNT_ID=..." />
                  </div>

                  <div className="text-sm text-zinc-300 space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <p className="font-medium text-white">完成！</p>
                    <p>已同步 AI Studio 生成的 HTML 版本:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
                      <li>用 <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-amber-200 font-mono">&lt;span class="en"&gt;</code> / <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-amber-200 font-mono">&lt;span class="zh"&gt;</code> + CSS <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-amber-200 font-mono">:lang()</code> 选择器做中英文切换</li>
                      <li>Lucide 图标通过 CDN 加载</li>
                      <li>Tailwind CSS 通过 CDN 加载</li>
                      <li>打字动画 + 终端动画内联 JS</li>
                      <li>Footer 链接指向 /privacy/ /terms/ /refund/</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p>访问: <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">https://cicy-ai.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input (Fixed at bottom) */}
            <div className="w-full shrink-0 bg-[#0A0A0A] px-4 sm:px-8 pb-6 pt-2 flex flex-col items-center">
              <div className="w-full max-w-4xl">
                <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10 transition-all shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#1A1A1A]">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1.5 rounded-md hover:bg-amber-400/20 transition-colors">
                      <Zap className="w-3.5 h-3.5" />
                      Fast
                      <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-md hover:bg-white/5 transition-colors">
                      <Brain className="w-3.5 h-3.5" />
                      Model
                      <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                    </button>
                    <div className="flex-1"></div>
                    <div className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
                      <span>⇧</span><span>⏎</span> Send
                    </div>
                  </div>
                  <textarea 
                    placeholder="Type a message to the agent..." 
                    className="w-full bg-transparent text-sm text-zinc-200 p-4 min-h-[100px] resize-none focus:outline-none placeholder:text-zinc-600 leading-relaxed"
                  ></textarea>
                  <div className="flex justify-between items-center p-3 bg-[#141414]">
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-lg transition-colors">
                        <Code2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col items-center p-4 sm:p-8">
            <div className="w-full max-w-4xl flex-1 flex flex-col bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
              {/* ttyd iframe placeholder */}
              <div className="h-10 bg-[#141414] border-b border-white/5 flex items-center px-4 text-xs text-zinc-500 font-mono shrink-0">
                <Terminal className="w-4 h-4 mr-2" />
                ttyd - agent-cli
              </div>
              <div className="flex-1 relative">
                <iframe src="about:blank" className="w-full h-full border-0 bg-black absolute inset-0" title="ttyd terminal" />
                
                {/* Visual placeholder for the terminal */}
                <div className="absolute inset-0 p-4 font-mono text-sm text-zinc-300 overflow-y-auto pointer-events-none">
                  <div className="text-emerald-400 mb-1">cicy@w-10001:~/workspace$ ./agent-cli start</div>
                  <div className="text-blue-400 mb-1">[INFO] Starting agent w-10001...</div>
                  <div className="text-zinc-400 mb-1">[INFO] Connecting to MITM proxy...</div>
                  <div className="text-emerald-400 mb-1">[SUCCESS] Agent connected and ready.</div>
                  <div className="flex items-center mt-2">
                    <span className="text-emerald-400 mr-2">cicy@w-10001:~/workspace$</span>
                    <span className="w-2 h-4 bg-zinc-300 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>
    </Group>
  </main>
</div>

      {/* Client List Drawer (Left Sidebar) */}
      {isClientListOpen && (
        <div className="absolute inset-0 z-40 flex justify-start">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsClientListOpen(false)}
          ></div>
          
          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#0A0A0A] border-r border-white/10 flex flex-col shadow-2xl animate-slide-in-left ml-16">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-white">Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors" title="New Agent">
                  <Plus className="w-4 h-4" />
                </button>
                <button onClick={() => setIsClientListOpen(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              {/* Search & Filter */}
              <div className="mb-4 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search agents..." 
                    className="w-full bg-[#141414] border border-white/5 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-white/10 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-zinc-600 text-white"
                  />
                </div>
                <div className="flex items-center bg-[#141414] border border-white/5 rounded-lg p-1 overflow-x-auto no-scrollbar">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md whitespace-nowrap">All</button>
                  <button className="px-3 py-1 text-zinc-400 hover:text-white text-xs font-medium rounded-md transition-colors whitespace-nowrap">Master</button>
                  <button className="px-3 py-1 text-zinc-400 hover:text-white text-xs font-medium rounded-md transition-colors whitespace-nowrap">Workers</button>
                </div>
              </div>

              {/* Agent List */}
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    onSelectAgent('w-10001');
                    setIsClientListOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 bg-[#1A1A1A] border p-3 rounded-xl transition-all group text-left",
                    agentId === 'w-10001' ? "border-blue-500/50" : "border-white/10 hover:border-white/20"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center font-mono font-bold text-sm">
                      M
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors truncate">Master</h3>
                    <p className="text-zinc-500 text-xs font-mono mt-0.5 truncate">w-10001</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    onSelectAgent('w-10002');
                    setIsClientListOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 bg-[#1A1A1A] border p-3 rounded-xl transition-all group text-left",
                    agentId === 'w-10002' ? "border-blue-500/50" : "border-white/10 hover:border-white/20"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center font-mono font-bold text-sm">
                      W1
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors truncate">Worker 1</h3>
                    <p className="text-zinc-500 text-xs font-mono mt-0.5 truncate">w-10002</p>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    onSelectAgent('w-10003');
                    setIsClientListOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 bg-[#1A1A1A] border p-3 rounded-xl transition-all group text-left",
                    agentId === 'w-10003' ? "border-blue-500/50" : "border-white/10 hover:border-white/20"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 bg-zinc-500/10 text-zinc-400 rounded-lg flex items-center justify-center font-mono font-bold text-sm">
                      W2
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-zinc-400 text-sm font-medium group-hover:text-blue-400 transition-colors truncate">Worker 2</h3>
                    <p className="text-zinc-600 text-xs font-mono mt-0.5 truncate">w-10003 (Idle)</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FileTreeItem({ icon, name, isOpen = false, active = false, children }: any) {
  return (
    <div>
      <div className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer",
        active ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-white/5 text-zinc-300'
      )}>
        {children ? (
          <ChevronRight className={cn("w-3.5 h-3.5 text-zinc-500 transition-transform", isOpen && "rotate-90")} />
        ) : (
          <div className="w-3.5 h-3.5"></div>
        )}
        {icon}
        <span className="text-sm truncate">{name}</span>
      </div>
      {isOpen && children && (
        <div className="pl-3 border-l border-white/5 ml-3 mt-0.5 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

function ToolCall({ icon, title, path, diff }: any) {
  const [isExpanded, setIsExpanded] = useState(!!diff);

  return (
    <div className="bg-[#18181B] border border-white/5 rounded-lg overflow-hidden font-mono text-sm">
      <div 
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
        <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-md text-zinc-300 shrink-0">
          {icon}
          <span className="text-xs font-sans">{title}</span>
        </div>
        
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
        ) : (
          <>
            <span className="text-zinc-400 truncate flex-1">{path}</span>
            <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />
          </>
        )}
      </div>
      
      {isExpanded && (
        <div className="px-3 pb-3">
          <div className="text-zinc-300 mb-2">{path}</div>
          {diff && (
            <div className="rounded-md overflow-hidden text-xs">
              {diff.map((line: any, i: number) => (
                <div 
                  key={i} 
                  className={cn(
                    "px-3 py-1 whitespace-pre-wrap break-all",
                    line.type === 'add' ? "bg-emerald-500/10 text-emerald-400" :
                    line.type === 'remove' ? "bg-red-500/10 text-red-400" :
                    "text-zinc-400"
                  )}
                >
                  {line.type === 'add' ? '+ ' : line.type === 'remove' ? '- ' : '  '}
                  {line.content}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
