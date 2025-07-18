import { useEffect, useState } from "react"
import { SocialNetwork, UserHandle } from "../types"
import api from "../config/axios"
import { toast } from 'sonner'

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({ data }: HandleDataProps) {
    const links = (JSON.parse(data.links) as SocialNetwork[]).filter(link => link.enabled)

    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                if (!data.handle) return; // Cambiado de if(data.handle) return

                console.log("Verificando estado de seguimiento:", data.handle);

                // Necesitas obtener el ID del usuario actual (de tu sistema de autenticación)
                const currentUserId = "id-del-usuario-actual"; // Reemplaza esto con cómo obtienes el ID del usuario logueado

                const response = await api.get(`/follow/status/${currentUserId}/${data.handle}`);
                console.log("Respuesta del backend:", response.data);

                setIsFollowing(response.data.isFollowing);
            } catch (error) {
                console.error("Error al verificar seguimiento:", error);
            }
        };

        checkFollowStatus();
    }, [data.handle]);

    const toggleFollow = async () => {
    try {
        setLoading(true)

        if (isFollowing) {
            await api.delete(`/follow/${data.handle}`)
            setIsFollowing(false)
            toast.info(`Has dejado de seguir a @${data.handle}`)
        } else {
            await api.post(`/follow/${data.handle}`)
            setIsFollowing(true)
            toast.success(`Ahora sigues a @${data.handle}`)
        }
    } catch (error: any) {
        console.error("Error al seguir/dejar de seguir:", error)
        toast.error("Hubo un error al intentar actualizar el seguimiento")
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="max-w-xl mx-auto px-4 py-10 text-white">
            <h1 className="text-4xl font-bold text-center mb-6">{data.handle}</h1>

            {data.image && (
                <img
                    src={data.image}
                    alt="Foto de perfil"
                    className="w-32 h-32 mx-auto rounded-full object-cover border border-slate-300"
                />
            )}

            {data.description && (
                <p className="text-center text-base text-slate-200 mt-4">{data.description}</p>
            )}

            {/* Botón siempre visible */}
            <div className="text-center mt-6">
                <button
                    onClick={toggleFollow}
                    disabled={loading}
                    className={`px-6 py-2 rounded-full font-semibold border transition duration-300 
                        ${isFollowing
                            ? "bg-white text-black border-white hover:bg-gray-200"
                            : "bg-transparent text-white border-white hover:bg-white hover:text-black"} 
                        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Cargando..." : isFollowing ? "Siguiendo" : "Seguir"}
                </button>
            </div>

            <div className="mt-10 space-y-4">
                {links.length ? (
                    links.map(link => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group flex items-center gap-4 px-5 py-3 rounded border border-slate-500 
                                text-white hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            <img
                                src={`/social/icon_${link.name}.svg`}
                                alt={`${link.name} icon`}
                                className={`w-8 h-8 object-contain transition duration-200 ${link.name.toLowerCase() === 'github' ? 'filter invert group-hover:invert-0' : ''}`}
                            />
                            <p className="w-full text-center font-bold capitalize text-lg">{link.name}</p>
                        </a>
                    ))
                ) : (
                    <p className="text-center text-slate-300 text-sm">No hay enlaces disponibles.</p>
                )}
            </div>
        </div>
    )
}
