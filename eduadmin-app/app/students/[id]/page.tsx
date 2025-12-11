import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface StudentDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
    const { id } = await params
    const supabase = await createServerClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    // Fetch student
    const { data: student, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !student) {
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
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/students" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                        ← Back to Students
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
                                {student.first_name[0]}{student.last_name[0]}
                            </div>
                            <div className="ml-6">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {student.first_name} {student.last_name}
                                </h1>
                                <p className="text-gray-600">{student.student_id || 'No ID'}</p>
                            </div>
                        </div>
                        <Link
                            href={`/students/${student.id}/edit`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Edit Student
                        </Link>
                    </div>
                </div>

                {/* Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                <dd className="text-sm text-gray-900">{student.first_name} {student.last_name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                <dd className="text-sm text-gray-900">{student.date_of_birth || 'Not provided'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                <dd className="text-sm text-gray-900">{student.gender || 'Not specified'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd>
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {student.status}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="text-sm text-gray-900">{student.email || 'Not provided'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="text-sm text-gray-900">{student.phone || 'Not provided'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="text-sm text-gray-900">
                                    {student.address ? (
                                        <>
                                            {student.address}<br />
                                            {student.city}, {student.state} {student.zip_code}
                                        </>
                                    ) : (
                                        'Not provided'
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Information</h2>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                                <dd className="text-sm text-gray-900">{student.student_id || 'Not assigned'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Grade Level</dt>
                                <dd className="text-sm text-gray-900">{student.grade_level || 'Not assigned'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Class/Section</dt>
                                <dd className="text-sm text-gray-900">{student.class_section || 'Not assigned'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Admission Date</dt>
                                <dd className="text-sm text-gray-900">{student.admission_date || 'Not provided'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Roll Number</dt>
                                <dd className="text-sm text-gray-900">{student.roll_number || 'Not assigned'}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Parent/Guardian Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Parent/Guardian Information</h2>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Parent Name</dt>
                                <dd className="text-sm text-gray-900">{student.parent_name || 'Not provided'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Parent Email</dt>
                                <dd className="text-sm text-gray-900">{student.parent_email || 'Not provided'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Parent Phone</dt>
                                <dd className="text-sm text-gray-900">{student.parent_phone || 'Not provided'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Metadata */}
                <div className="mt-6 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Record Information</h2>
                    <dl className="grid grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                            <dd className="text-sm text-gray-900">
                                {new Date(student.created_at).toLocaleString()}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                            <dd className="text-sm text-gray-900">
                                {new Date(student.updated_at).toLocaleString()}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
