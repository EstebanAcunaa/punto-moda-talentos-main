const MenuSection = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-2 py-2 border-b border-background-300 dark:border-background-700 last:border-b-0">
            {title && (
                <span className="font-main text-xs leading-3 font-normal tracking-normal px-4 py-1 text-text-800 dark:text-text-200">
                    {title}
                </span>
            )}

            <div>
                {children}
            </div>
        </div>
    )
}

export default MenuSection;
