type ErrorMessageProps = {
    children: React.ReactNode
}
export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 p-3 uppercase text-sm font-bold text-center rounded-md transition-colors duration-300">
      {children}
    </p>
  )
}
