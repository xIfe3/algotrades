// Runs once when the Next.js server starts.
export async function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs") return;

    // Check the SMTP login once at startup so mail problems show up in the logs.
    const { emailService } = await import("./server/utils/emailService");
    emailService.verifyConnection().catch(() => {});

    // The daily profit job needs a long-running process (`next start`).
    // On serverless hosts (e.g. Vercel) call POST /api/v1/cron/calculate-profit
    // from a scheduler instead, or set ENABLE_PROFIT_SCHEDULER=false to opt out.
    if (process.env.ENABLE_PROFIT_SCHEDULER === "false" || process.env.VERCEL) return;

    const { startProfitScheduler } = await import("./server/profitCronJob");
    startProfitScheduler().catch((error) =>
        console.error("Failed to start profit scheduler:", error)
    );
}
