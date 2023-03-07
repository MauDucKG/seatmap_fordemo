export const ValidationMap = (name, height, width, maxSeat) => {
    const MaximumOfSeat = Number(width)* Number(height) - (Number(height) + Number(width))* 2 + 4;
    return Number(height) > 2 && 
           name.length >= 8 && 
           Number(width) > 2 && 
           Number(maxSeat) > 0 && 
           name.length <= 30 && 
           Number(width) <= 30 && 
           Number(height) <= 50 && 
           Number(maxSeat) <= MaximumOfSeat;              
}