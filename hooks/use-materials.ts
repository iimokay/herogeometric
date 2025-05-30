import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface Material {
  id: number
  title: string
  description: string
  images: string[]
  createdAt: string
  updatedAt: string
  viewCount: number
  likeCount: number
  shareCount: number
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

interface UseMaterialsResult {
  materials: Material[]
  pagination: Pagination
  loading: boolean
  error: string | null
  fetchMaterials: (page?: number, search?: string) => Promise<void>
  deleteMaterial: (id: number) => Promise<void>
  updateStats: (id: number, type: 'view' | 'like' | 'share') => Promise<void>
}

export function useMaterials(): UseMaterialsResult {
  const [materials, setMaterials] = useState<Material[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchMaterials = useCallback(async (page = 1, search = '') => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search })
      })

      const response = await fetch(`/api/materials?${params}`)
      if (!response.ok) throw new Error('获取材料列表失败')

      const data = await response.json()
      setMaterials(data.data)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取材料列表失败')
      toast({
        title: '错误',
        description: '获取材料列表失败',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const deleteMaterial = useCallback(async (id: number) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/materials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!response.ok) throw new Error('删除材料失败')

      toast({
        title: '成功',
        description: '材料已删除'
      })

      // 重新获取列表
      await fetchMaterials(pagination.page)
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除材料失败')
      toast({
        title: '错误',
        description: '删除材料失败',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [fetchMaterials, pagination.page, toast])

  const updateStats = useCallback(async (id: number, type: 'view' | 'like' | 'share') => {
    try {
      const response = await fetch(`/api/materials/${id}/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })

      if (!response.ok) throw new Error(`更新${type}统计失败`)

      // 更新本地状态
      setMaterials(prev => prev.map(material => 
        material.id === id
          ? { ...material, [`${type}Count`]: material[`${type}Count`] + 1 }
          : material
      ))
    } catch (err) {
      console.error(`更新${type}统计失败:`, err)
    }
  }, [])

  return {
    materials,
    pagination,
    loading,
    error,
    fetchMaterials,
    deleteMaterial,
    updateStats
  }
} 