// Function which returns a valid Date() object from the time given in the args
function GetDateFromArgs(args) {

    var today = new Date();
    args = args.split(':');
    if(args.length === 2)
    {
        today.setHours(args[0], args[1], 0, 0);
    }
    else
    {
        today.setHours(args[0], 0, 0, 0);
    }

    // Round minutes to the nearest half an hour, i.e. 7:15 becomes 7:30, 12:35 becomes 1:00
    today.setMinutes(Math.ceil(now.getMinutes() / 30) * 30);
    
    return today;
}

function GetFullDateFromDate(date) {
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    return year + "/" + month + "/" + day;
}

function Get24HourTimeFromDate(date) {
    return date.getHours() + ':' + date.getMinutes()
}