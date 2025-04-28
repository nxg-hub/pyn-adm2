import { Route, Routes } from "react-router-dom";
import SupportPage from "./SupportPage";
import SupportTicketsPage from "./SupportTicketsPage"
import LiveChatPage from "./LiveChatPage"
import DisputeResolutionPage from "./DisputeResolutionPage"
import KnowledgeBasePage from "./KnowledgeBasePage"

function Support() {
    return (
      <Routes>
        <Route index element={<SupportPage />} />
        <Route path="support" element={<SupportPage  />} />
        <Route path="tickets" element={<SupportTicketsPage />} />
        <Route path="chat" element={<LiveChatPage />} />
        <Route path="disputes" element={<DisputeResolutionPage />} />
        <Route path="knowledge-base" element={<KnowledgeBasePage />} />
      </Routes>
    );
  }

export default Support;