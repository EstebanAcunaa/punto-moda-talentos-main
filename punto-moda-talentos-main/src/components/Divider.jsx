const Divider = ({ vertical = false }) => {
    return vertical
        ? <div className="inline-block h-full w-px bg-background-300 dark:bg-background-700" />
        : <hr className="h-px w-full border-background-300 dark:border-background-700" />
        ;
};

export default Divider;