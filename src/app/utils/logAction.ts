import { prisma } from "./db";

async function logAction(action: string, method: string, detail: string) {
    let created_at = new Date(Date.now());

    try {
        await prisma.log.create({
            data: {
                method,
                action,
                detail,
                created_at
            }
        })
    } catch (error) {
        console.log("Error:" + (error as any).body)
    }
}

async function logUser(clientIP?: string, token?: string, service?: string, action?: string, apiKey?: string, username?: string) {
    let created_at = new Date(Date.now());

    try {
        await prisma.userLog.create({
            data: {
                clientIP: clientIP || '',
                token: token || '',
                action: action || '',
                service: service || '',
                username: username || '',
                apiKey: apiKey || '',
                created_at
            }
        })
    } catch (error) {
        console.log("Error:" + (error as any).body)
    }
}

export { logUser, logAction }