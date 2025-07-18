import { useForm } from 'react-hook-form'
import slugify from 'react-slugify'
import { useMutation } from '@tanstack/react-query'
import ErrorMessage from "./ErrorMessage";
import { searchByHandle } from '../api/DevTreeAPI';
import { Link } from 'react-router-dom';

export default function SearchForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle
    })

    const handle = watch('handle')

    const handleSearch = () => {
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5"
        >
            <div className="relative flex items-center bg-white dark:bg-gray-800 px-2 rounded-lg border border-gray-300 dark:border-gray-600">
                <label
                    htmlFor="handle"
                    className="text-gray-700 dark:text-gray-300"
                >
                    devtree.com/
                </label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="escribe aquí tu handle"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />
            </div>

            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10">
                {mutation.isPending && (
                    <p className="text-center text-gray-700 dark:text-gray-300">Cargando...</p>
                )}
                {mutation.error && (
                    <p className="text-center text-red-500 font-black">{mutation.error.message}</p>
                )}
                {mutation.data && (
                    <p className="text-center text-lime-500 font-black">
                        {mutation.data} ir a{" "}
                        <Link
                            to={"/auth/register"}
                            state={{ handle: slugify(handle) }}
                            className="underline text-lime-400 hover:text-lime-300"
                        >
                            Registro
                        </Link>
                    </p>
                )}
            </div>

            <input
                type="submit"
                className="bg-black dark:bg-white text-white dark:text-black p-3 text-lg w-full uppercase rounded-lg font-bold cursor-pointer transition-colors duration-300"
                value="Obtener mi DevTree"
            />
        </form>
    )
}
