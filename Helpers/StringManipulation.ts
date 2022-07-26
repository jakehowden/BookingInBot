// Checks if the provided argument contains a number
// Params:
//      args - the arguments the user provided in the message
export const ArgsHaveTime = (args: string) => {
    return /\d/.test(args);
}