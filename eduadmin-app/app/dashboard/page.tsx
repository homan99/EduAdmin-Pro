import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createServerClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    const user = session.user

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">E</span>
                                    </div>
                                    <span className="ml-3 text-xl font-bold text-gray-900">EduAdmin Pro</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                {user.user_metadata.full_name || user.email}
                            </span>
                            <form action="/auth/signout" method="post">
                                <button
                                    type="submit"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.user_metadata.full_name || 'Admin'}! 👋
                    </h1>
                    <p className="text-gray-600">
                        {user.user_metadata.school_name || 'Your School'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Students</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👨‍🎓</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Teachers</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👨‍🏫</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Classes</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📚</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Attendance Today</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">0%</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/students/add" className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                            <h3 className="font-semibold text-gray-900 mb-2">📝 Add Students</h3>
                            <p className="text-sm text-gray-600">Start by adding students to your school</p>
                            <p className="text-sm text-blue-600 mt-2">Go to form →</p>
                        </Link>

                        <Link href="/students" className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                            <h3 className="font-semibold text-gray-900 mb-2">👥 View Students</h3>
                            <p className="text-sm text-gray-600">Manage all your students</p>
                            <p className="text-sm text-blue-600 mt-2">View list →</p>
                        </Link>

                        <div className="border border-gray-200 rounded-lg p-4 opacity-50 cursor-not-allowed">
                            <h3 className="font-semibold text-gray-900 mb-2">🏫 Setup Classes</h3>
                            <p className="text-sm text-gray-600">Create classes and organize students</p>
                            <p className="text-sm text-gray-400 mt-2">Coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
