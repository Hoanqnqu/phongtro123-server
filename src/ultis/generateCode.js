const generateCode = (value) => {
    let output = "";
    value = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("");
    let merge = value + process.env.SECRET_GENERATE
    let length = merge.length

    for(let i = 0; i<3 ;i++){
        let index = 1 ===2 ? Math.floor(merge.length/2 +length/2) :Math.floor(length/2)
        output +=merge.charAt(index)
        length = index
    }
    return `${value.charAt(0)}${output}`.toUpperCase()
};
export const stringToDate = (datestring) => {
    const [cc, cct, timeValues, dateValues] = datestring.split(" ");
    const [day, month, year] = dateValues.split("/");
    const [hours, minutes] = timeValues.split(":");

    const date = new Date(+year, +month - 1, +day, +hours, +minutes, 0);
    return date;
};

export default generateCode;
