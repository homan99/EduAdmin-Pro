'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface EditStudentPageProps {
    params: Promise<{
        id: string
    }>
}

export default function EditStudentPage({ params }: EditStudentPageProps) {
    const { id } = use(params)
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [student, setStudent] = useState<any>(null)

    useEffect(() => {
        fetchStudent()
    }, [])

    const fetchStudent = async () => {
        try {
            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            setStudent(data)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setSaving(true)

        const formData = new FormData(e.currentTarget)

        try {
            const studentData = {
                first_name: formData.get('firstName') as string,
                last_name: formData.get('lastName') as string,
                date_of_birth: formData.get('dateOfBirth') as string || null,
                gender: formData.get('gender') as string || null,
                email: formData.get('email') as string || null,
                phone: formData.get('phone') as string || null,
                address: formData.get('address') as string || null,
                city: formData.get('city') as string || null,
                state: formData.get('state') as string || null,
                zip_code: formData.get('zipCode') as string || null,
                student_id: formData.get('studentId') as string || null,
                grade_level: formData.get('gradeLevel') as string || null,
                class_section: formData.get('classSection') as string || null,
                admission_date: formData.get('admissionDate') as string || null,
                roll_number: formData.get('rollNumber') as string || null,
                parent_name: formData.get('parentName') as string || null,
                parent_email: formData.get('parentEmail') as string || null,
                parent_phone: formData.get('parentPhone') as string || null,
            }

            const { error } = await supabase
                .from('students')
                .update(studentData)
                .eq('id', id)

            if (error) throw error

            router.push('/students')
        } catch (error: any) {
            setError(error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        )
    }

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">Student not found</p>
            </div>
        )
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/students" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back to Students
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Student</h1>
                    <p className="text-gray-600 mt-2">Update {student.first_name}'s information</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                    {/* Personal Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    defaultValue={student.first_name}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    defaultValue={student.last_name}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    defaultValue={student.date_of_birth || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    defaultValue={student.gender || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={student.email || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    defaultValue={student.phone || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={student.address || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    defaultValue={student.city || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    defaultValue={student.state || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                                <input
                                    type="text"
                                    name="studentId"
                                    defaultValue={student.student_id || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                                <select
                                    name="gradeLevel"
                                    defaultValue={student.grade_level || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select grade</option>
                                    <option value="Kindergarten">Kindergarten</option>
                                    <option value="Grade 1">Grade 1</option>
                                    <option value="Grade 2">Grade 2</option>
                                    <option value="Grade 3">Grade 3</option>
                                    <option value="Grade 4">Grade 4</option>
                                    <option value="Grade 5">Grade 5</option>
                                    <option value="Grade 6">Grade 6</option>
                                    <option value="Grade 7">Grade 7</option>
                                    <option value="Grade 8">Grade 8</option>
                                    <option value="Grade 9">Grade 9</option>
                                    <option value="Grade 10">Grade 10</option>
                                    <option value="Grade 11">Grade 11</option>
                                    <option value="Grade 12">Grade 12</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Class/Section</label>
                                <input
                                    type="text"
                                    name="classSection"
                                    defaultValue={student.class_section || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date</label>
                                <input
                                    type="date"
                                    name="admissionDate"
                                    defaultValue={student.admission_date || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Parent Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Parent/Guardian Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name</label>
                                <input
                                    type="text"
                                    name="parentName"
                                    defaultValue={student.parent_name || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email</label>
                                <input
                                    type="email"
                                    name="parentEmail"
                                    defaultValue={student.parent_email || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone</label>
                                <input
                                    type="tel"
                                    name="parentPhone"
                                    defaultValue={student.parent_phone || ''}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {saving ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/students"
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
