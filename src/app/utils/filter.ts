export const formatDate = (date?: Date): string => {
    if (date) {
        const d = new Date(date)
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();

        return `${year}-${month}-${day}`;

    } else {
        return ''
    }
};
