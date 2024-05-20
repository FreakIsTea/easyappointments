App.Http.EmergencyList = (function () {
    function getCurrentlyCheckedInAppointments() {
        const url = App.Utils.Url.siteUrl('emergency_list/get_currently_checked_in_appointments');

        const data = {
            csrf_token: vars('csrf_token'),
        };

        return $.post(url, data);
    }

    function getHistoryByDate(startDate, endDate) {
        const url = App.Utils.Url.siteUrl('emergency_list/get_history_by_date');

        const data = {
            csrf_token: vars('csrf_token'),
            start_date: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        };

        return $.post(url, data);
    }

    return {
        getCurrentlyCheckedInAppointments,
        getHistoryByDate,
    };
})();
