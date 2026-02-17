import { useEffect, useState } from "react";
import "./HealthBadge.css";

type Status = "loading" | "online" | "offline";

function HealthBadge() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const res = await fetch("/v1/health");
        if (!mounted) return;
        setStatus(res.ok ? "online" : "offline");
      } catch {
        if (mounted) setStatus("offline");
      }
    }

    check();
    const interval = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const label =
    status === "loading" ? "Checking..." : status === "online" ? "Online" : "Offline";

  return (
    <div className={`health-badge ${status}`}>
      <span className="health-dot" />
      <span className="health-label">{label}</span>
    </div>
  );
}

export default HealthBadge;
