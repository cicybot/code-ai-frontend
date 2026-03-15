/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Workspace from './components/Workspace';

export default function App() {
  const [activeAgent, setActiveAgent] = useState<string | null>('w-10001');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Workspace agentId={activeAgent} onSelectAgent={setActiveAgent} />
    </div>
  );
}
