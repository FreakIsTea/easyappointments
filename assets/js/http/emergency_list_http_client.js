App.Http.EmergencyList = (function () {
    function getCurrentlyCheckedInAppointments() {
        const url = App.Utils.Url.siteUrl('emergency_list/get_currently_checked_in_appointments');

        const data = {
            csrf_token: vars('csrf_token'),
        };

        return $.post(url, data);
    }

    return {
        getCurrentlyCheckedInAppointments,
    };
})();
