// For now: accept email data from controller, return a dummy success result

interface EmailData {
    to: string;
    subject: string;
    body: string;
}

interface EmailResult {
    success: boolean;
    message: string;
}

export const sendEmail = async (data: EmailData): Promise<EmailResult> => {
    // TODO: Real email sending logic will go here
    return {
        success: true,
        message: "Email sent successfully (dummy)",
    };
};

