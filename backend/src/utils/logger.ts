type LogLevel = "info" | "warn" | "error";

interface LogEntry {
    level: LogLevel;
    event: string;
    [key: string]: unknown;
}
export const maskApiKey = (key: string | undefined): string => {
    if (!key || key.length < 10) return "***";
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
};
export const truncate = (value: string, max = 50): string => {
    if (value.length <= max) return value;
    return value.slice(0, max) + "...";
};

const write = (entry: LogEntry) => {
    const timestamp = new Date().toISOString();
    const output = { timestamp, ...entry };

    switch (entry.level) {
        case "error":
            console.error(JSON.stringify(output));
            break;
        case "warn":
            console.warn(JSON.stringify(output));
            break;
        default:
            console.log(JSON.stringify(output));
    }
};

export const logger = {
    info: (event: string, data: Record<string, unknown> = {}) =>
        write({ level: "info", event, ...data }),

    warn: (event: string, data: Record<string, unknown> = {}) =>
        write({ level: "warn", event, ...data }),

    error: (event: string, data: Record<string, unknown> = {}) =>
        write({ level: "error", event, ...data }),
};
