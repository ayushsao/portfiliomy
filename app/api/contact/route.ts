import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    
    if (!apiKey || apiKey === 'your_web3forms_access_key_here') {
      console.error('Web3Forms API key not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    console.log('Sending email via Web3Forms...')

    // Using Web3Forms API (free service, no backend needed)
    const formData = {
      access_key: apiKey,
      name: name,
      email: email,
      message: message,
      subject: `New Portfolio Contact from ${name}`,
      from_name: 'Portfolio Contact Form',
      replyto: email
    }

    console.log('Request data:', { ...formData, access_key: '***' })

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    console.log('Response status:', response.status)
    const responseText = await response.text()
    console.log('Response text:', responseText)

    let result
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse response:', responseText)
      return NextResponse.json(
        { error: 'Invalid response from email service' },
        { status: 500 }
      )
    }

    console.log('Web3Forms response:', result)

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully!' },
        { status: 200 }
      )
    } else {
      console.error('Web3Forms error:', result)
      return NextResponse.json(
        { error: result.message || 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}
