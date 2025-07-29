// Client-side email service utility
export interface EmailRequest {
  name: string
  email: string
  phone: string
  concern?: string
  message?: string
  type: "consultation" | "callback"
}

export const sendEmailRequest = async (data: EmailRequest): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Sending email request:", data)

    // Use relative URL for API calls - works in both development and production
    const apiUrl = process.env.NODE_ENV === 'development' 
      ? "http://localhost:3001/api/send-email"
      : "/api/send-email"
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to send email")
    }

    const result = await response.json()

    return {
      success: result.success,
      message: result.message,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to send request. Please try again or contact us directly.",
    }
  }
}
