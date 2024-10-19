export function debounce<Function extends (...args: any[]) => void> (fn: Function, delay: number) {
    let timeoutId : ReturnType<typeof setTimeout>;

    return (...args : Parameters<Function>) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
};
