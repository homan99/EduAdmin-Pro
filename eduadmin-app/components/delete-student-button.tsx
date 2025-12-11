'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function DeleteStudentButton({ studentId }: { studentId: string }) {
    const router = useRouter()
    const supabase = createClient()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            return
        }

        try {
            const { error } = await supabase
                .from('students')
                .delete()
                .eq('id', studentId)

            if (error) throw error

            router.refresh()
        } catch (error: any) {
            alert('Error deleting student: ' + error.message)
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900"
        >
            Delete
        </button>
    )
}
