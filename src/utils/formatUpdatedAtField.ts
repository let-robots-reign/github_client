export const formatUpdatedAtField = (unformattedDate: string): string => {
    const date = new Date(unformattedDate);
    return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })}`;
};
