import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import ErrorMessage from '../components/ErrorMessage'
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage, getUser } from '../api/DevTreeAPI'
import { useEffect } from 'react'

export default function ProfileView() {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ProfileForm>()

    useEffect(() => {
        if (data) {
            reset({
                handle: data.handle,
                description: data.description
            })
        }
    }, [data, reset])

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (message) => {
            toast.success(message)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (imageUrl) => {
            // Actualiza directamente en caché
            queryClient.setQueryData(['user'], (prev: User | undefined) => {
                if (!prev) return prev
                return { ...prev, image: imageUrl }
            })
            toast.success("Imagen actualizada")
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        if (!data) return
        const updatedUser: User = {
            ...data,
            handle: formData.handle,
            description: formData.description
        }
        updateProfileMutation.mutate(updatedUser)
    }

    if (isLoading) return <p className="text-center text-white">Cargando...</p>

    return (
        <form
            className="bg-white dark:bg-slate-800 p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 dark:text-white text-center">Editar Información</legend>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle" className="dark:text-white">Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 dark:bg-slate-700 dark:text-white rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', { required: "El Nombre de Usuario es obligatorio" })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description" className="dark:text-white">Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 dark:bg-slate-700 dark:text-white rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description', { required: "La Descripción es obligatoria" })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="image" className="dark:text-white">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-slate-100 dark:bg-slate-700 dark:text-white rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-500 p-2 text-lg w-full uppercase text-slate-600 dark:text-white rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}
