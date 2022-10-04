interface AnnouncementBarProps {
  children: React.ReactNode
}

export const AnnouncementBar = ({ children }: AnnouncementBarProps) => {
  return (
    <div className="w-full p-3 font-medium text-center flex items-center justify-center">
      <p>{children}</p>
    </div>
  )
}
