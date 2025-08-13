'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    staffName: '',
    accountNumber: '',
    departmentName: '',
    bedType: '',
    barcodeInfo: '',
    patientId: '',
    patientName: '',
    floorRoom: '',
    referenceNumber: '',
    toEmail: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Email sent successfully!')
        setFormData({
          staffName: '',
          accountNumber: '',
          departmentName: '',
          bedType: '',
          barcodeInfo: '',
          patientId: '',
          patientName: '',
          floorRoom: '',
          referenceNumber: '',
          toEmail: ''
        })
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('Failed to send email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Email Service
          </h1>
          <p className="text-gray-600 mb-8">
            Send bed pickup confirmation emails
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
          <div>
            <label htmlFor="toEmail" className="block text-sm font-medium text-gray-700">
              To Email *
            </label>
            <input
              type="email"
              name="toEmail"
              id="toEmail"
              required
              value={formData.toEmail}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="staffName" className="block text-sm font-medium text-gray-700">
              Staff Name *
            </label>
            <input
              type="text"
              name="staffName"
              id="staffName"
              required
              value={formData.staffName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Account Number *
            </label>
            <input
              type="text"
              name="accountNumber"
              id="accountNumber"
              required
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">
              Department Name *
            </label>
            <input
              type="text"
              name="departmentName"
              id="departmentName"
              required
              value={formData.departmentName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bedType" className="block text-sm font-medium text-gray-700">
              Bed Type *
            </label>
            <input
              type="text"
              name="bedType"
              id="bedType"
              required
              value={formData.bedType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="barcodeInfo" className="block text-sm font-medium text-gray-700">
              Barcode Information
            </label>
            <input
              type="text"
              name="barcodeInfo"
              id="barcodeInfo"
              value={formData.barcodeInfo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
              Patient ID
            </label>
            <input
              type="text"
              name="patientId"
              id="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="floorRoom" className="block text-sm font-medium text-gray-700">
              Floor & Room
            </label>
            <input
              type="text"
              name="floorRoom"
              id="floorRoom"
              value={formData.floorRoom}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700">
              Reference Number *
            </label>
            <input
              type="text"
              name="referenceNumber"
              id="referenceNumber"
              required
              value={formData.referenceNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>

          {message && (
            <div className={`mt-4 p-4 rounded-md ${
              message.includes('Error') || message.includes('Failed') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
