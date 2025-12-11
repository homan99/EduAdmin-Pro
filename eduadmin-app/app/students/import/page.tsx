'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ImportStudentsPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [preview, setPreview] = useState<any[]>([])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const text = event.target?.result as string
            parseCSV(text)
        }
        reader.readAsText(file)
    }

    const parseCSV = (text: string) => {
        const lines = text.split('\n').filter(line => line.trim())
        if (lines.length < 2) {
            setError('CSV file is empty or invalid')
            return
        }

        const headers = lines[0].split(',').map(h => h.trim())
        const students = []

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim())
            const student: any = {}

            headers.forEach((header, index) => {
                student[header] = values[index] || null
            })

            students.push(student)
        }

        setPreview(students)
        setError(null)
    }

    const handleImport = async () => {
        if (preview.length === 0) {
            setError('No students to import')
            return
        }

        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            // Transform preview data to match database schema
            const studentsToInsert = preview.map(student => ({
                user_id: user.id,
                first_name: student.first_name || student.firstName,
                last_name: student.last_name || student.lastName,
                date_of_birth: student.date_of_birth || student.dob || null,
                gender: student.gender || null,
                email: student.email || null,
                phone: student.phone || null,
                address: student.address || null,
                city: student.city || null,
                state: student.state || null,
                zip_code: student.zip_code || student.zipCode || null,
                student_id: student.student_id || student.studentId || null,
                grade_level: student.grade_level || student.grade || null,
                class_section: student.class_section || student.section || null,
                admission_date: student.admission_date || null,
                roll_number: student.roll_number || student.rollNumber || null,
                parent_name: student.parent_name || student.parentName || null,
                parent_email: student.parent_email || student.parentEmail || null,
                parent_phone: student.parent_phone || student.parentPhone || null,
            }))

            const { error } = await supabase
                .from('students')
                .insert(studentsToInsert)

            if (error) throw error

            setSuccess(`Successfully imported ${studentsToInsert.length} students!`)
            setPreview([])
            setTimeout(() => router.push('/students'), 2000)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/dashboard" className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">E</span>
                            </div>
                            <span className="ml-3 text-xl font-bold text-gray-900">EduAdmin Pro</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/students" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back to Students
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Import Students from CSV</h1>
                    <p className="text-gray-600 mt-2">Upload a CSV file with student data</p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">CSV Format Instructions</h2>
                    <p className="text-sm text-blue-800 mb-4">
                        Your CSV file should have the following columns (case-sensitive):
                    </p>
                    <div className="bg-white rounded p-4 text-sm font-mono text-gray-700 overflow-x-auto">
                        first_name,last_name,email,phone,gender,grade_level,student_id,parent_name,parent_email
                    </div>
                    <p className="text-sm text-blue-800 mt-4">
                        <strong>Example row:</strong><br />
                        <span className="font-mono">John,Doe,john@student.edu,(555) 123-4567,Male,Grade 6,STD-001,Jane Doe,jane@email.com</span>
                    </p>
                </div>

                {/* Upload Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select CSV File
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-600">{success}</p>
                    </div>
                )}

                {/* Preview */}
                {preview.length > 0 && (
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                        <div className="p-6 border-b">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Preview ({preview.length} students)
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {preview.slice(0, 10).map((student, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {student.first_name || student.firstName} {student.last_name || student.lastName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.email || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.grade_level || student.grade || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.student_id || student.studentId || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {preview.length > 10 && (
                            <div className="p-4 bg-gray-50 text-sm text-gray-600 text-center">
                                Showing first 10 of {preview.length} students
                            </div>
                        )}
                    </div>
                )}

                {/* Import Button */}
                {preview.length > 0 && (
                    <div className="flex gap-4">
                        <button
                            onClick={handleImport}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? 'Importing...' : `Import ${preview.length} Students`}
                        </button>
                        <button
                            onClick={() => setPreview([])}
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
