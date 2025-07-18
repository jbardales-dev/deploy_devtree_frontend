import { Switch } from '@headlessui/react'
import { DevTreeLink } from "../types"
import { classNames } from '../utils'

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
}

export default function DevTreeInput({ item, handleUrlChange, handleEnableLink }: DevTreeInputProps) {

    const handleSwitchClick = () => {
        // Si es WhatsApp, transformar el número en URL antes de habilitar
        if (item.name.toLowerCase() === 'whatsapp') {
            const phone = item.url.replace(/\D/g, '') // elimina todo lo que no sea número
            if (phone.length > 0) {
                item.url = `https://wa.me/${phone}`
            }
        }
        handleEnableLink(item.name)
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm p-5 flex items-center gap-3 transition-colors duration-300">
            <div
                className={`w-12 h-12 ${item.name.toLowerCase() === 'github' ? 'filter dark:invert' : ''}`}
                style={{
                    backgroundImage: `url('/social/icon_${item.name}.svg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            ></div>

            <input
                type={item.name.toLowerCase() === 'whatsapp' ? 'tel' : 'text'}
                className="flex-1 border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-2 py-1 transition-colors duration-300"
                value={item.url}
                onChange={handleUrlChange}
                name={item.name}
                placeholder={item.name.toLowerCase() === 'whatsapp' ? 'Incluir código internacional' : undefined}
            />

            <Switch
                checked={item.enabled}
                name={item.name}
                onChange={handleSwitchClick}
                className={classNames(
                    item.enabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    )
}
