import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { StudentsList } from '@/components/students-list'

export default async function StudentsPage() {
    const supabase = await createServerClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    // Fetch students
    const { data: students, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

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
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                                Dashboard
                            </Link>
                            <form action="/auth/signout" method="post">
                                <button className="text-gray-600 hover:text-gray-900">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
                        <p className="text-gray-600 mt-2">
                            Manage your school's students
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/students/import"
                            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                        >
                            📤 Import CSV
                        </Link>
                        <Link
                            href="/students/add"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition"
                        >
                            + Add Student
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">
                            {students?.length || 0}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-600">Active</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">
                            {students?.filter(s => s.status === 'active').length || 0}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-600">Boys</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">
                            {students?.filter(s => s.gender === 'Male').length || 0}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-600">Girls</p>
                        <p className="text-3xl font-bold text-pink-600 mt-1">
                            {students?.filter(s => s.gender === 'Female').length || 0}
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">Error loading students: {error.message}</p>
                    </div>
                )}

                {/* Students List with Search/Filter */}
                {!students || students.length === 0 ? (
                    <div className="bg-white rounded-lg shadow text-center py-12">
                        <div className="text-6xl mb-4">👨‍🎓</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No students yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Get started by adding your first student
                        </p>
                        <Link
                            href="/students/add"
                            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition"
                        >
                            + Add First Student
                        </Link>
                    </div>
                ) : (
                    <StudentsList initialStudents={students} />
                )}
            </div>
        </div>
    )
}
