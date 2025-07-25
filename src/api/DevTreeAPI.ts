import { isAxiosError } from 'axios'
import api from '../config/axios'
import { User, UserHandle } from '../types'

export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(formData: User) {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadImage(file: File) {
    let formData = new FormData()
    formData.append('file', file)
    try {
        const { data: {image} } : {data: {image: string}} = await api.post('/user/image', formData)
        return image
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const url = `/${handle}`
        const { data } = await api<UserHandle>(url)
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function searchByHandle(handle: string) {
    try {
        const { data } = await api.post<string>('/search', {handle})
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

//Funciones de Follow
export async function getFollowers(userId: string) {
    try {
        const { data } = await api<User[]>('/followers/' + userId)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFollowing(userId: string) {
    try {
        const { data } = await api<User[]>('/following/' + userId)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkIsFollowing(currentUserId: string, targetUserId: string) {
  const { data } = await api<{ isFollowing: boolean }>(`/isFollowing/${currentUserId}/${targetUserId}`)
  return data.isFollowing
}