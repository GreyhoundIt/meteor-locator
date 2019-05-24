 export function formatMass(mass) {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(mass)
}