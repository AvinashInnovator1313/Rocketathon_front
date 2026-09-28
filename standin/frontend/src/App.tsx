import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import { Sidebar, type TabId } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { ProfessorModal } from './components/common/ProfessorModal';
import { useChatHistory } from './hooks/useChatHistory';
import { HomeView } from './views/HomeView';
import { ChatView } from './views/ChatView';
import { KnowledgeView } from './views/KnowledgeView';
import { HistoryView } from './views/HistoryView';
import { HowItWorksView } from './views/HowItWorksView';
import { SettingsView } from './views/SettingsView';
import { askQuestion } from './api/client';
import type { ChatTurn } from './api/types';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<TabId>('home');
  const [isProfModalOpen, setIsProfModalOpen] = useState(false);

  const {
    sessions,
    currentSession,
    createNewSession,
    selectSession,
    deleteSession,
    addTurnToCurrentSession,
    updateTurnInCurrentSession
  } = useChatHistory();

  const handleStartQuestion = async (question: string) => {
    // Switch to Chat tab
    setCurrentTab('chat');

    // Create turn
    const turnId = `turn-${Date.now()}`;
    const newTurn: ChatTurn = {
      id: turnId,
      timestamp: Date.now(),
      question,
      loading: true
    };

    addTurnToCurrentSession(newTurn);

    try {
      const { response } = await askQuestion(question);
      updateTurnInCurrentSession(turnId, {
        loading: false,
        response
      });
    } catch (err: any) {
      updateTurnInCurrentSession(turnId, {
        loading: false,
        error: err?.message || 'Could not fetch response from lecture slides.'
      });
    }
  };

  const handleSelectSessionAndOpen = (id: string) => {
    selectSession(id);
    setCurrentTab('chat');
  };

  const handleNewChat = () => {
    createNewSession();
    setCurrentTab('chat');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FFFAE7] dark:bg-[#0E1526] text-[#1A2238] dark:text-[#ECE8DD] transition-colors duration-200">
      {/* 1. Desktop & Tablet Left Sidebar Rail matching wireframe */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenProfessorModal={() => setIsProfModalOpen(true)}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden pb-16 md:pb-0">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onNewChat={handleNewChat}
        />

        {/* Tab View Container */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeView
              onStartQuestion={handleStartQuestion}
              onNavigateTab={setCurrentTab}
              onOpenProfessorModal={() => setIsProfModalOpen(true)}
            />
          )}

          {currentTab === 'chat' && (
            <ChatView
              currentSession={currentSession}
              onAddTurn={addTurnToCurrentSession}
              onUpdateTurn={updateTurnInCurrentSession}
              onSelectStarterPrompt={handleStartQuestion}
            />
          )}

          {currentTab === 'knowledge' && (
            <KnowledgeView
              onSelectTopicQuery={handleStartQuestion}
            />
          )}

          {currentTab === 'history' && (
            <HistoryView
              sessions={sessions}
              onSelectSession={handleSelectSessionAndOpen}
              onDeleteSession={deleteSession}
            />
          )}

          {currentTab === 'how-it-works' && (
            <HowItWorksView />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenProfessorModal={() => setIsProfModalOpen(true)}
      />

      {/* 4. Professor Profile Modal (DA Initials badge) */}
      <ProfessorModal
        isOpen={isProfModalOpen}
        onClose={() => setIsProfModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <MainApp />
      </SettingsProvider>
    </ThemeProvider>
  );
}
