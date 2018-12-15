
// Version 1.00

//---------------------------------------------------------------------------
// Extends Lodash.
//
// Uses Lodash and Luxon.
//
// Throws exception on invalid parameters (check incomplete).
//
// Parameters: year, month,
//      optional custom newline suffix string, defaults to "\n",
//      optional weekday names, defaults to Hungarian initials
//
// Returns a multiline string with a printed monthly calendar with
// weekdays.
//
// Also puts the returned string onto the clipboard.

_.getMonthlyCalendar = function(year, month,
                                newline = "\n",
                                weekdays = ["H", "K", "S", "C", "P", "S", "V"])
{
    // Error handling
    if (!(_.isInteger(year) && _.isInteger(month)))
    {
        throw "Error: invalid parameter(s) for calendarMonth.getMonthlyCalendar()"
            + newline + "() year:  '" + year + "'"
            + newline + "() month: '" + month + "'";
    }

    // Result string
    let table = "";

    // Days in the requested month
    for (let day = 1; day <= luxon.DateTime.local(year, month).daysInMonth; day++)
    {
        const weekdayNum = luxon.DateTime.local(year, month, day).weekday;
        // Render day
        table += _.padStart(day, 2) + " " + weekdays[weekdayNum - 1] + newline;
        // Render separator after each week (after Sunday)
        // TODO: maybe add support for separation after a different day?
        if (weekdayNum === 7)
        {
            table += "----" + newline;
        }
    }

    // Copy the table to the clipboard as well. Only takes effect if called from
    // a user input callback.
    simpleUtils.copyToClipboard(table);

    return table;
};

//---------------------------------------------------------------------------
