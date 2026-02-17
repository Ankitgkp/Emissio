import { useState, type FormEvent } from "react";
import Toast from "./Toast";
import "./EmailForm.css";

function EmailForm() {
  const [apiKey, setApiKey] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/v1/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ to, subject, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ message: data.message || "Email sent!", type: "success" });
        setTo("");
        setSubject("");
        setContent("");
      } else {
        setToast({ message: data.message || "Failed to send email", type: "error" });
      }
    } catch {
      setToast({ message: "Network error — is the server running?", type: "error" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="card">
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="apiKey">API Key</label>
          <input
            type="password"
            id="apiKey"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="to">To</label>
          <input
            type="email"
            id="to"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your message here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default EmailForm;
