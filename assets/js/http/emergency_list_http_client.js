App.Http.EmergencyList = (function () {
    function getCurrentlyCheckedInAppointments() {
        const url = App.Utils.Url.siteUrl('emergency_list/get_currently_checked_in_appointments');

        const data = {
            csrf_token: vars('csrf_token'),
        };

        return $.post(url, data);
    }

    function getHistoryByDate() {
        const url = App.Utils.Url.siteUrl('emergency_list/get_history_by_date');
        const date = new Date();

        const data = {
            csrf_token: vars('csrf_token'),
            data: {
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
            },
        };

        return $.post(url, data);
    }

    return {
        getCurrentlyCheckedInAppointments,
        getHistoryByDate,
    };
})();
