'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DeleteStudentButton } from '@/components/delete-student-button'
import { SearchBar } from '@/components/search-bar'

interface Student {
    id: string
    first_name: string
    last_name: string
    email: string | null
    phone: string | null
    student_id: string | null
    grade_level: string | null
    status: string
    gender: string | null
}

interface StudentsListProps {
    initialStudents: Student[]
}

export function StudentsList({ initialStudents }: StudentsListProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [gradeFilter, setGradeFilter] = useState('')

    // Filter students based on search and grade
    const filteredStudents = initialStudents.filter((student) => {
        const matchesSearch =
            searchQuery === '' ||
            student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.student_id?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesGrade =
            gradeFilter === '' || student.grade_level === gradeFilter

        return matchesSearch && matchesGrade
    })

    // Get unique grades for filter
    const grades = Array.from(new Set(initialStudents.map((s) => s.grade_level).filter(Boolean)))

    return (
        <div>
            {/* Search and Filters */}
            <div className="mb-6 flex gap-4">
                <div className="flex-1">
                    <SearchBar onSearch={setSearchQuery} />
                </div>
                <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">All Grades</option>
                    {grades.map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600 mb-4">
                Showing {filteredStudents.length} of {initialStudents.length} students
            </p>

            {/* Students Table */}
            {filteredStudents.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-500">No students found matching your criteria</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grade
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {student.first_name[0]}{student.last_name[0]}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {student.first_name} {student.last_name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {student.email || 'No email'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {student.student_id || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {student.grade_level || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {student.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                        <Link
                                            href={`/students/${student.id}`}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/students/${student.id}/edit`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteStudentButton studentId={student.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
