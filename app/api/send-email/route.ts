import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'


const GMAIL_USER = 'usme1601@gmail.com'
const GMAIL_APP_PASSWORD = 'pjsg gxgp mqdm pfnm'

interface EmailData {
	staffName: string
	accountNumber: string
	departmentName: string
	bedType: string
	barcodeInfo?: string
	patientId?: string
	patientName?: string
	floorRoom?: string
	referenceNumber: string
	toEmail: string
	replyTo?: string
}

export async function POST(request: NextRequest) {
	try {
		const input: EmailData = await request.json()

		// Validate required fields
		const requiredFields: (keyof EmailData)[] = [
			'staffName',
			'accountNumber',
			'departmentName',
			'bedType',
			'referenceNumber',
			'toEmail',
		]
		for (const field of requiredFields) {
			if (!input[field]) {
				return NextResponse.json(
					{ error: `Missing required field: ${field}` },
					{ status: 400 }
				)
			}
		}

		// Create HTML email content using the template
		const htmlContent = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Bed Pickup Confirmation</title>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
					.content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; }
					.details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
					.footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 14px; color: #6c757d; }
					.highlight { font-weight: bold; color: #007bff; }
				</style>
			</head>
			<body>
				<div class="header">
					<h2>Bed Pickup Confirmation</h2>
				</div>
				<div class="content">
					<p>Dear <span class="highlight">${input.staffName}</span>,</p>
					<p>Thank you for contacting us regarding the bed pickup. Below are the details we have recorded for your request:</p>
					<div class="details">
						<p><strong>Hospital:</strong> Johns Hopkins Bayview</p>
						<p><strong>Account Number:</strong> ${input.accountNumber}</p>
						<p><strong>Department:</strong> ${input.departmentName}</p>
						<p><strong>Bed Type:</strong> ${input.bedType}</p>
						${input.barcodeInfo ? `<p><strong>Barcode(s):</strong> ${input.barcodeInfo}</p>` : ''}
						${input.patientId || input.patientName || input.floorRoom ? `
						<p><strong>Patient Details:</strong></p>
						${input.patientId ? `<p>Patient ID: ${input.patientId}</p>` : ''}
						${input.patientName ? `<p>Patient Name: ${input.patientName}</p>` : ''}
						${input.floorRoom ? `<p>Floor & Room: ${input.floorRoom}</p>` : ''}
						` : ''}
					</div>
					<p>Your reference number for this request is <span class="highlight">${input.referenceNumber}</span>. Please keep this for your records.</p>
					<p>If you need any further assistance or have additional details to provide, feel free to reply to this email or call us directly.</p>
					<p>Thank you for your cooperation.</p>
					<div class="footer">
						<p><strong>Best regards,</strong><br>US Med Equip</p>
					</div>
				</div>
			</body>
			</html>
		`

		const subject = `Bed Pickup Confirmation - Reference #${input.referenceNumber}`

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: GMAIL_USER,
				pass: GMAIL_APP_PASSWORD,
			},
		})


		const mailOptions: any = {
			from: GMAIL_USER,
			to: input.toEmail,
			subject,
			html: htmlContent,
		}
		if (input.replyTo) {
			mailOptions.replyTo = input.replyTo
		}

		const info = await transporter.sendMail(mailOptions)

		return NextResponse.json({ success: true, messageId: info.messageId, message: 'Email sent successfully' })
	} catch (error: any) {
		console.error('Error sending email:', error)
		return NextResponse.json(
			{ error: error?.message || 'Failed to send email' },
			{ status: 500 }
		)
	}
}
