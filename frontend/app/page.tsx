"use client";

import { useEffect, useState } from "react";

import { getHealth } from "./lib/api/health";

type HealthStatus = "connected" | "disconnected" | "loading";

export default function Home() {
  const [status, setStatus] = useState<HealthStatus>("loading");

  useEffect(() => {
    getHealth()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnected"));
  }, []);

  return (
    <main>
      <div>
        {status === "connected" && "Server Connected"}
        {status === "disconnected" && "Server Not Reachable"}
        {status === "loading" && "Checking Server..."}
      </div>
      <div>DevDove</div>
    </main>
  );
}
