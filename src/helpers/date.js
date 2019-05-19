 export function formatDate(string) {
    var options = { year: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}