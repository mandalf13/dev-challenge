export function truncateString(text: string): string {
    let words = text.split(" ");
    if (words.length > 50) {
        return words.slice(0, 50).join(" ") + "...";
    } else {
        return text;
    }
}

export function getValuation(voteAvg: number) {
    return voteAvg.toFixed(1);
}