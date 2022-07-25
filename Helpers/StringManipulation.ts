export const HasTime = (cmd: string) => {
    return /\d/.test(cmd);
}