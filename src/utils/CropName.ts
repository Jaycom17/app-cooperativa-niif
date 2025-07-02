const cutString = (string: string) => {
    return string.length >=30 ? `${string.slice(0,27)}...` : string;
};

export default cutString;